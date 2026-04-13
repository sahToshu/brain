import { Trophy, Code, FileCheck, ChevronRight } from 'lucide-react';

interface QuickAccessProps {
  primaryColor: string;
}

export function QuickAccess({ primaryColor }: QuickAccessProps) {
  const items = [
    {
      icon: Trophy,
      label: 'Ваш турнір',
      description: 'Spring Algorithm Challenge',
      status: 'Триває',
      statusColor: '#10B981',
      href: '#'
    },
    {
      icon: Code,
      label: 'Ваше завдання',
      description: 'Two Sum Problem',
      status: 'В процесі',
      statusColor: '#F59E0B',
      href: '#'
    },
    {
      icon: FileCheck,
      label: 'Ваш сабміт',
      description: 'Binary Search Implementation',
      status: 'Перевірено',
      statusColor: primaryColor,
      href: '#'
    }
  ];

  return (
    <div className="bg-[#111115] rounded-xl border border-[#1a1a1f] p-5 mb-6">
      <h3 className="text-[#EDEDED] font-semibold mb-4">Швидкий доступ</h3>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group hover:bg-[#1a1a1f]"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${primaryColor}10`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${primaryColor}20` }}
            >
              <item.icon 
                className="w-5 h-5"
                style={{ color: primaryColor }}
              />
            </div>
            
            <div className="flex-1">
              <div className="text-[#9CA3AF] text-xs mb-1">{item.label}</div>
              <div className="text-[#EDEDED] text-sm font-medium">{item.description}</div>
              <div 
                className="text-xs mt-1"
                style={{ color: item.statusColor }}
              >
                {item.status}
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#EDEDED] transition-colors duration-200" />
          </a>
        ))}
      </div>
    </div>
  );
}
