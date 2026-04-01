// Run after the SQL migration: node scripts/seed.mjs
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yuiakvbeuggxfvhtnokc.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1aWFrdmJldWdneGZ2aHRub2tjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDgxNzYyNCwiZXhwIjoyMDkwMzkzNjI0fQ.qPI4LY3sxOVapAiceg_KDOLLiHZPSGdgHewditKpCA8';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const now = new Date();
const h = (hours) => new Date(now.getTime() - hours * 3600_000).toISOString();
const today = now.toISOString().slice(0, 10);

const articles = [
  { title: 'Claude 3.5 Sonnet: Our Most Intelligent Model', url: 'https://www.anthropic.com/news/claude-3-5-sonnet', source: 'Anthropic Blog', category: 'ai-release', published_at: h(2), summary: 'Anthropic releases Claude 3.5 Sonnet, setting new performance benchmarks on coding and reasoning tasks. The model outperforms competitors on key evals while maintaining the same price point. Available today via API and Claude.ai.' },
  { title: 'GPT-4o: Hello, GPT-4o', url: 'https://openai.com/blog/hello-gpt-4o', source: 'OpenAI Blog', category: 'ai-release', published_at: h(3), summary: 'OpenAI introduces GPT-4o, a natively multimodal model capable of understanding and generating text, audio, and images. The model brings significant latency improvements to voice interactions. GPT-4o is rolling out to ChatGPT Plus users immediately.' },
  { title: 'Gemini 1.5 Pro Expands to 1M Token Context', url: 'https://deepmind.google/technologies/gemini', source: 'Google DeepMind', category: 'ai-release', published_at: h(5), summary: 'Google DeepMind expands Gemini 1.5 Pro to support a 1 million token context window, enabling analysis of entire codebases or hour-long videos in a single prompt. Available through Google AI Studio and Vertex AI.' },
  { title: 'Show HN: I built a local-first sync engine in Rust', url: 'https://news.ycombinator.com/item?id=40000001', source: 'Hacker News Top', category: 'engineering', published_at: h(6), summary: 'A developer shares a Rust-based local-first sync engine that uses CRDTs for conflict resolution without a central server. The project handles offline edits and merges them deterministically when peers reconnect.' },
  { title: 'Things I learned building a production RAG system', url: 'https://simonwillison.net/2024/things-rag', source: 'Simon Willison', category: 'engineering', published_at: h(7), summary: 'Simon Willison documents hard-won lessons from deploying a retrieval-augmented generation system at scale. Key insights cover chunking strategies, embedding model selection, and the importance of hybrid search.' },
  { title: 'Introducing PEFT: State-of-the-art Parameter-Efficient Fine-Tuning', url: 'https://huggingface.co/blog/peft', source: 'Hugging Face Blog', category: 'tools', published_at: h(8), summary: 'Hugging Face releases PEFT, a library enabling fine-tuning large language models with minimal compute using techniques like LoRA and prefix tuning. Reduces GPU memory requirements by up to 10x.' },
  { title: 'Platform Engineering: The Next Evolution of DevOps', url: 'https://newsletter.pragmaticengineer.com/p/platform-engineering', source: 'The Pragmatic Engineer', category: 'engineering', published_at: h(10), summary: 'Gergely Orosz examines how platform engineering teams are becoming standard at mid-to-large tech companies, contrasting platform engineering with traditional DevOps and identifying conditions for dedicated platform teams.' },
  { title: 'The Race to Build AI Infrastructure', url: 'https://www.technologyreview.com/2024/ai-infrastructure', source: 'MIT Technology Review', category: 'industry', published_at: h(11), summary: 'MIT Technology Review analyzes the accelerating investment in AI data centers and custom silicon by hyperscalers and startups alike. AI infrastructure spending projected to exceed $200B annually by 2026.' },
  { title: 'Micro-frontends at Scale: Lessons from Netflix', url: 'https://feed.infoq.com/articles/micro-frontends-netflix', source: 'InfoQ', category: 'engineering', published_at: h(12), summary: 'Netflix engineers share their journey migrating to a micro-frontend architecture serving 270 million users. The team built a custom module federation system to handle their unique performance requirements.' },
  { title: 'GitHub Trending: vercel/ai tops stars this week', url: 'https://github.com/trending', source: 'GitHub Trending', category: 'tools', published_at: h(13), summary: 'The Vercel AI SDK tops GitHub trending this week with 3,200 new stars. The library simplifies building streaming AI interfaces for React, Next.js, and Node.js with support for tool calling and multi-step agent workflows.' },
  { title: 'OpenAI Announces $4B Investment from SoftBank', url: 'https://openai.com/blog/softbank-investment', source: 'OpenAI Blog', category: 'industry', published_at: h(14), summary: 'OpenAI secures a $4 billion investment from SoftBank, bringing its total valuation to over $100 billion. Capital directed toward compute infrastructure and safety research.' },
  { title: 'How We Reduced p99 Latency by 40% with Connection Pooling', url: 'https://news.ycombinator.com/item?id=40000002', source: 'Hacker News Top', category: 'engineering', published_at: h(15), summary: 'An engineering team shares how they eliminated database connection overhead by introducing PgBouncer in transaction mode, reducing p99 API latency by 40% without any application code changes.' },
  { title: 'LangChain v0.2: Rethinking the Agent Loop', url: 'https://huggingface.co/blog/langchain-v02', source: 'Hugging Face Blog', category: 'tools', published_at: h(16), summary: 'LangChain releases v0.2 with a redesigned agent execution loop focused on reliability and observability. Breaking changes include a unified streaming interface and improved error propagation from tool calls.' },
  { title: 'EU AI Act: What Developers Need to Know', url: 'https://www.technologyreview.com/2024/eu-ai-act-developers', source: 'MIT Technology Review', category: 'industry', published_at: h(18), summary: 'A practical breakdown of the EU AI Act requirements for developers building AI-powered products. High-risk system classifications, conformity assessments, and documentation requirements explained with compliance timelines.' },
];

const digest = {
  date: today,
  top_items: [
    'Claude 3.5 Sonnet: Our Most Intelligent Model',
    'GPT-4o: Hello, GPT-4o',
    'Gemini 1.5 Pro Expands to 1M Token Context',
    'Platform Engineering: The Next Evolution of DevOps',
    'EU AI Act: What Developers Need to Know',
  ],
  summary: "Today's AI landscape is defined by a fierce capability race at the frontier: Anthropic, OpenAI, and Google DeepMind each shipped major model updates, with context length and multimodality as the main battlegrounds. On the infrastructure side, the EU AI Act is forcing developers to think about compliance timelines for the first time, while SoftBank's $4B OpenAI investment signals that capital is still flowing freely into the space. For engineers, platform engineering is crystallising as its own discipline, and the RAG + fine-tuning toolchain is maturing fast.",
};

async function main() {
  console.log('Seeding articles...');
  const { error: articlesError } = await supabase
    .from('articles')
    .upsert(articles, { onConflict: 'url' });

  if (articlesError) {
    console.error('Articles error:', articlesError.message);
    process.exit(1);
  }
  console.log(`✓ ${articles.length} articles inserted`);

  console.log('Seeding digest...');
  const { error: digestError } = await supabase
    .from('digests')
    .upsert(digest, { onConflict: 'date' });

  if (digestError) {
    console.error('Digest error:', digestError.message);
    process.exit(1);
  }
  console.log('✓ Digest inserted for', today);
  console.log('\nDone! Run npm run dev to see the result.');
}

main();
