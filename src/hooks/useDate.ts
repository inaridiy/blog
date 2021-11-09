export const useDate = (dateString: string) => {
  const date = new Date(dateString);
  const [day, month, year] = [
    date.getDay(),
    date.getMonth(),
    date.getFullYear(),
  ];
  return `${year}.${month}.${day}`;
};
