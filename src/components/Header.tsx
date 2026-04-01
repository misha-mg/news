import { formatDistanceToNow } from '../lib/time';

interface HeaderProps {
  lastCollectedAt: string | null;
}

export function Header({ lastCollectedAt }: HeaderProps) {
  const subtitle = lastCollectedAt
    ? `Last updated ${formatDistanceToNow(lastCollectedAt)}`
    : 'No data yet';

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            Dev News
          </h1>
          <span className="hidden sm:inline text-sm text-gray-400">
            Daily IT &amp; AI briefing
          </span>
        </div>
        <p className="text-sm text-gray-400 shrink-0">{subtitle}</p>
      </div>
    </header>
  );
}
