import type { AppUser, UserSettings } from '../types/user';

const AUTH_SESSION_KEY = 'codearena.auth.session';
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

interface StoredAuthSession {
  user: AppUser;
  settings: UserSettings;
  expiresAt: number;
}

export function loadStoredSession(): StoredAuthSession | null {
  const rawValue = localStorage.getItem(AUTH_SESSION_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as StoredAuthSession;

    if (
      !parsed ||
      typeof parsed !== 'object' ||
      !parsed.user ||
      !parsed.settings ||
      typeof parsed.expiresAt !== 'number'
    ) {
      localStorage.removeItem(AUTH_SESSION_KEY);
      return null;
    }

    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem(AUTH_SESSION_KEY);
      return null;
    }

    return parsed;
  } catch {
    localStorage.removeItem(AUTH_SESSION_KEY);
    return null;
  }
}

export function persistSession(user: AppUser, settings: UserSettings): void {
  const payload: StoredAuthSession = {
    user,
    settings,
    expiresAt: Date.now() + SESSION_TTL_MS,
  };

  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(payload));
}

export function clearStoredSession(): void {
  localStorage.removeItem(AUTH_SESSION_KEY);
}
