import { User, Settings, LogOut, Code, Palette, Globe } from 'lucide-react';
import { useState } from 'react';
import { UserAvatar } from './UserAvatar';
import type { AppLanguage, AppUser, UserSettings } from '../types/user';

interface AccountDropdownProps {
  user: AppUser;
  settings: UserSettings;
  primaryColor: string;
  onClose: () => void;
  onColorChange: (color: string) => void;
  language: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  onLogout: () => void;
}

export function AccountDropdown({
  user,
  settings,
  primaryColor,
  onClose,
  onColorChange,
  language,
  onLanguageChange,
  onLogout,
}: AccountDropdownProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const presetColors = ['#5B2EFF', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6'];

  const t = {
    UA: {
      profile: 'Профіль',
      mySolutions: 'Мої рішення',
      settings: 'Налаштування',
      themeColor: 'Колір теми',
      language: 'Мова',
      logout: 'Вийти',
    },
    EN: {
      profile: 'Profile',
      mySolutions: 'My Solutions',
      settings: 'Settings',
      themeColor: 'Theme Color',
      language: 'Language',
      logout: 'Logout',
    },
  };

  const translations = t[language];
  const menuItems = [
    { icon: User, label: translations.profile, href: '#' },
    { icon: Code, label: translations.mySolutions, href: '#' },
    { icon: Settings, label: translations.settings, href: '#' },
  ];

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute top-full right-0 mt-2 w-[280px] bg-[#111115] rounded-xl shadow-2xl border border-[#1a1a1f] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="p-4 border-b border-[#1a1a1f]">
          <div className="flex items-center gap-3">
            <UserAvatar
              fullName={user.fullName}
              username={user.username}
              primaryColor={primaryColor}
              size="md"
            />
            <div>
              <div className="text-[#EDEDED] font-medium">{user.fullName}</div>
              <div className="text-[#9CA3AF] text-xs">{user.email}</div>
              {user.school && <div className="text-[#6B7280] text-xs mt-1">{user.school}</div>}
            </div>
          </div>
        </div>

        <div className="py-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 text-[#9CA3AF] hover:text-[#EDEDED] hover:bg-[#1a1a1f] transition-all duration-150"
              onMouseEnter={(event) => {
                event.currentTarget.style.backgroundColor = `${primaryColor}15`;
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </a>
          ))}

          <div className="px-4 py-2.5">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-4 h-4 text-[#9CA3AF]" />
              <span className="text-sm text-[#9CA3AF]">{translations.language}</span>
            </div>
            <div className="flex gap-2 ml-7">
              <button
                onClick={() => onLanguageChange('UA')}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150"
                style={{
                  backgroundColor: language === 'UA' ? `${primaryColor}20` : '#1a1a1f',
                  color: language === 'UA' ? primaryColor : '#9CA3AF',
                }}
              >
                UA
              </button>
              <button
                onClick={() => onLanguageChange('EN')}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150"
                style={{
                  backgroundColor: language === 'EN' ? `${primaryColor}20` : '#1a1a1f',
                  color: language === 'EN' ? primaryColor : '#9CA3AF',
                }}
              >
                EN
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="flex items-center gap-3 px-4 py-2.5 text-[#9CA3AF] hover:text-[#EDEDED] transition-all duration-150 w-full"
            onMouseEnter={(event) => {
              event.currentTarget.style.backgroundColor = `${primaryColor}15`;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Palette className="w-4 h-4" />
            <span className="text-sm">{translations.themeColor}</span>
          </button>

          {showColorPicker && (
            <div className="px-4 py-3 border-t border-[#1a1a1f] bg-[#0D0D0F]">
              <div className="text-[#6B7280] text-xs mb-3">user_settings.theme={settings.theme}</div>
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(event) => onColorChange(event.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-2 border-[#1a1a1f]"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(event) => onColorChange(event.target.value)}
                  className="flex-1 bg-[#111115] text-[#EDEDED] text-xs px-2 py-2 rounded-lg border border-[#1a1a1f] focus:outline-none"
                  style={{ borderColor: primaryColor }}
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => onColorChange(color)}
                    className="w-full h-8 rounded-lg transition-all duration-150 hover:scale-110 border-2"
                    style={{
                      backgroundColor: color,
                      borderColor: primaryColor === color ? '#EDEDED' : 'transparent',
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-[#1a1a1f] py-2">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-2.5 text-[#9CA3AF] hover:text-[#EDEDED] transition-all duration-150 w-full"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">{translations.logout}</span>
          </button>
        </div>
      </div>
    </>
  );
}
