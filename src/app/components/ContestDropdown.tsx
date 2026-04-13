import { Trophy } from 'lucide-react';

interface ContestDropdownProps {
  primaryColor: string;
  onClose: () => void;
  language: 'UA' | 'EN';
}

export function ContestDropdown({ primaryColor, onClose, language }: ContestDropdownProps) {
  const t = {
    UA: {
      myTournaments: 'Мої турніри'
    },
    EN: {
      myTournaments: 'My Tournaments'
    }
  };

  const translations = t[language];

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute top-full left-0 mt-2 w-[220px] bg-[#111115] rounded-xl shadow-2xl border border-[#1a1a1f] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="py-2">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2.5 text-[#9CA3AF] hover:text-[#EDEDED] transition-all duration-150"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${primaryColor}15`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Trophy className="w-4 h-4" />
            <span className="text-sm">{translations.myTournaments}</span>
          </a>
        </div>
      </div>
    </>
  );
}