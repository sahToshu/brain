import { getUserInitial } from '../lib/user';

interface UserAvatarProps {
  fullName: string;
  username: string;
  primaryColor: string;
  size?: 'sm' | 'md';
}

const sizeClassMap = {
  sm: 'w-9 h-9 text-sm',
  md: 'w-10 h-10 text-base',
};

export function UserAvatar({
  fullName,
  username,
  primaryColor,
  size = 'sm',
}: UserAvatarProps) {
  return (
    <div
      className={`${sizeClassMap[size]} rounded-full flex items-center justify-center text-white font-semibold uppercase`}
      style={{ backgroundColor: primaryColor }}
      aria-label={`Avatar for ${fullName || username}`}
    >
      {getUserInitial(fullName, username)}
    </div>
  );
}
