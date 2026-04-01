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
    <div className="flex flex-wrap gap-2">
      {FILTERS.map(({ label, value }) => {
        const isActive = active === value;
        return (
          <button
            key={label}
            onClick={() => onChange(value)}
            className={[
              'px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors',
              isActive
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ].join(' ')}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
