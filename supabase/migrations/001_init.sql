-- Daily Dev News Aggregator — Initial Schema
-- Run this in Supabase Dashboard → SQL Editor

-- ============================================================
-- Tables
-- ============================================================

CREATE TABLE IF NOT EXISTS articles (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title        text        NOT NULL,
  url          text        NOT NULL UNIQUE,
  source       text        NOT NULL,
  category     text        NOT NULL CHECK (category IN ('ai-release', 'engineering', 'tools', 'industry')),
  published_at timestamptz NOT NULL,
  collected_at timestamptz NOT NULL DEFAULT now(),
  summary      text
);

CREATE TABLE IF NOT EXISTS digests (
  id         uuid  PRIMARY KEY DEFAULT gen_random_uuid(),
  date       date  NOT NULL UNIQUE,
  top_items  text[] NOT NULL DEFAULT '{}',
  summary    text  NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category     ON articles (category);
CREATE INDEX IF NOT EXISTS idx_articles_source       ON articles (source);

-- ============================================================
-- Row-Level Security
-- ============================================================

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE digests  ENABLE ROW LEVEL SECURITY;

-- Anonymous read access (frontend uses anon key)
CREATE POLICY "anon read articles"
  ON articles FOR SELECT USING (true);

CREATE POLICY "anon read digests"
  ON digests FOR SELECT USING (true);

-- Agent writes using service_role key — bypasses RLS by design
