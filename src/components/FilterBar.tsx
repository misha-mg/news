import type { Category } from '../types/news';

const FILTERS: Array<{ label: string; value: Category | undefined }> = [
  { label: 'All',         value: undefined },
  { label: 'AI Release',  value: 'ai-release' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Tools',       value: 'tools' },
  { label: 'Industry',    value: 'industry' },
];

interface FilterBarProps {
  active: Category | undefined;
  onChange: (category: Category | undefined) => void;
}

export function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <nav className="flex flex-wrap gap-2 md:gap-4 mb-12 md:mb-24 items-center">
      <span className="font-body text-xs md:text-sm uppercase tracking-widest text-primary mr-2 md:mr-4">
        Categories
      </span>
      {FILTERS.map(({ label, value }) => {
        const isActive = active === value;
        return (
          <button
            key={label}
            onClick={() => onChange(value)}
            className={[
              'rounded-full px-4 md:px-6 py-1.5 md:py-2 font-body text-xs md:text-sm uppercase tracking-wider md:tracking-widest transition-all duration-300 active:scale-95',
              isActive
                ? 'bg-primary-container text-white shadow-sm hover:bg-primary'
                : 'bg-secondary-container text-on-surface opacity-80 hover:bg-primary hover:text-white',
            ].join(' ')}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
