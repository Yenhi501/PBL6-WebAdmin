import Cookies from 'js-cookie';

export interface TokenObject {
  exp: number;
  iat: number;
  role: number;
  subscriptionTypeId: number;
  userId: number;
  username: string;
  accessToken: string;
  refreshToken: string;
}

export const useToken = () => {
  const accessToken =
    Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
  const refreshToken =
    Cookies.get('refreshToken')?.replace(/^"(.*)"$/, '$1') || '';

  let tokenObject: TokenObject = {
    exp: 0,
    iat: 0,
    role: 0,
    subscriptionTypeId: 0,
    userId: 0,
    username: '',
    accessToken: '',
    refreshToken: '',
  };
  try {
    if (accessToken != null) {
      tokenObject = JSON.parse(atob(accessToken.split('.')[1]));
    }
  } catch (err) {
    console.log(err);
  }

  tokenObject['accessToken'] = accessToken;
  tokenObject['refreshToken'] = refreshToken;

  return { ...tokenObject };
};
