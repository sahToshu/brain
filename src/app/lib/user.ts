import type { AppLanguage, AppUser, UserRegistrationData, UserSettings } from '../types/user';

interface BuildUserAccountOptions {
  language: AppLanguage;
  primaryColor: string;
}

export function buildUserAccount(
  data: UserRegistrationData,
  options: BuildUserAccountOptions,
): { user: AppUser; settings: UserSettings } {
  const userId = Date.now();
  const createdAt = new Date().toISOString();

  return {
    user: {
      id: userId,
      username: data.username.trim(),
      email: data.email.trim(),
      passwordHash: `local:${data.password}`,
      fullName: data.fullName.trim(),
      birthDate: data.birthDate,
      school: data.school?.trim() || undefined,
      createdAt,
    },
    settings: {
      id: userId,
      userId,
      language: options.language,
      primaryColor: options.primaryColor,
      secondaryColor: '#111115',
      theme: 'dark',
    },
  };
}

export function getUserInitial(fullName: string, username: string): string {
  const source = fullName.trim() || username.trim() || 'G';
  return source.charAt(0).toUpperCase();
}
