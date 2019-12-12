export function sort<T>(records: Array<T>, key: keyof T, reverse?: boolean): Array<T> {
  const sortedArray: Array<T> = records.sort((record1, record2): number => {
    const prop1 = record1[key];
    const prop2 = record2[key];

    if (prop1 < prop2) {
      return -1;
    }

    if (prop1 > prop2) {
      return 1;
    }

    return 0;
  });

  // Note: i'm lazy
  if (reverse) {
    return sortedArray.reverse();
  }

  return sortedArray;
}
