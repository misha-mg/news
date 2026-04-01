-- Seed data for local development / UI testing
-- Run AFTER 001_init.sql

INSERT INTO articles (title, url, source, category, published_at, summary) VALUES
(
  'Claude 3.5 Sonnet: Our Most Intelligent Model',
  'https://www.anthropic.com/news/claude-3-5-sonnet',
  'Anthropic Blog',
  'ai-release',
  now() - interval '2 hours',
  'Anthropic releases Claude 3.5 Sonnet, setting new performance benchmarks on coding and reasoning tasks. The model outperforms competitors on key evals while maintaining the same price point. Available today via API and Claude.ai.'
),
(
  'GPT-4o: Hello, GPT-4o',
  'https://openai.com/blog/hello-gpt-4o',
  'OpenAI Blog',
  'ai-release',
  now() - interval '3 hours',
  'OpenAI introduces GPT-4o, a natively multimodal model capable of understanding and generating text, audio, and images. The model brings significant latency improvements to voice interactions. GPT-4o is rolling out to ChatGPT Plus users immediately.'
),
(
  'Gemini 1.5 Pro Expands to 1M Token Context',
  'https://deepmind.google/technologies/gemini',
  'Google DeepMind',
  'ai-release',
  now() - interval '5 hours',
  'Google DeepMind expands Gemini 1.5 Pro to support a 1 million token context window, enabling analysis of entire codebases or hour-long videos in a single prompt. The model demonstrates strong recall accuracy across the full context length. Available through Google AI Studio and Vertex AI.'
),
(
  'Show HN: I built a local-first sync engine in Rust',
  'https://news.ycombinator.com/item?id=40000001',
  'Hacker News Top',
  'engineering',
  now() - interval '6 hours',
  'A developer shares a Rust-based local-first sync engine that uses CRDTs for conflict resolution without a central server. The project handles offline edits and merges them deterministically when peers reconnect. Source code and benchmarks are available on GitHub.'
),
(
  'Things I learned building a production RAG system',
  'https://simonwillison.net/2024/things-rag',
  'Simon Willison',
  'engineering',
  now() - interval '7 hours',
  'Simon Willison documents hard-won lessons from deploying a retrieval-augmented generation system at scale. Key insights cover chunking strategies, embedding model selection, and the importance of hybrid search. The post includes concrete benchmarks comparing different retrieval approaches.'
),
(
  'Introducing PEFT: State-of-the-art Parameter-Efficient Fine-Tuning',
  'https://huggingface.co/blog/peft',
  'Hugging Face Blog',
  'tools',
  now() - interval '8 hours',
  'Hugging Face releases PEFT, a library that enables fine-tuning large language models with minimal compute using techniques like LoRA and prefix tuning. The library integrates seamlessly with Transformers and reduces GPU memory requirements by up to 10x. Includes tutorials for common fine-tuning scenarios.'
),
(
  'Platform Engineering: The Next Evolution of DevOps',
  'https://newsletter.pragmaticengineer.com/p/platform-engineering',
  'The Pragmatic Engineer',
  'engineering',
  now() - interval '10 hours',
  'Gergely Orosz examines how platform engineering teams are becoming standard at mid-to-large tech companies. The article contrasts platform engineering with traditional DevOps and identifies the conditions under which dedicated platform teams provide the most value. Includes salary data and org structure examples from surveyed companies.'
),
(
  'The Race to Build AI Infrastructure',
  'https://www.technologyreview.com/2024/ai-infrastructure',
  'MIT Technology Review',
  'industry',
  now() - interval '11 hours',
  'MIT Technology Review analyzes the accelerating investment in AI data centers and custom silicon by hyperscalers and startups alike. Power consumption and water usage are emerging as key constraints on expansion. The article projects AI infrastructure spending to exceed $200B annually by 2026.'
),
(
  'Micro-frontends at Scale: Lessons from Netflix',
  'https://feed.infoq.com/articles/micro-frontends-netflix',
  'InfoQ',
  'engineering',
  now() - interval '12 hours',
  'Netflix engineers share their journey migrating to a micro-frontend architecture serving 270 million users. The team built a custom module federation system to handle their unique performance requirements. Detailed coverage of the tradeoffs between team autonomy and runtime performance.'
),
(
  'GitHub Trending: vercel/ai tops stars this week',
  'https://mshibanami.github.io/GitHubTrendingRSS/daily/all.xml',
  'GitHub Trending',
  'tools',
  now() - interval '13 hours',
  'The Vercel AI SDK tops GitHub trending repositories this week with 3,200 new stars. The library simplifies building streaming AI interfaces for React, Next.js, and Node.js applications. Recent additions include support for tool calling and multi-step agent workflows.'
),
(
  'OpenAI Announces $4B Investment from SoftBank',
  'https://openai.com/blog/softbank-investment',
  'OpenAI Blog',
  'industry',
  now() - interval '14 hours',
  'OpenAI secures a $4 billion investment from SoftBank, bringing its total valuation to over $100 billion. The capital will be directed toward compute infrastructure and safety research. The deal includes a strategic partnership for deploying AI across SoftBank portfolio companies.'
),
(
  'How We Reduced p99 Latency by 40% with Connection Pooling',
  'https://news.ycombinator.com/item?id=40000002',
  'Hacker News Top',
  'engineering',
  now() - interval '15 hours',
  'An engineering team shares how they eliminated database connection overhead by introducing PgBouncer in transaction mode. The change reduced p99 API latency by 40% under peak load without any application code changes. Post includes before/after flame graphs and configuration details.'
),
(
  'LangChain v0.2: Rethinking the Agent Loop',
  'https://huggingface.co/blog/langchain-v02',
  'Hugging Face Blog',
  'tools',
  now() - interval '16 hours',
  'LangChain releases version 0.2 with a redesigned agent execution loop focused on reliability and observability. Breaking changes include a unified streaming interface and improved error propagation from tool calls. Migration guide covers the most common upgrade paths from v0.1.'
),
(
  'EU AI Act: What Developers Need to Know',
  'https://www.technologyreview.com/2024/eu-ai-act-developers',
  'MIT Technology Review',
  'industry',
  now() - interval '18 hours',
  'A practical breakdown of the EU AI Act''s requirements for software developers building AI-powered products. High-risk system classifications, conformity assessments, and documentation requirements are explained with concrete examples. Compliance timelines vary by system risk category, with the strictest rules taking effect in 2026.'
);

-- Today's digest
INSERT INTO digests (date, top_items, summary) VALUES (
  CURRENT_DATE,
  ARRAY[
    'Claude 3.5 Sonnet: Our Most Intelligent Model',
    'GPT-4o: Hello, GPT-4o',
    'Gemini 1.5 Pro Expands to 1M Token Context',
    'Platform Engineering: The Next Evolution of DevOps',
    'EU AI Act: What Developers Need to Know'
  ],
  'Today''s AI landscape is defined by a fierce capability race at the frontier: Anthropic, OpenAI, and Google DeepMind each shipped major model updates within hours of each other, with context length and multimodality as the main battlegrounds. On the infrastructure side, the EU AI Act is forcing developers to think about compliance timelines for the first time, while SoftBank''s $4B OpenAI investment signals that capital is still flowing freely into the space. For engineers, platform engineering is crystallising as its own discipline, and the RAG + fine-tuning toolchain is maturing fast with new releases from Hugging Face and LangChain.'
)
ON CONFLICT (date) DO UPDATE
  SET top_items = EXCLUDED.top_items,
      summary   = EXCLUDED.summary;
