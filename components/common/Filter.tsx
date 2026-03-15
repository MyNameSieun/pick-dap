import { cn } from '@/lib/utils';
import { Filter as FilterIcon } from 'lucide-react';

interface FilterProps {
  options: { value: string; label: string }[];
  handleFilterClick: () => void;
  handleFilterSelect: (value: string) => void;
  isFilterOpen: boolean;
  filterType: string;
}

const Filter = ({
  options,
  handleFilterClick,
  handleFilterSelect,
  isFilterOpen,
  filterType,
}: FilterProps) => {
  return (
    <div className="relative">
      <FilterIcon
        className="text-icon-default mr-2 cursor-pointer"
        size={20}
        onClick={handleFilterClick}
      />
      {isFilterOpen && (
        <div className="b2 absolute top-10 right-0 z-50 flex min-w-[120px] flex-col gap-2 rounded-md border border-gray-200 bg-white p-2 shadow-md">
          {options.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleFilterSelect(value)}
              className={cn(
                'w-full cursor-pointer rounded-sm px-4 py-2 text-left text-sm transition-colors',
                filterType === value
                  ? 'bg-main-100 text-main-400'
                  : 'text-gray-1000 hover:bg-gray-50',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
