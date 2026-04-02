/**
 * Daily news agent
 * Fetches RSS feeds → summarises via OpenRouter → writes to Supabase
 *
 * Usage:
 *   node scripts/agent.mjs
 *
 * Required env vars (in .env.local or shell):
 *   SUPABASE_URL              (or VITE_SUPABASE_URL)
 *   SUPABASE_SERVICE_ROLE_KEY
 *   OPENROUTER_API_KEY
 */

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import Parser from 'rss-parser';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ---------------------------------------------------------------------------
// Bootstrap — load .env.local manually (no dotenv dependency)
// ---------------------------------------------------------------------------
const __dir = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dir, '../.env.local');
try {
  const lines = readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
} catch {
  // .env.local is optional — rely on real env vars when deployed
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const SUPABASE_URL        = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY    = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENROUTER_API_KEY  = process.env.OPENROUTER_API_KEY;
const MODEL               = 'openai/gpt-5.4-mini';
const MAX_ARTICLES_PER_DAY = 50;
const LOOKBACK_MS         = 24 * 60 * 60 * 1000; // 24 h

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !OPENROUTER_API_KEY) {
  throw new Error('Missing required env vars (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENROUTER_API_KEY)');
}

/** @type {Array<{name: string, url: string, defaultCategory: string}>} */
const RSS_SOURCES = [
  // Community-maintained feed (Anthropic has no official RSS)
  { name: 'Anthropic Blog',         url: 'https://raw.githubusercontent.com/taobojlen/anthropic-rss-feed/main/anthropic_news_rss.xml', defaultCategory: 'ai-release'  },
  { name: 'OpenAI Blog',            url: 'https://openai.com/news/rss.xml',                                defaultCategory: 'ai-release'  },
  { name: 'Google DeepMind',        url: 'https://deepmind.google/blog/rss.xml',                           defaultCategory: 'ai-release'  },
  { name: 'Hacker News Top',        url: 'https://news.ycombinator.com/rss',                               defaultCategory: 'engineering' },
  { name: 'Simon Willison',         url: 'https://simonwillison.net/atom/everything/',                     defaultCategory: 'engineering' },
  { name: 'Hugging Face Blog',      url: 'https://huggingface.co/blog/feed.xml',                           defaultCategory: 'tools'       },
  { name: 'The Pragmatic Engineer', url: 'https://newsletter.pragmaticengineer.com/feed',                  defaultCategory: 'engineering' },
  { name: 'MIT Technology Review',  url: 'https://www.technologyreview.com/feed/',                         defaultCategory: 'industry'    },
  // InfoQ requires a browser-like User-Agent (returns 406 otherwise)
  { name: 'InfoQ',                  url: 'https://feed.infoq.com',                                         defaultCategory: 'engineering' },
  { name: 'GitHub Trending',        url: 'https://mshibanami.github.io/GitHubTrendingRSS/daily/all.xml',  defaultCategory: 'tools'       },
];

const VALID_CATEGORIES = ['ai-release', 'engineering', 'tools', 'industry'];

// ---------------------------------------------------------------------------
// Clients
// ---------------------------------------------------------------------------
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const openrouter = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': SUPABASE_URL, // identifies your app to OpenRouter
    'X-Title': 'Daily Dev News Aggregator',
  },
});

const BROWSER_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const rssParser = new Parser({
  timeout: 10_000,
  headers: {
    'User-Agent': BROWSER_UA,
    'Accept': 'application/rss+xml, application/xml, text/xml, */*',
  },
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Call OpenRouter with one retry on failure. */
async function callLLM(prompt) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await openrouter.chat.completions.create({
        model: MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 300,
      });
      return res.choices[0].message.content.trim();
    } catch (err) {
      if (attempt === 2) throw err;
      console.warn(`  LLM attempt ${attempt} failed: ${err.message} — retrying`);
    }
  }
}

/** Summarise a single article and classify its category. */
async function summariseArticle(title, description, defaultCategory) {
  const prompt = `You are a tech news editor. Given the article below, write a 2-3 sentence English summary and pick the most fitting category.

Categories: ai-release, engineering, tools, industry

Article title: ${title}
Article snippet: ${(description ?? '').slice(0, 800)}

Respond with JSON only — no markdown, no explanation:
{"summary": "...", "category": "..."}`;

  try {
    const raw = await callLLM(prompt);
    const json = JSON.parse(raw.replace(/^```json\n?|```$/g, '').trim());
    const category = VALID_CATEGORIES.includes(json.category)
      ? json.category
      : defaultCategory;
    return { summary: json.summary ?? null, category };
  } catch {
    return { summary: null, category: defaultCategory };
  }
}

/** Check which URLs already exist in the DB. Returns a Set of known URLs. */
async function getExistingUrls(urls) {
  const { data } = await supabase
    .from('articles')
    .select('url')
    .in('url', urls);
  return new Set((data ?? []).map((r) => r.url));
}

// ---------------------------------------------------------------------------
// Main pipeline
// ---------------------------------------------------------------------------
async function run() {
  const startedAt = Date.now();
  const cutoff = new Date(startedAt - LOOKBACK_MS);
  const today = new Date().toISOString().slice(0, 10);

  const stats = { sourcesOk: 0, sourcesFailed: 0, inserted: 0, skipped: 0 };
  /** @type {Array<{id: string, title: string}>} — for digest generation */
  const insertedArticles = [];

  console.log(`\n=== Daily News Agent — ${today} ===`);
  console.log(`Model: ${MODEL}`);
  console.log(`Cutoff: ${cutoff.toISOString()}\n`);

  // ---- 1. Fetch & process each source ---------------------------------
  for (const source of RSS_SOURCES) {
    if (stats.inserted >= MAX_ARTICLES_PER_DAY) {
      console.log(`Daily cap (${MAX_ARTICLES_PER_DAY}) reached — stopping early`);
      break;
    }

    console.log(`[${source.name}] fetching…`);

    let feed;
    try {
      feed = await rssParser.parseURL(source.url);
      stats.sourcesOk++;
    } catch (err) {
      console.warn(`  ✗ Failed to fetch: ${err.message}`);
      stats.sourcesFailed++;
      continue;
    }

    // Filter to last 24 h
    const recentItems = (feed.items ?? []).filter((item) => {
      const pub = item.pubDate ?? item.isoDate;
      if (!pub) return false;
      return new Date(pub) >= cutoff;
    });

    if (recentItems.length === 0) {
      console.log('  No new items in last 24 h');
      continue;
    }

    // Deduplicate against DB
    const urls = recentItems.map((i) => i.link).filter(Boolean);
    const existing = await getExistingUrls(urls);

    const newItems = recentItems.filter(
      (i) => i.link && !existing.has(i.link),
    );

    if (newItems.length === 0) {
      console.log(`  All ${recentItems.length} item(s) already in DB`);
      stats.skipped += recentItems.length;
      continue;
    }

    console.log(`  ${newItems.length} new item(s) to process`);

    for (const item of newItems) {
      if (stats.inserted >= MAX_ARTICLES_PER_DAY) break;

      const title       = item.title ?? '(no title)';
      const url         = item.link;
      const pubDate     = item.pubDate ?? item.isoDate;
      const description = item.contentSnippet ?? item.content ?? item.summary ?? '';

      process.stdout.write(`  → "${title.slice(0, 60)}"… `);

      const { summary, category } = await summariseArticle(
        title, description, source.defaultCategory,
      );

      const { data: inserted, error } = await supabase
        .from('articles')
        .insert({
          title,
          url,
          source:       source.name,
          category,
          published_at: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
          summary,
        })
        .select('id, title')
        .single();

      if (error) {
        console.log(`✗ DB error: ${error.message}`);
      } else {
        console.log(`✓ [${category}]`);
        stats.inserted++;
        insertedArticles.push(inserted);
      }
    }
  }

  // ---- 2. Daily digest ------------------------------------------------
  console.log('\n[Digest] generating…');

  let digestSummary = '';
  let topItems = [];

  if (insertedArticles.length > 0) {
    const titles = insertedArticles.slice(0, 20).map((a) => `- ${a.title}`).join('\n');
    const digestPrompt = `You are a senior tech journalist. Here are today's news headlines:

${titles}

1. Pick the 5 most important headlines (return them verbatim).
2. Write a 3-4 sentence "Key Takeaways" paragraph in English covering the main themes.

Respond with JSON only — no markdown:
{"top_items": ["...", "...", "...", "...", "..."], "summary": "..."}`;

    try {
      const raw = await callLLM(digestPrompt);
      const json = JSON.parse(raw.replace(/^```json\n?|```$/g, '').trim());
      topItems     = json.top_items ?? [];
      digestSummary = json.summary ?? '';
    } catch (err) {
      console.warn('  Digest LLM failed:', err.message);
      topItems     = insertedArticles.slice(0, 5).map((a) => a.title);
      digestSummary = 'Digest summary unavailable.';
    }
  } else {
    topItems     = [];
    digestSummary = 'No new articles collected today.';
  }

  const { error: digestError } = await supabase
    .from('digests')
    .upsert(
      { date: today, top_items: topItems, summary: digestSummary },
      { onConflict: 'date' },
    );

  if (digestError) {
    console.error('  ✗ Digest upsert failed:', digestError.message);
  } else {
    console.log(`  ✓ Digest upserted for ${today}`);
  }

  // ---- 3. Summary log -------------------------------------------------
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(`
=== Run complete in ${elapsed}s ===
  Sources OK:     ${stats.sourcesOk}
  Sources failed: ${stats.sourcesFailed}
  Articles inserted: ${stats.inserted}
  Articles skipped:  ${stats.skipped}
`);
}

// Allow importing run() from other modules (e.g. Vercel cron)
export { run };

// Run directly when executed as a script
const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isDirectRun) {
  run().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}
