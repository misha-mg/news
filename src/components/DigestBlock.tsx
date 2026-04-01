import type { Digest } from '../types/news';

interface DigestBlockProps {
  digest: Digest | null;
  loading: boolean;
}

export function DigestBlock({ digest, loading }: DigestBlockProps) {
  if (loading) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-40 mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full" />
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    );
  }

  if (!digest) return null;

  return (
    <section className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
      <h2 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider mb-4">
        Today's Digest — {digest.date}
      </h2>

      <ol className="space-y-1.5 mb-5">
        {digest.top_items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-gray-800">
            <span className="text-indigo-400 font-medium tabular-nums shrink-0">
              {i + 1}.
            </span>
            {item}
          </li>
        ))}
      </ol>

      <p className="text-sm text-gray-700 leading-relaxed border-t border-indigo-100 pt-4">
        {digest.summary}
      </p>
    </section>
  );
}
