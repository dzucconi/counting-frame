import { buildRange, encodeColumn, sum, encode } from "../abacus";

describe("abacus", () => {
  describe("buildRange", () => {
    it("builds the range of powers", () => {
      expect(buildRange(10000000000)).toEqual([
        10000000000, 1000000000, 100000000, 10000000, 1000000, 100000, 10000,
        1000, 100, 10, 1,
      ]);
    });
  });

  describe("encodeColumn", () => {
    it("encodes 0", () => {
      expect(encodeColumn(0)).toEqual([]);
    });

    it("encodes positive numbers", () => {
      expect(encodeColumn(1)).toEqual([1]);
      expect(encodeColumn(2)).toEqual([1, 1]);
      expect(encodeColumn(3)).toEqual([1, 1, 1]);
      expect(encodeColumn(9)).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1]);
      expect(encodeColumn(10)).toEqual([10]);
      expect(encodeColumn(20)).toEqual([10, 10]);
      expect(encodeColumn(15)).toEqual([10, 1, 1, 1, 1, 1]);
      expect(encodeColumn(666)).toEqual([
        100, 100, 100, 100, 100, 100, 10, 10, 10, 10, 10, 10, 1, 1, 1, 1, 1, 1,
      ]);
      expect(encodeColumn(10482478924)).toEqual([
        10000000000, 100000000, 100000000, 100000000, 100000000, 10000000,
        10000000, 10000000, 10000000, 10000000, 10000000, 10000000, 10000000,
        1000000, 1000000, 100000, 100000, 100000, 100000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
        1000, 100, 100, 100, 100, 100, 100, 100, 100, 100, 10, 10, 1, 1, 1, 1,
      ]);
    });

    it("encodes a result that sums to the input", () => {
      const output = encodeColumn(10482478924);

      expect(output).toEqual([
        10000000000, 100000000, 100000000, 100000000, 100000000, 10000000,
        10000000, 10000000, 10000000, 10000000, 10000000, 10000000, 10000000,
        1000000, 1000000, 100000, 100000, 100000, 100000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
        1000, 100, 100, 100, 100, 100, 100, 100, 100, 100, 10, 10, 1, 1, 1, 1,
      ]);

      expect(Math.round(sum(output))).toEqual(10482478924);
    });
  });

  describe("encode", () => {
    it("converts a number to a columnar representation", () => {
      expect(encode(666)).toEqual([
        ["A", "B", false, false, false, false, "C", "D", "E", "F", "G"],
        ["A", "B", false, false, false, false, "C", "D", "E", "F", "G"],
        ["A", "B", false, false, false, false, "C", "D", "E", "F", "G"],
        ["A", "B", false, false, false, false, "C", "D", "E", "F", "G"],
        ["A", "B", false, false, false, false, "C", "D", "E", "F", "G"],
        ["A", "B", false, false, false, false, "C", "D", "E", "F", "G"],
        ["A", "B", false, false, false, false, "C", "D", "E", "F", "G"],
        ["A", "B", false, false, false, false, "C", "D", "E", "F", "G"],
        ["A", false, false, "B", "C", false, false, "D", "E", "F", "G"],
        ["A", false, false, "B", "C", false, false, "D", "E", "F", "G"],
        ["A", false, false, "B", "C", false, false, "D", "E", "F", "G"],
      ]);
    });
  });
});
