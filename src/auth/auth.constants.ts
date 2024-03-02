export const EXPIRE_DAY_REFRESH_TOKEN = 1;
export const REFRESH_TOKEN_NAME = 'refreshToken';

export const SET_COOKIE_OPTIONS = {
  httpOnly: true,
  // change in prod with .env
  domain: 'localhost',
  secure: true,
  //in prod change to 'lax'
  sameSite: 'none',
} as const;

export const EXEPTION_MSG_INVALID_REFRESH_TOKEN = 'Invalid refresh token';
