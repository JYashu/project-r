interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export default async ({ username, password }: { username: string; password: string }) => {
  return { accessToken: 'access', refreshToken: 'refresh' } as Tokens;
};

export const persistTokens = ({ accessToken, refreshToken }: Tokens) => {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const destroyTokens = () => {
  window.localStorage.removeItem('config');
  window.localStorage.removeItem('normalAccess');
  window.localStorage.removeItem('apiAccess');
};

export const getTokens = () => {
  const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY);

  return { accessToken, refreshToken };
};
