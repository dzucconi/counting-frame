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

// prettier-ignore
const RANGE = [
  10000000000,
  1000000000,
  100000000,
  10000000,
  1000000,
  100000,
  10000,
  1000,
  100,
  10,
  1,
  0.1,
  0.01,
] as const;

export type Column = typeof COLUMNS[0];
export type State = Column[];
export type Value = typeof RANGE[number];

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

export const numberToValues = (number: number): Value[] => {
  return RANGE.reduce((acc, value) => {
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
  }, [] as Value[]);
};

export const numberToState = (number: number): State => {
  const values = numberToValues(number);

  return RANGE.map((value) => {
    const amount = values.filter((v) => v === value).length;
    return COLUMNS[amount];
  });
};
