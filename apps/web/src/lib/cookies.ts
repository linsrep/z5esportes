export interface SelectedEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  tag?: string;
  extra_items?: Array<{
    id?: string;
    name: string;
    price: string;
    description?: string;
  }>;
}

export function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function getCookie(name: string) {
  const cookies = document.cookie.split('; ').reduce<Record<string, string>>((acc, cookie) => {
    const [cookieName, ...rest] = cookie.split('=');
    acc[cookieName] = rest.join('=');
    return acc;
  }, {});

  const value = cookies[name];
  return value ? decodeURIComponent(value) : null;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
}

export function setJsonCookie<T>(name: string, value: T, days = 7) {
  setCookie(name, JSON.stringify(value), days);
}

export function getJsonCookie<T>(name: string): T | null {
  const rawValue = getCookie(name);
  if (!rawValue) return null;

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return null;
  }
}
