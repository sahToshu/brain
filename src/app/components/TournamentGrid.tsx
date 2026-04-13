import { TournamentCard } from './TournamentCard';

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

interface TournamentGridProps {
  tournaments: Tournament[];
  primaryColor: string;
  onRegisterClick: (tournament: Tournament) => void;
  onJoinClick: (tournament: Tournament) => void;
  onResultsClick: (tournament: Tournament) => void;
}

export function TournamentGrid({ tournaments, primaryColor, onRegisterClick, onJoinClick, onResultsClick }: TournamentGridProps) {
  if (tournaments.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-[#9CA3AF] text-lg">
          Немає турнірів за обраними фільтрами
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {tournaments.map((tournament) => (
        <TournamentCard
          key={tournament.id}
          tournament={tournament}
          primaryColor={primaryColor}
          onRegisterClick={() => onRegisterClick(tournament)}
          onJoinClick={() => onJoinClick(tournament)}
          onResultsClick={() => onResultsClick(tournament)}
        />
      ))}
    </div>
  );
}