const COLUMNS = [
  [true, true, false, false, false, false, true, true, true, true, true],
  [true, true, false, false, true, false, false, true, true, true, true],
  [true, true, false, false, true, true, false, false, true, true, true],
  [true, true, false, false, true, true, true, false, false, true, true],
  [true, true, false, false, true, true, true, true, false, false, true],
  [true, false, false, true, false, false, true, true, true, true, true],
  [true, false, false, true, true, false, false, true, true, true, true],
  [true, false, false, true, true, true, false, false, true, true, true],
  [true, false, false, true, true, true, true, false, false, true, true],
  [true, false, false, true, true, true, true, true, false, false, true],
];

export const buildRange = (max: number) => {
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

const RANGE = buildRange(10000000000);

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
