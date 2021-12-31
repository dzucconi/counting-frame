import { generate } from "../log";

describe("generate", () => {
  it("returns a log for empty array", () => {
    expect(generate([])).toEqual(["0 + 0 = 0"]);
  });

  it("returns a log for an array of 0", () => {
    expect(generate([0])).toEqual(["0 + 0 = 0"]);
  });

  it("returns a log for a simple array of values", () => {
    expect(generate([1, 3, 9, 4])).toEqual([
      "0 + 1 = 1",
      "1 + 2 = 3",
      "3 + 6 = 9",
      "9 - 5 = 4",
    ]);
  });

  it("returns a log for a slightly more complex set of values", () => {
    expect(generate([48427, 3, 207, 251, 44])).toEqual([
      "0 + 48,427 = 48,427",
      "48,427 - 48,424 = 3",
      "3 + 204 = 207",
      "207 + 44 = 251",
      "251 - 207 = 44",
    ]);
  });

  it("returns a log for a complex set of values", () => {
    expect(generate([14248482, 2499076730, 2503520061, 2503616020])).toEqual([
      "0 + 14,248,482 = 14,248,482",
      "14,248,482 + 2,484,828,248 = 2,499,076,730",
      "2,499,076,730 + 4,443,331 = 2,503,520,061",
      "2,503,520,061 + 95,959 = 2,503,616,020",
    ]);
  });
});
