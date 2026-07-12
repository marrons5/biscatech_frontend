const TOKEN_KEY = "auth_token";
const TOKEN_EXP_KEY = "auth_token_exp";
const REFRESH_TOKEN_KEY = "auth_refresh_token";
const PENDING_EMAIL_KEY = "nema:pending-email";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export function setAuthToken(token: string, expiresInMs = SEVEN_DAYS_MS): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXP_KEY, String(Date.now() + expiresInMs));
}

export function clearAuthToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXP_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function getAuthToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(TOKEN_EXP_KEY);

  if (expiry && Date.now() > parseInt(expiry, 10)) {
    clearAuthToken();
    return null;
  }

  return token;
}

export function setRefreshToken(token: string): void {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setPendingEmail(email: string): void {
  localStorage.setItem(PENDING_EMAIL_KEY, email);
}

export function getPendingEmail(): string | null {
  return localStorage.getItem(PENDING_EMAIL_KEY);
}

export function clearPendingEmail(): void {
  localStorage.removeItem(PENDING_EMAIL_KEY);
}
