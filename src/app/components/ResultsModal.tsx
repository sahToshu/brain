import { X, Trophy, Filter, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Participant {
  id: string;
  type: 'individual' | 'team';
  name: string;
  city?: string;
  scores: {
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
  };
  total: number;
}

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  primaryColor: string;
  tournamentTitle: string;
}

export function ResultsModal({ 
  isOpen, 
  onClose, 
  primaryColor,
  tournamentTitle 
}: ResultsModalProps) {
  if (!isOpen) return null;

  const [filterType, setFilterType] = useState<'all' | 'individual' | 'team'>('all');
  const [filterCity, setFilterCity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'total' | 'name'>('total');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data
  const allParticipants: Participant[] = [
    { id: '1', type: 'individual', name: 'Іванов Петро Михайлович', city: 'Київ', scores: { A: 100, B: 85, C: 90, D: 75, E: 95 }, total: 445 },
    { id: '2', type: 'team', name: 'Code Warriors', city: 'Львів', scores: { A: 95, B: 90, C: 85, D: 90, E: 80 }, total: 440 },
    { id: '3', type: 'individual', name: 'Коваленко Марія Сергіївна', city: 'Харків', scores: { A: 90, B: 95, C: 80, D: 85, E: 85 }, total: 435 },
    { id: '4', type: 'team', name: 'ByteForce', city: undefined, scores: { A: 85, B: 80, C: 95, D: 80, E: 90 }, total: 430 },
    { id: '5', type: 'individual', name: 'Шевченко Андрій Васильович', city: 'Одеса', scores: { A: 80, B: 85, C: 85, D: 90, E: 75 }, total: 415 },
    { id: '6', type: 'team', name: 'Algorithm Masters', city: 'Дніпро', scores: { A: 75, B: 90, C: 75, D: 85, E: 85 }, total: 410 },
    { id: '7', type: 'individual', name: 'Мельник Олена Іванівна', city: 'Київ', scores: { A: 85, B: 75, C: 90, D: 70, E: 80 }, total: 400 },
    { id: '8', type: 'team', name: 'Logic Squad', city: 'Львів', scores: { A: 70, B: 80, C: 80, D: 80, E: 85 }, total: 395 },
    { id: '9', type: 'individual', name: 'Бондаренко Сергій Олександрович', city: undefined, scores: { A: 75, B: 70, C: 75, D: 85, E: 80 }, total: 385 },
    { id: '10', type: 'team', name: 'Data Wizards', city: 'Харків', scores: { A: 65, B: 75, C: 70, D: 75, E: 90 }, total: 375 },
  ];

  // Get unique cities for filter
  const cities = Array.from(new Set(allParticipants.map(p => p.city).filter(Boolean))) as string[];

  // Apply filters
  let filteredParticipants = allParticipants;
  
  if (filterType !== 'all') {
    filteredParticipants = filteredParticipants.filter(p => p.type === filterType);
  }
  
  if (filterCity !== 'all') {
    filteredParticipants = filteredParticipants.filter(p => p.city === filterCity);
  }

  // Apply sorting
  filteredParticipants = [...filteredParticipants].sort((a, b) => {
    if (sortBy === 'total') {
      return sortOrder === 'desc' ? b.total - a.total : a.total - b.total;
    } else {
      return sortOrder === 'desc' 
        ? b.name.localeCompare(a.name, 'uk')
        : a.name.localeCompare(b.name, 'uk');
    }
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10B981';
    if (score >= 70) return '#F59E0B';
    if (score >= 50) return '#EF4444';
    return '#6B7280';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className="relative bg-[#111115] rounded-2xl border border-[#1a1a1f] w-full max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        style={{
          boxShadow: `0 0 60px ${primaryColor}40`
        }}
      >
        {/* Header */}
        <div className="bg-[#111115] border-b border-[#1a1a1f] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: `${primaryColor}20`,
                  color: primaryColor
                }}
              >
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-[#EDEDED] font-bold text-2xl">Результати турніру</h2>
                <p className="text-[#9CA3AF] text-sm">{tournamentTitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[#9CA3AF] hover:text-[#EDEDED] transition-colors duration-150"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1a1a1f] hover:border-opacity-50 transition-all duration-200 text-[#9CA3AF] hover:text-[#EDEDED]"
            style={{
              borderColor: showFilters ? primaryColor : '#1a1a1f'
            }}
          >
            <Filter className="w-4 h-4" />
            <span>Фільтри</span>
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 rounded-lg bg-[#0D0D0F] border border-[#1a1a1f] space-y-4">
              <div className="grid grid-cols-4 gap-4">
                {/* Type Filter */}
                <div>
                  <label className="text-[#9CA3AF] text-sm mb-2 block">Тип учасника</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="w-full bg-[#111115] text-[#EDEDED] px-3 py-2 rounded-lg border border-[#1a1a1f] focus:outline-none focus:border-opacity-50"
                    style={{
                      borderColor: filterType !== 'all' ? primaryColor : '#1a1a1f'
                    }}
                  >
                    <option value="all">Всі</option>
                    <option value="individual">Одиночні</option>
                    <option value="team">Команди</option>
                  </select>
                </div>

                {/* City Filter */}
                <div>
                  <label className="text-[#9CA3AF] text-sm mb-2 block">Місто</label>
                  <select
                    value={filterCity}
                    onChange={(e) => setFilterCity(e.target.value)}
                    className="w-full bg-[#111115] text-[#EDEDED] px-3 py-2 rounded-lg border border-[#1a1a1f] focus:outline-none focus:border-opacity-50"
                    style={{
                      borderColor: filterCity !== 'all' ? primaryColor : '#1a1a1f'
                    }}
                  >
                    <option value="all">Всі міста</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="text-[#9CA3AF] text-sm mb-2 block">Сортувати за</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-[#111115] text-[#EDEDED] px-3 py-2 rounded-lg border border-[#1a1a1f] focus:outline-none"
                    style={{
                      borderColor: primaryColor
                    }}
                  >
                    <option value="total">Загальним балом</option>
                    <option value="name">Ім'ям</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="text-[#9CA3AF] text-sm mb-2 block">Порядок</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as any)}
                    className="w-full bg-[#111115] text-[#EDEDED] px-3 py-2 rounded-lg border border-[#1a1a1f] focus:outline-none"
                    style={{
                      borderColor: primaryColor
                    }}
                  >
                    <option value="desc">За спаданням</option>
                    <option value="asc">За зростанням</option>
                  </select>
                </div>
              </div>

              {/* Results count */}
              <div className="text-[#9CA3AF] text-sm">
                Показано результатів: <span style={{ color: primaryColor }}>{filteredParticipants.length}</span> з {allParticipants.length}
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-[#0D0D0F] sticky top-0 z-10">
              <tr>
                <th className="text-left text-[#9CA3AF] font-semibold px-6 py-4 border-b border-[#1a1a1f]">
                  #
                </th>
                <th className="text-left text-[#9CA3AF] font-semibold px-6 py-4 border-b border-[#1a1a1f]">
                  Учасник
                </th>
                <th className="text-left text-[#9CA3AF] font-semibold px-6 py-4 border-b border-[#1a1a1f]">
                  Місто
                </th>
                <th className="text-center text-[#9CA3AF] font-semibold px-4 py-4 border-b border-[#1a1a1f]">
                  A
                </th>
                <th className="text-center text-[#9CA3AF] font-semibold px-4 py-4 border-b border-[#1a1a1f]">
                  B
                </th>
                <th className="text-center text-[#9CA3AF] font-semibold px-4 py-4 border-b border-[#1a1a1f]">
                  C
                </th>
                <th className="text-center text-[#9CA3AF] font-semibold px-4 py-4 border-b border-[#1a1a1f]">
                  D
                </th>
                <th className="text-center text-[#9CA3AF] font-semibold px-4 py-4 border-b border-[#1a1a1f]">
                  E
                </th>
                <th className="text-center text-[#9CA3AF] font-semibold px-6 py-4 border-b border-[#1a1a1f]">
                  Всього
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map((participant, index) => (
                <tr 
                  key={participant.id}
                  className="border-b border-[#1a1a1f] hover:bg-[#1a1a1f] transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {index < 3 && (
                        <Trophy 
                          className="w-4 h-4"
                          style={{
                            color: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32'
                          }}
                        />
                      )}
                      <span className="text-[#9CA3AF] font-medium">{index + 1}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-[#EDEDED] font-medium">{participant.name}</div>
                      <div className="text-[#9CA3AF] text-xs mt-0.5">
                        {participant.type === 'individual' ? 'Одиночний' : 'Команда'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#9CA3AF]">
                      {participant.city || '—'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span 
                      className="inline-block px-3 py-1 rounded-lg font-semibold"
                      style={{
                        backgroundColor: `${getScoreColor(participant.scores.A)}20`,
                        color: getScoreColor(participant.scores.A)
                      }}
                    >
                      {participant.scores.A}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span 
                      className="inline-block px-3 py-1 rounded-lg font-semibold"
                      style={{
                        backgroundColor: `${getScoreColor(participant.scores.B)}20`,
                        color: getScoreColor(participant.scores.B)
                      }}
                    >
                      {participant.scores.B}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span 
                      className="inline-block px-3 py-1 rounded-lg font-semibold"
                      style={{
                        backgroundColor: `${getScoreColor(participant.scores.C)}20`,
                        color: getScoreColor(participant.scores.C)
                      }}
                    >
                      {participant.scores.C}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span 
                      className="inline-block px-3 py-1 rounded-lg font-semibold"
                      style={{
                        backgroundColor: `${getScoreColor(participant.scores.D)}20`,
                        color: getScoreColor(participant.scores.D)
                      }}
                    >
                      {participant.scores.D}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span 
                      className="inline-block px-3 py-1 rounded-lg font-semibold"
                      style={{
                        backgroundColor: `${getScoreColor(participant.scores.E)}20`,
                        color: getScoreColor(participant.scores.E)
                      }}
                    >
                      {participant.scores.E}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span 
                      className="inline-block px-4 py-1.5 rounded-lg font-bold text-lg"
                      style={{
                        backgroundColor: `${primaryColor}20`,
                        color: primaryColor
                      }}
                    >
                      {participant.total}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer with stats */}
        <div className="border-t border-[#1a1a1f] p-4 bg-[#0D0D0F]">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="text-[#9CA3AF]">
                <span className="font-semibold text-[#EDEDED]">{filteredParticipants.filter(p => p.type === 'individual').length}</span> одиночних учасників
              </div>
              <div className="text-[#9CA3AF]">
                <span className="font-semibold text-[#EDEDED]">{filteredParticipants.filter(p => p.type === 'team').length}</span> команд
              </div>
            </div>
            {filteredParticipants.length > 0 && (
              <div className="text-[#9CA3AF]">
                Середній бал: <span className="font-semibold" style={{ color: primaryColor }}>
                  {Math.round(filteredParticipants.reduce((sum, p) => sum + p.total, 0) / filteredParticipants.length)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
