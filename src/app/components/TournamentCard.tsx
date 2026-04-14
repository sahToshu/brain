import type { CSSProperties } from 'react';
import { Calendar, Clock, FileText, Users } from 'lucide-react';

interface Tournament {
  id: number;
  title: string;
  status: 'active' | 'upcoming' | 'completed';
  description: string;
  startDate: string;
  endDate: string;
  duration: string;
  taskCount: number;
  participants: number;
  isRegistered: boolean;
  tag?: string;
}

interface TournamentCardProps {
  tournament: Tournament;
  primaryColor: string;
  onRegisterClick?: () => void;
  onJoinClick?: () => void;
  onResultsClick?: () => void;
}

export function TournamentCard({
  tournament,
  primaryColor,
  onRegisterClick,
  onJoinClick,
  onResultsClick,
}: TournamentCardProps) {
  const statusConfig = {
    active: { label: 'Активний', color: '#10B981' },
    completed: { label: 'Завершений', color: '#6B7280' },
    upcoming: { label: 'Запланований', color: '#F59E0B' },
  };

  const currentStatus = statusConfig[tournament.status];

  const handleButtonClick = () => {
    if (tournament.status === 'completed' && onResultsClick) {
      onResultsClick();
    } else if (tournament.isRegistered && onJoinClick) {
      onJoinClick();
    } else if (!tournament.isRegistered && onRegisterClick) {
      onRegisterClick();
    }
  };

  const getButtonText = () => {
    if (tournament.status === 'completed') {
      return 'Результати';
    }

    return tournament.isRegistered ? 'Приєднатися' : 'Зареєструватися';
  };

  const getButtonStyle = () => {
    if (tournament.status === 'completed') {
      return {
        backgroundColor: primaryColor,
        color: '#fff',
        borderColor: 'transparent',
      };
    }

    return {
      backgroundColor: tournament.isRegistered ? '#0D0D0F' : primaryColor,
      color: tournament.isRegistered ? primaryColor : '#fff',
      borderColor: tournament.isRegistered ? primaryColor : 'transparent',
    };
  };

  return (
    <div
      className="bg-[#111115] rounded-xl border border-[#1a1a1f] overflow-hidden hover:border-opacity-50 transition-all duration-200 hover:shadow-lg flex flex-col"
      style={{ '--hover-border-color': primaryColor } as CSSProperties}
      onMouseEnter={(event) => {
        event.currentTarget.style.borderColor = `${primaryColor}50`;
        event.currentTarget.style.boxShadow = `0 10px 40px ${primaryColor}20`;
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.borderColor = '#1a1a1f';
        event.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="p-5 border-b border-[#1a1a1f]">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-[#EDEDED] font-semibold text-lg">{tournament.title}</h3>
          <span
            className="px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap"
            style={{
              backgroundColor: tournament.isRegistered ? `${primaryColor}20` : `${currentStatus.color}20`,
              color: tournament.isRegistered ? primaryColor : currentStatus.color,
            }}
          >
            {tournament.isRegistered ? 'Зареєстровано' : currentStatus.label}
          </span>
        </div>
        <p className="text-[#9CA3AF] text-sm leading-relaxed mb-2">{tournament.description}</p>
        {tournament.tag && (
          <span
            className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${primaryColor}15`,
              color: primaryColor,
            }}
          >
            {tournament.tag}
          </span>
        )}
      </div>

      <div className="p-5 flex-1">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
            <Calendar className="w-4 h-4" />
            <span>
              {tournament.startDate} - {tournament.endDate}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
            <Clock className="w-4 h-4" />
            <span>{tournament.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
            <FileText className="w-4 h-4" />
            <span>{tournament.taskCount} задач</span>
          </div>
          <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
            <Users className="w-4 h-4" />
            <span>{tournament.participants} учасників</span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0">
        <button
          onClick={handleButtonClick}
          className="w-full py-2.5 rounded-lg font-medium transition-all duration-200 hover:opacity-90 border"
          style={getButtonStyle()}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}
