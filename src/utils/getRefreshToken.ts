import Cookies from 'js-cookie';
import axios from 'axios';
import { endpointServer } from './endpoint';

export const refreshToken = () => {
  const refreshToken =
    Cookies.get('refreshToken')?.replace(/^"(.*)"$/, '$1') || '';
  axios
    .post(`${endpointServer}/auth/get-access-token`, {
      refreshToken: refreshToken,
    })
    .then((res) => {
      let accessToken = JSON.stringify(res.data.result.token.accessToken);
      Cookies.set('accessToken', accessToken, { expires: 1 });
      console.log('Refresh Token');
    })
    .catch((err) => {
      console.log('Error refresh');

      console.log(err);
      if (err.response.status === 400) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
      }
      return 'error';
    });
};
