import { encode } from "./abacus";
import { generate } from "./log";

const SIZE = 100;
const COLOR = "gray";
const BACKGROUND_COLOR = "transparent";

export const abacus = (n: number): string => {
  const state = encode(n);

  const columns = state
    .map((column) => {
      const cells = column
        .map((cell) => {
          return `<div class="Cell" data-cell="${cell}" style="${
            cell
              ? `
                background-image: radial-gradient(${SIZE}px at 50% 50%, white 0%, ${COLOR} 10%, ${BACKGROUND_COLOR} 50%);
                width: ${SIZE}px;
                height: ${SIZE}px;
              `
              : `
                width: ${SIZE}px;
                height: ${SIZE}px;
              `
          }"></div>`;
        })
        .join("");

      return `<div class="Column">${cells}</div>`;
    })
    .join("");

  return `
    <div class="Grid">${columns}</div>
  `;
};

export const log = (values: number[]): string => {
  return generate(values).slice(-15).reverse().join("<br>");
};

export const structure = ({
  size,
  xs,
  y,
}: {
  size: number;
  xs: number[];
  y: number;
}) => {
  return [
    // Vertical lines
    ...xs.map((x) => {
      return `
        <div style='
          background-color: gray;
          bottom: 0;
          left: ${x}px;
          position: fixed;
          top: 0;
          width: ${size}px;
          z-index: -1;
        '></div>
      `;
    }),

    // Horizontal line
    `<div style='
      background-color: gray;
      position: fixed;
      top: ${y}px;
      left: 0;
      right: 0;
      height: ${size}px;
    })}'></div>`,
  ].join("");
};
