export const generate = (values: number[]): string[] => {
  if (values.length === 0 || (values.length === 1 && values[0] === 0)) {
    return ["0 + 0 = 0"];
  }

  return values.map((value, i) => {
    const z = value.toLocaleString("en-US");

    if (i === 0) {
      return `0 + ${z} = ${z}`;
    }

    const addend = value - values[i - 1];
    const symbol = addend > 0 ? "+" : "-";

    const x = values[i - 1].toLocaleString("en-US");
    const y = Math.abs(addend).toLocaleString("en-US");

    return `${x} ${symbol} ${y} = ${z}`;
  });
};
