const COLUMNS = [
  ["A", "B", false, false, false, false, "C", "D", "E", "F", "G"], // 0
  ["A", "B", false, false, "C", false, false, "D", "E", "F", "G"], // 1
  ["A", "B", false, false, "C", "D", false, false, "E", "F", "G"], // 2
  ["A", "B", false, false, "C", "D", "E", false, false, "F", "G"], // 3
  ["A", "B", false, false, "C", "D", "E", "F", false, false, "G"], // 4
  ["A", false, false, "B", false, false, "C", "D", "E", "F", "G"], // 5
  ["A", false, false, "B", "C", false, false, "D", "E", "F", "G"], // 6
  ["A", false, false, "B", "C", "D", false, false, "E", "F", "G"], // 7
  ["A", false, false, "B", "C", "D", "E", false, false, "F", "G"], // 8
  ["A", false, false, "B", "C", "D", "E", "F", false, false, "G"], // 9
];

export const buildRange = (max: number): number[] => {
  const limit = 10 ** Math.ceil(Math.log10(max));
  const powers = Math.max(Math.floor(Math.log10(limit)), 0);

  return [...new Array(powers)]
    .reduce(
      (acc, _, i) => {
        return [...acc, 10 ** (i + 1)];
      },
      [1]
    )
    .reverse();
};

export const MAX = 10000000000;
export const RANGE = buildRange(MAX);
export const LIMIT = MAX - 1;

export type Column = typeof COLUMNS[0];
export type State = Column[];

export const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

export const encodeColumn = (number: number): number[] => {
  return RANGE.reduce((acc: number[], value: number) => {
    const current = sum(acc);
    const remainder = number - current;

    if (current === number) {
      return acc;
    }

    if (remainder >= value) {
      const times = Math.floor(remainder / value);
      return [...acc, ...[...new Array(times)].map(() => value)];
    }

    return acc;
  }, []);
};

export const encode = (number: number): State => {
  const values = encodeColumn(number);

  return RANGE.map((value) => {
    const amount = values.filter((v) => v === value).length;
    return COLUMNS[amount];
  });
};
