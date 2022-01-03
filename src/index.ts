import { scale } from "proportional-scale";
import { randomNumber, toNode, wait } from "./utils";
import * as render from "./render";
import { LIMIT } from "./abacus";

const DOM = {
  root: document.getElementById("root"),
  stage: document.getElementById("stage"),
  log: document.getElementById("log"),
  structure: document.getElementById("structure"),
};

const TIMINGS = {
  column: 100,
  transition: 500,
  pause: 2500,
};

const resize = () => {
  DOM.stage.style.position = "fixed";
  DOM.stage.style.top = "50%";
  DOM.stage.style.left = "50%";
  DOM.stage.style.marginLeft = `-${DOM.stage.offsetWidth / 2}px`;
  DOM.stage.style.marginTop = `-${DOM.stage.offsetHeight / 2}px`;

  const resized = scale({
    width: DOM.stage.offsetWidth,
    height: DOM.stage.offsetHeight,
    maxWidth: window.innerWidth,
    maxHeight: window.innerHeight,
  });

  DOM.stage.style.transform = `scale(${resized.scale})`;

  structure();
};

const animate = async (from: number, to: number) => {
  DOM.stage.innerHTML = "";

  const $current = toNode(
    `<div class='Stage__current'>${render.abacus(from)}</div>`
  );
  const $next = toNode(`<div class='Stage__next'>${render.abacus(to)}</div>`);

  DOM.stage.appendChild($current);
  DOM.stage.appendChild($next);

  const columns = $current.querySelectorAll(".Grid__column");

  for await (const [i, $nextColumn] of $next
    .querySelectorAll(".Grid__column")
    .entries()) {
    // Stagger each column
    await wait(TIMINGS.column);

    const $currentColumn = columns[i];

    $nextColumn.querySelectorAll(".Grid__cell").forEach(($cell) => {
      const $to = $cell as HTMLElement;

      // Skip blanks
      if ($to.dataset.cell === "false") return;

      const $from = $currentColumn.querySelector(
        `.Grid__cell[data-cell='${$to.dataset.cell}']`
      ) as HTMLElement;

      const y = $to.offsetTop - $from.offsetTop;

      // Skip if already at the right position
      if (y === 0) return;

      $from.style.transform = `translateY(${y}px)`;
    });
  }

  // Wait for the animation to finish
  await wait(TIMINGS.transition);

  // Render the log & pause
  DOM.log.innerHTML = render.log(STATE.values);
  await wait(TIMINGS.pause);

  DOM.stage.innerHTML = `<div class='Current'>${render.abacus(to)}</div>`;
};

// Render structure in relation to existing cell grid
const structure = () => {
  const $cell = document.querySelector(".Grid__cell:nth-child(4)");
  const { width, bottom } = $cell.getBoundingClientRect();

  const size = Math.floor(width / 30) ?? 1;
  const xs = Array.from(document.querySelectorAll(".Grid__column")).map(
    ($column) => {
      return $column.getBoundingClientRect().left + width / 2 - size / 2;
    }
  );
  const y = bottom - size / 2;

  DOM.structure.innerHTML = render.structure({ size, xs, y });
};

const STATE = {
  values: [0],
};

const step = async () => {
  const next = randomNumber(1, LIMIT);
  const current = STATE.values[STATE.values.length - 1];

  STATE.values = [...STATE.values, next];

  await animate(current, next);
  await step();
};

step();
resize();

// Render initial log
DOM.log.innerHTML = render.log(STATE.values);

window.addEventListener("resize", resize);

// Parcel
const hot = (module as any)?.hot;
if (hot) {
  hot.dispose(() => {
    window.location.reload();
    throw "hotReload";
  });
}
