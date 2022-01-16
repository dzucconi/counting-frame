import { encode } from "./abacus";
import { generate } from "./log";
import { params } from "./config";
import { times } from "./utils";

document.body.style.backgroundColor = params.backgroundColor;

export const abacus = (n: number): string => {
  const state = encode(n);

  const columns = state
    .map((column) => {
      const cells = column
        .map((cell) => {
          return `<div class="Grid__cell" data-cell="${cell}" style="${
            cell
              ? `
                background-image: radial-gradient(100px at 50% 50%, ${params.highlightColor} 0%, ${params.color} 10%, transparent 50%);
                width: 100px;
                height: 100px;
              `
              : `
                width: 100px;
                height: 100px;
              `
          }"></div>`;
        })
        .join("");

      return `<div class="Grid__column">${cells}</div>`;
    })
    .join("");

  return `
    <div class="Grid">${columns}</div>
  `;
};

export const log = (values: number[]): string => {
  const amount = 3;
  const entries = generate(values).slice(-amount);
  const padded =
    entries.length < amount
      ? [...times(amount - entries.length, () => entries[0]), ...entries]
      : entries;

  return `
    <div class="Log__entries">
      ${padded
        .map(({ x, y, z, symbol }, i) => {
          return `
            <div class="Log__equation ${
              i === 0 ? "Log__equation--highlight" : ""
            }">
              <div class="Log__x">${x}</div>
              <div class="Log__symbol">${symbol}</div>
              <div class="Log__y">${y}</div>
              <div class="Log__equals">=</div>
              <div class="Log__z">${z}</div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
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
          background-color: ${params.latticeColor};
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
      background-color: ${params.latticeColor};
      position: fixed;
      top: ${y}px;
      left: 0;
      right: 0;
      height: ${size}px;
    })}'></div>`,
  ].join("");
};
