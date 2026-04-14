export interface Tournament {
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
