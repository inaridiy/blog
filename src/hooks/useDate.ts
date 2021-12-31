export const useDate = (dateString: string) => {
  const date = new Date(dateString);
  const [day, month, year] = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear(),
  ];
  return `${year}/${month}/${day}`;
};
