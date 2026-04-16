export type AppLanguage = 'UA' | 'EN';
export type AppTheme = 'dark' | 'light';
export type AppUserRole = 'ADMIN' | 'GUEST' | 'JURY';

export interface AppUser {
  id: number;
  username: string;
  email: string;
  fullName: string;
  birthDate: string;
  school: string;
  role: AppUserRole;
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

export interface UserLoginData {
  credential: string;
  password: string;
}

export interface UserRegistrationResult {
  user: AppUser;
  settings: UserSettings;
}
