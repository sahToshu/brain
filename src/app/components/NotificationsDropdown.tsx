import { Bell, Check } from 'lucide-react';

interface NotificationsDropdownProps {
  primaryColor: string;
  onClose: () => void;
}

export function NotificationsDropdown({ primaryColor, onClose }: NotificationsDropdownProps) {
  const notifications = [
    {
      id: 1,
      title: 'Новий турнір',
      message: 'Spring Algorithm Challenge 2026 відкрито для реєстрації',
      time: '5 хв тому',
      unread: true
    },
    {
      id: 2,
      title: 'Результати турніру',
      message: 'Ви зайняли 12 місце в Winter Code Sprint',
      time: '2 год тому',
      unread: true
    },
    {
      id: 3,
      title: 'Нова задача',
      message: 'Dynamic Programming Challenge додано до вашого плейлиста',
      time: '1 день тому',
      unread: false
    }
  ];

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute top-full right-0 mt-2 w-[380px] bg-[#111115] rounded-xl shadow-2xl border border-[#1a1a1f] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="p-4 border-b border-[#1a1a1f] flex items-center justify-between">
          <span className="text-[#EDEDED] font-semibold">Повідомлення</span>
          <button className="text-[#9CA3AF] hover:text-[#EDEDED] text-sm transition-colors duration-150">
            Позначити всі прочитаними
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className="p-4 border-b border-[#1a1a1f] hover:bg-[#1a1a1f] cursor-pointer transition-all duration-150 relative"
            >
              {notification.unread && (
                <div
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                />
              )}
              <div className={`${notification.unread ? 'pl-4' : ''}`}>
                <div className="text-[#EDEDED] text-sm font-medium mb-1">
                  {notification.title}
                </div>
                <div className="text-[#9CA3AF] text-xs mb-2">
                  {notification.message}
                </div>
                <div className="text-[#9CA3AF] text-xs">
                  {notification.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 text-center border-t border-[#1a1a1f]">
          <button 
            className="text-sm transition-colors duration-150 hover:opacity-80"
            style={{ color: primaryColor }}
          >
            Переглянути всі повідомлення
          </button>
        </div>
      </div>
    </>
  );
}
