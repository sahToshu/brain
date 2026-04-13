import { Search, Bell, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { SearchDropdown } from './SearchDropdown';
import { NotificationsDropdown } from './NotificationsDropdown';
import { AccountDropdown } from './AccountDropdown';
import { ContestDropdown } from './ContestDropdown';
import { UserStatus } from './UserStatus';

interface HeaderProps {
  primaryColor: string;
  onColorChange: (color: string) => void;
  userStatus?: 'admin' | 'team' | 'jury' | null;
  onRegisterClick?: () => void;
  language: 'UA' | 'EN';
  onLanguageChange: (lang: 'UA' | 'EN') => void;
}

export function Header({ 
  primaryColor, 
  onColorChange, 
  userStatus = null, 
  onRegisterClick,
  language,
  onLanguageChange 
}: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [contestOpen, setContestOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<'overview' | 'tournaments'>('overview');

  const t = {
    UA: {
      overview: 'Огляд',
      tournaments: 'Турніри',
      myTournaments: 'Мої турніри',
      search: 'Пошук...',
      register: 'Зареєструватися'
    },
    EN: {
      overview: 'Overview',
      tournaments: 'Tournaments',
      myTournaments: 'My Tournaments',
      search: 'Search...',
      register: 'Sign Up'
    }
  };

  const translations = t[language];

  return (
    <header className="bg-[#0D0D0F] border-b border-[#1a1a1f] sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: primaryColor }}
            >
              <span className="text-white font-bold text-xl">&lt;/&gt;</span>
            </div>
            <span className="text-[#EDEDED] font-bold text-xl">CodeArena</span>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-6">
            <button
              onClick={() => setCurrentTab('overview')}
              className="text-[#EDEDED] hover:opacity-80 transition-all duration-200 px-3 py-1.5 rounded-lg"
              style={{
                backgroundColor: currentTab === 'overview' ? `${primaryColor}20` : 'transparent',
                color: currentTab === 'overview' ? primaryColor : '#EDEDED'
              }}
            >
              {translations.overview}
            </button>

            {/* Tournaments Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setCurrentTab('tournaments');
                  setContestOpen(!contestOpen);
                }}
                className="flex items-center gap-1 text-[#EDEDED] hover:opacity-80 transition-all duration-200 px-3 py-1.5 rounded-lg"
                style={{
                  backgroundColor: currentTab === 'tournaments' ? `${primaryColor}20` : 'transparent',
                  color: currentTab === 'tournaments' ? primaryColor : '#EDEDED'
                }}
              >
                {translations.tournaments}
                <ChevronDown className="w-4 h-4" />
              </button>
              {contestOpen && (
                <ContestDropdown 
                  primaryColor={primaryColor} 
                  onClose={() => setContestOpen(false)}
                  language={language}
                />
              )}
            </div>
          </nav>
        </div>

        {/* Search, Notifications, Account, Register, Status */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Search */}
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder={translations.search}
                className="bg-[#111115] text-[#EDEDED] pl-10 pr-4 py-2 rounded-lg w-[280px] border border-transparent focus:border-opacity-50 focus:outline-none transition-all duration-200"
                style={{ 
                  borderColor: searchFocused ? primaryColor : 'transparent' 
                }}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              />
            </div>
            {searchFocused && <SearchDropdown primaryColor={primaryColor} />}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-[#9CA3AF] hover:text-[#EDEDED] transition-all duration-200 rounded-lg hover:bg-[#111115]"
            >
              <Bell className="w-5 h-5" />
              <span 
                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: primaryColor }}
              />
            </button>
            {notificationsOpen && (
              <NotificationsDropdown 
                primaryColor={primaryColor}
                onClose={() => setNotificationsOpen(false)}
              />
            )}
          </div>

          {/* Account */}
          <div className="relative">
            <button
              onClick={() => setAccountOpen(!accountOpen)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: primaryColor }}
            >
              A
            </button>
            {accountOpen && (
              <AccountDropdown 
                primaryColor={primaryColor}
                onClose={() => setAccountOpen(false)}
                onColorChange={onColorChange}
                language={language}
                onLanguageChange={onLanguageChange}
              />
            )}
          </div>

          {/* Register Button */}
          {onRegisterClick && (
            <button
              onClick={onRegisterClick}
              className="px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: primaryColor,
                color: '#fff',
                boxShadow: `0 0 20px ${primaryColor}40`
              }}
            >
              {translations.register}
            </button>
          )}

          {/* User Status */}
          <UserStatus status={userStatus} />
        </div>
      </div>
    </header>
  );
}