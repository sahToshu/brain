import { X } from 'lucide-react';

interface Task {
  id: string;
  index: string;
  title: string;
}

interface TaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskSelect: () => void;
  primaryColor: string;
  tournamentTitle: string;
  tournamentDescription?: string;
}

export function TaskListModal({
  isOpen,
  onClose,
  onTaskSelect,
  primaryColor,
  tournamentTitle,
  tournamentDescription,
}: TaskListModalProps) {
  if (!isOpen) return null;

  const tasks: Task[] = [
    { id: '1', index: 'A', title: 'Створіть систему автентифікації користувачів' },
    { id: '2', index: 'B', title: 'Реалізуйте dashboard з аналітикою' },
    { id: '3', index: 'C', title: 'Додайте функціонал пошуку та фільтрації' },
    { id: '4', index: 'D', title: 'Створіть систему коментарів та відгуків' },
    { id: '5', index: 'E', title: 'Реалізуйте систему сповіщень' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative bg-[#111115] rounded-2xl border border-[#1a1a1f] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        style={{ boxShadow: `0 0 60px ${primaryColor}40` }}
      >
        <div className="bg-[#111115] border-b border-[#1a1a1f] p-6 flex items-center justify-between">
          <div>
            <h2 className="text-[#EDEDED] font-bold text-2xl mb-1">Список задач</h2>
            <p className="text-[#9CA3AF] text-sm">{tournamentTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#EDEDED] transition-colors duration-150"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-2">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => onTaskSelect()}
                className="w-full flex items-center gap-4 p-4 rounded-lg border border-[#1a1a1f] hover:border-opacity-50 transition-all duration-200 text-left group"
                onMouseEnter={(event) => {
                  event.currentTarget.style.backgroundColor = '#1a1a1f';
                  event.currentTarget.style.borderColor = `${primaryColor}50`;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.backgroundColor = 'transparent';
                  event.currentTarget.style.borderColor = '#1a1a1f';
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0"
                  style={{
                    backgroundColor: `${primaryColor}20`,
                    color: primaryColor,
                  }}
                >
                  {task.index}
                </div>
                <div className="flex-1">
                  <h3 className="text-[#EDEDED] font-medium group-hover:opacity-90">{task.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        {tournamentDescription && (
          <div className="border-t border-[#1a1a1f] p-6 bg-[#0D0D0F]">
            <h3 className="text-[#EDEDED] font-semibold mb-2 text-sm">Про турнір</h3>
            <p className="text-[#9CA3AF] text-sm opacity-75 leading-relaxed">{tournamentDescription}</p>
          </div>
        )}
      </div>
    </div>
  );
}
