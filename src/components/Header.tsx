import { formatDistanceToNow } from '../lib/time';

interface HeaderProps {
  lastCollectedAt: string | null;
}

export function Header({ lastCollectedAt }: HeaderProps) {
  const timeLabel = lastCollectedAt
    ? `Last updated ${formatDistanceToNow(lastCollectedAt)}`
    : 'No data yet';

  return (
    <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-8 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col">
          <span className="text-2xl font-headline font-black text-primary">
            Dev News
          </span>
          <span className="font-body text-xs font-normal opacity-70 tracking-wide">
            Daily IT &amp; AI briefing — {timeLabel}
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#digest"
            className="text-primary font-bold border-b-2 border-primary-container pb-1 hover:text-primary-container transition-colors duration-300"
          >
            Daily Digest
          </a>
          <a
            href="#feed"
            className="text-on-surface opacity-70 font-medium hover:text-primary-container transition-colors duration-300"
          >
            Latest
          </a>
        </nav>

        <button className="hidden sm:block bg-primary hover:bg-primary-container text-on-primary px-6 py-2 rounded-full font-body text-sm font-semibold transition-all duration-300">
          Subscribe
        </button>
      </div>
      <div className="bg-surface-container-low h-px w-full" />
    </header>
  );
}
