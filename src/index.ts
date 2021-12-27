import { encode, State } from "./abacus";
import { scale } from "proportional-scale";
import { NEGATIVE_STYLES, POSITIVE_STYLES, randomNumber, wait } from "./utils";

const root = document.getElementById("root");

const renderAbacus = (state: State): string => {
  const columns = state
    .map((column) => {
      const cells = column
        .map((cell) => {
          return `<div class="Cell" style="${
            cell ? POSITIVE_STYLES : NEGATIVE_STYLES
          }"></div>`;
        })
        .join("");

      return `<div class="Column">${cells}</div>`;
    })
    .join("");

  return `<div id="Grid" class="Grid">${columns}</div>`;
};

const render = (n: number) => {
  root.innerHTML = `
    ${n !== 0 ? `<div class="Number">${n}</div>` : ""}
    ${renderAbacus(encode(n))}
  `;
  resize();
};

const resize = () => {
  const grid = document.getElementById("Grid");

  grid.style.position = "fixed";
  grid.style.top = "50%";
  grid.style.left = "50%";
  grid.style.marginLeft = `-${grid.offsetWidth / 2}px`;
  grid.style.marginTop = `-${grid.offsetHeight / 2}px`;

  const resized = scale({
    width: grid.offsetWidth,
    height: grid.offsetHeight,
    maxWidth: window.innerWidth,
    maxHeight: window.innerHeight,
  });

  grid.style.transform = `scale(${resized.scale})`;
};

const step = async () => {
  const first = randomNumber(0, 99999999);
  const second = randomNumber(0, 99999999);
  const total = first + second;

  render(0);
  await wait(3000);
  render(first);
  await wait(1000);
  render(second);
  await wait(3000);
  render(total);
  await wait(5000);

  step();
};

step();

resize();
window.addEventListener("resize", resize);
