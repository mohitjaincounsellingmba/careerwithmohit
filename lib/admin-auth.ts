export const ADMIN_USERNAME = "careerwithmohit";
export const ADMIN_PASSWORD = "mohit2027";

const AUTH_KEY = "cwm_admin_token_v1";

export function verifyAdminCredentials(user: string, pass: string): boolean {
  return user.trim() === ADMIN_USERNAME && pass === ADMIN_PASSWORD;
}

export function createAdminSessionToken(): string {
  const tokenPayload = {
    username: ADMIN_USERNAME,
    authenticatedAt: Date.now(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days session
  };
  return btoa(JSON.stringify(tokenPayload));
}

export function isSessionValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const jsonStr = atob(token);
    const data = JSON.parse(jsonStr);
    if (data.username === ADMIN_USERNAME && data.expiresAt > Date.now()) {
      return true;
    }
  } catch (e) {
    return false;
  }
  return false;
}

export function saveAdminSession(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, token);
    sessionStorage.setItem(AUTH_KEY, token);
  }
}

export function getAdminSession(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(AUTH_KEY) || sessionStorage.getItem(AUTH_KEY);
  }
  return null;
}

export function clearAdminSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
  }
}
