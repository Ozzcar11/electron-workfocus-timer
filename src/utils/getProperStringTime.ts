export const getProperStringTime = (value: number): string => {
  return value < 10 ? `0${value}:00` : `${value}:00`;
};
