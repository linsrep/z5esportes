export type AuthRole = 'athlete' | 'organizer' | 'admin';

export interface AuthUser {
  name: string;
  email: string;
  role: AuthRole;
}

const AUTH_USER_KEY = 'z5_auth_user';

export function setAuthUser(user: AuthUser) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearAuthUser() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(AUTH_USER_KEY);
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function isOrganizerAuthenticated() {
  return getAuthUser()?.role === 'organizer';
}

export function isAuthenticated() {
  return getAuthUser() !== null;
}
