export const truncate = (str: string, size: number = 20) => {
  if (str.length < size) return str;
  else return str.substring(0, size) + "...";
};
