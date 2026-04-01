# Daily Dev News Aggregator

Automated IT/AI news aggregator that collects articles from 10 RSS sources, generates AI summaries, and presents them in a clean filterable feed.

## How It Works

```
RSS Sources (10 feeds)
      |  daily cron
Agent (scripts/agent.mjs)
      |  fetch → summarize via LLM → categorize
Supabase (PostgreSQL)
      |  REST API (read-only anon key)
React Frontend
      |  deployed on Vercel
```

The **agent** runs once a day: fetches RSS feeds, summarizes each article with an LLM (OpenRouter), classifies it into a category, and writes everything to Supabase. It also generates a daily digest with top 5 headlines and key takeaways.

The **frontend** reads directly from Supabase — no backend needed.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4 |
| Database | Supabase (PostgreSQL + REST API + RLS) |
| Agent | Node.js script, OpenRouter (LLM), rss-parser |
| Deploy | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- An [OpenRouter](https://openrouter.ai) API key (for the agent)

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

OPENROUTER_API_KEY=your-openrouter-key
```

`VITE_`-prefixed vars are used by the frontend. The rest are used by the agent/seed scripts.

### 3. Set up the database

Run the migration in your Supabase SQL editor:

```bash
# The migration file is at:
supabase/migrations/001_init.sql
```

This creates the `articles` and `digests` tables with indexes and RLS policies.

### 4. Seed sample data (optional)

```bash
node scripts/seed.mjs
```

### 5. Run the dev server

```bash
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `node scripts/agent.mjs` | Run the news collection agent |
| `node scripts/seed.mjs` | Seed the database with sample articles |

## RSS Sources

| Source | Default Category |
|--------|-----------------|
| Anthropic Blog | AI Release |
| OpenAI Blog | AI Release |
| Google DeepMind | AI Release |
| Hacker News Top | Engineering |
| Simon Willison | Engineering |
| Hugging Face Blog | Tools |
| The Pragmatic Engineer | Engineering |
| MIT Technology Review | Industry |
| InfoQ | Engineering |
| GitHub Trending | Tools |

## Project Structure

```
src/
  components/     UI components (Header, DigestBlock, FilterBar, NewsFeed, NewsCard)
  hooks/          Custom hooks (useArticles, useDigest)
  lib/            Supabase client, time formatting utility
  types/          TypeScript type definitions
scripts/
  agent.mjs       Daily RSS → LLM → Supabase pipeline
  seed.mjs        One-time database seed
supabase/
  migrations/     SQL schema and RLS policies
```

## Categories

Articles are classified into four categories:

- **AI Release** — new model launches, capability updates
- **Engineering** — architecture, infrastructure, best practices
- **Tools** — developer tools, libraries, frameworks
- **Industry** — business, regulation, funding

## Deployment

The frontend is deployed to Vercel. Set the environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in your Vercel project settings.

The agent should be scheduled to run daily (e.g. via cron, GitHub Actions, or a cloud function).
