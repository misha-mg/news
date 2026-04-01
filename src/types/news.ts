export type Category = 'ai-release' | 'engineering' | 'tools' | 'industry';

export interface Article {
  id: string;
  title: string;
  url: string;
  source: string;
  category: Category;
  published_at: string;  // ISO 8601
  collected_at: string;  // ISO 8601
  summary: string | null;
}

export interface Digest {
  id: string;
  date: string;         // YYYY-MM-DD
  top_items: string[];
  summary: string;
  created_at: string;
}
