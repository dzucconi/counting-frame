import { numberToState, State } from "./abacus";

const size = 100;
const color = "gray";
const backgroundColor = "transparent";

const toStyle = (style: Record<string, string>) => {
  return Object.entries(style)
    .map(([key, value]) => [key, value].join(":"))
    .join(";");
};

const positive = toStyle({
  width: `${size}px`,
  height: `${size}px`,
  "background-image": `radial-gradient(${size}px at 50% 50%, white 0%, ${color} 10%, ${backgroundColor} 50%)`,
});

const negative = toStyle({
  width: `${size}px`,
  height: `${size}px`,
});

const root = document.getElementById("root");

const render = (state: State): string => {
  const columns = state
    .map((column) => {
      const cells = column
        .map((cell) => {
          return `<div class="Cell" style="${
            cell ? positive : negative
          }"></div>`;
        })
        .join("");

      return `<div class="Column">${cells}</div>`;
    })
    .join("");

  return `<div class="Grid">${columns}</div>`;
};

setTimeout(() => {
  console.log(Math.random() * 1000000);
}, 1000);
root.innerHTML = render(numberToState(58));
