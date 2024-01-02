import dayjs from 'dayjs';

export const formatDateRequest = (date: string | Date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss.SSSZ');
};
