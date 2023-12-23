export const convertStringTrueFalse = (value: string) => {
  if (value === 'false') {
    return false;
  } else if (value === 'true') {
    return true;
  }
  return false;
};
