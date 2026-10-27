export const sortByDate = <T extends { data: { date?: Date | string } }>(array: T[]): T[] => {
  const sortedArray = array.sort((a, b) => new Date(b.data.date!).valueOf() - new Date(a.data.date!).valueOf());
  return sortedArray;
};

export const sortByWeight = (array: any[]) => {
  const withWeight = array.filter((item: { data: { weight: any } }) => item.data.weight);
  const withoutWeight = array.filter((item: { data: { weight: any } }) => !item.data.weight);
  const sortedWeightedArray = withWeight.sort(
    (a: { data: { weight: number } }, b: { data: { weight: number } }) => a.data.weight - b.data.weight,
  );
  const sortedArray = [...new Set([...sortedWeightedArray, ...withoutWeight])];
  return sortedArray;
};
