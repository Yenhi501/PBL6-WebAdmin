import moment from 'moment';

export const formatDateRequest = (date: string | Date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss.SSSZ');
};
