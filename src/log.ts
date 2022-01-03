type Entry = {
  x: string;
  y: string;
  z: string;
  symbol: string;
};

export const generate = (values: number[]): Entry[] => {
  if (values.length === 0 || (values.length === 1 && values[0] === 0)) {
    return [
      {
        x: "0",
        y: "0",
        z: "0",
        symbol: "+",
      },
    ];
  }

  return values.map((value, i) => {
    const z = value.toLocaleString("en-US");

    if (i === 0) {
      return {
        x: "0",
        y: z,
        z,
        symbol: "+",
      };
    }

    const addend = value - values[i - 1];
    const symbol = addend > 0 ? "+" : "-";

    const x = values[i - 1].toLocaleString("en-US");
    const y = Math.abs(addend).toLocaleString("en-US");

    return {
      x,
      y,
      symbol,
      z,
    };
  });
};
