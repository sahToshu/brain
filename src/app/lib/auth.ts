import type { UserLoginData, UserRegistrationData, UserRegistrationResult } from '../types/user';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function registerUser(data: UserRegistrationData): Promise<UserRegistrationResult> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      school: data.school?.trim() || 'Not specified',
    }),
  });

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => null)) as { message?: string | string[] } | null;
    const message = Array.isArray(errorPayload?.message)
      ? errorPayload.message.join(', ')
      : errorPayload?.message ?? 'Registration failed';

    throw new Error(message);
  }

  return (await response.json()) as UserRegistrationResult;
}

export async function loginUser(data: UserLoginData): Promise<UserRegistrationResult> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => null)) as { message?: string | string[] } | null;
    const message = Array.isArray(errorPayload?.message)
      ? errorPayload.message.join(', ')
      : errorPayload?.message ?? 'Login failed';

    throw new Error(message);
  }

  return (await response.json()) as UserRegistrationResult;
}
