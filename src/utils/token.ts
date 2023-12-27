import Cookies from 'js-cookie';

export const accessToken =
  Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
