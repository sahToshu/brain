import { Filter } from 'lucide-react';

interface TournamentFiltersProps {
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
  primaryColor: string;
}

export function TournamentFilters({ selectedFilters, onFilterChange, primaryColor }: TournamentFiltersProps) {
  const filters = [
    { id: 'registration', label: 'Registration open' },
    { id: 'running', label: 'Running' },
    { id: 'finished', label: 'Finished' },
  ];

  const toggleFilter = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      onFilterChange(selectedFilters.filter(f => f !== filterId));
    } else {
      onFilterChange([...selectedFilters, filterId]);
    }
  };

  const clearFilters = () => {
    onFilterChange([]);
  };

  return (
    <div className="bg-[#111115] rounded-xl border border-[#1a1a1f] p-5 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#9CA3AF]" />
          <h3 className="text-[#EDEDED] font-semibold">Фільтри</h3>
        </div>
        {selectedFilters.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-[#9CA3AF] hover:text-[#EDEDED] text-sm transition-colors duration-150"
          >
            Очистити
          </button>
        )}
      </div>

      <div className="space-y-2">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => toggleFilter(filter.id)}
            className="w-full px-4 py-2.5 rounded-lg text-sm text-left transition-all duration-150 flex items-center justify-between"
            style={{
              backgroundColor: selectedFilters.includes(filter.id) ? `${primaryColor}20` : '#1a1a1f',
              color: selectedFilters.includes(filter.id) ? primaryColor : '#9CA3AF',
              borderLeft: selectedFilters.includes(filter.id) ? `3px solid ${primaryColor}` : '3px solid transparent'
            }}
          >
            <span>{filter.label}</span>
            {selectedFilters.includes(filter.id) && (
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: primaryColor }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-[#1a1a1f]">
        <div className="text-[#9CA3AF] text-xs">
          {selectedFilters.length === 0 
            ? 'Показано всі турніри' 
            : `Активні фільтри: ${selectedFilters.length}`
          }
        </div>
      </div>
    </div>
  );
}
