export const COLUMN = [
  true,
  true,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  true,
  true,
];

// prettier-ignore
const VALUES = [
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

export const STATE = [...new Array(13)].map(() => COLUMN);

export type Column = typeof COLUMN;
export type State = typeof STATE;
export type Value = typeof VALUES[number];

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

export const numberToValues = (number: number): Value[] => {
  return VALUES.reduce((acc, value) => {
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

export const amountToColumn = (length: number): Column => {
  return {
    0: COLUMN,
    1: [true, true, false, false, true, false, false, true, true, true, true],
    2: [true, true, false, false, true, true, false, false, true, true, true],
    3: [true, true, false, false, true, true, true, false, false, true, true],
    4: [true, true, false, false, true, true, true, true, false, false, true],
    5: [true, false, false, true, false, false, true, true, true, true, true],
    6: [true, false, false, true, true, false, false, true, true, true, true],
    7: [true, false, false, true, true, true, false, false, true, true, true],
    8: [true, false, false, true, true, true, true, false, false, true, true],
    9: [true, false, false, true, true, true, true, true, false, false, true],
  }[length];
};

export const numberToState = (number: number): State => {
  const values = numberToValues(number);

  return STATE.map((_, i) => {
    const value = VALUES[i];
    const amount = values.filter((v) => v === value).length;
    return amountToColumn(amount);
  });
};
