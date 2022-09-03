export const getQuery = (url: string, data: any[] = []) => {
  let totalString = "?";
  data.map((item) => {
    if (totalString.length === 1) {
      totalString += `${item.key}=${item.value}`;
    } else {
      totalString += `&${item.key}=${item.value}`;
    }
    return null;
  });
  return url + totalString;
};
