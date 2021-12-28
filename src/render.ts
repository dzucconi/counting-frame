import { encode } from "./abacus";
import { NEGATIVE_STYLES, POSITIVE_STYLES } from "./utils";

export const abacus = (n: number): string => {
  const state = encode(n);

  const columns = state
    .map((column) => {
      const cells = column
        .map((cell) => {
          return `<div class="Cell" data-cell="${cell}" style="${
            cell ? POSITIVE_STYLES : NEGATIVE_STYLES
          }"></div>`;
        })
        .join("");

      return `<div class="Column">${cells}</div>`;
    })
    .join("");

  return `<div class="Grid">${columns}</div>`;
};
