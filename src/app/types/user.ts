export type AppLanguage = 'UA' | 'EN';
export type AppTheme = 'dark' | 'light';

export interface AppUser {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  fullName: string;
  birthDate: string;
  school?: string;
  createdAt: string;
}

export interface UserSettings {
  id: number;
  userId: number;
  language: AppLanguage;
  primaryColor: string;
  secondaryColor: string;
  theme: AppTheme;
}

export interface UserRegistrationData {
  fullName: string;
  username: string;
  password: string;
  email: string;
  birthDate: string;
  school?: string;
}
