import { useState } from 'react';
import { X } from 'lucide-react';

interface SearchDropdownProps {
  primaryColor: string;
}

export function SearchDropdown({ primaryColor }: SearchDropdownProps) {
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const types = ['Турніри', 'Задачі', 'Користувачі'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const statuses = ['Активні', 'Завершені', 'Upcoming'];

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: (value: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearAll = () => {
    setSelectedType([]);
    setSelectedDifficulty([]);
    setSelectedStatus([]);
  };

  return (
    <div className="absolute top-full mt-2 left-0 w-[400px] bg-[#111115] rounded-xl shadow-2xl border border-[#1a1a1f] p-4 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#EDEDED] font-semibold">Фільтри пошуку</span>
        <button
          onClick={clearAll}
          className="text-[#9CA3AF] hover:text-[#EDEDED] text-sm transition-colors duration-150"
        >
          Очистити все
        </button>
      </div>

      {/* Type Filter */}
      <div className="mb-4">
        <label className="text-[#9CA3AF] text-sm mb-2 block">Тип</label>
        <div className="flex flex-wrap gap-2">
          {types.map(type => (
            <button
              key={type}
              onClick={() => toggleFilter(type, selectedType, setSelectedType)}
              className="px-3 py-1.5 rounded-lg text-sm transition-all duration-150"
              style={{
                backgroundColor: selectedType.includes(type) ? primaryColor : '#1a1a1f',
                color: selectedType.includes(type) ? '#fff' : '#9CA3AF'
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="mb-4">
        <label className="text-[#9CA3AF] text-sm mb-2 block">Складність</label>
        <div className="flex flex-wrap gap-2">
          {difficulties.map(difficulty => (
            <button
              key={difficulty}
              onClick={() => toggleFilter(difficulty, selectedDifficulty, setSelectedDifficulty)}
              className="px-3 py-1.5 rounded-lg text-sm transition-all duration-150"
              style={{
                backgroundColor: selectedDifficulty.includes(difficulty) ? primaryColor : '#1a1a1f',
                color: selectedDifficulty.includes(difficulty) ? '#fff' : '#9CA3AF'
              }}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div className="mb-4">
        <label className="text-[#9CA3AF] text-sm mb-2 block">Статус</label>
        <div className="flex flex-wrap gap-2">
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => toggleFilter(status, selectedStatus, setSelectedStatus)}
              className="px-3 py-1.5 rounded-lg text-sm transition-all duration-150"
              style={{
                backgroundColor: selectedStatus.includes(status) ? primaryColor : '#1a1a1f',
                color: selectedStatus.includes(status) ? '#fff' : '#9CA3AF'
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Live Results */}
      <div className="border-t border-[#1a1a1f] pt-3 mt-3">
        <span className="text-[#9CA3AF] text-sm">Результати пошуку</span>
        <div className="mt-2 space-y-2">
          <div className="p-2 rounded-lg hover:bg-[#1a1a1f] cursor-pointer transition-colors duration-150">
            <div className="text-[#EDEDED] text-sm">Algorithm Tournament 2026</div>
            <div className="text-[#9CA3AF] text-xs">Активний турнір · 5 задач</div>
          </div>
          <div className="p-2 rounded-lg hover:bg-[#1a1a1f] cursor-pointer transition-colors duration-150">
            <div className="text-[#EDEDED] text-sm">Two Sum Problem</div>
            <div className="text-[#9CA3AF] text-xs">Задача · Easy</div>
          </div>
        </div>
      </div>
    </div>
  );
}
