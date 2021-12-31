import { scale } from "proportional-scale";
import { randomNumber, toNode, wait } from "./utils";
import * as render from "./render";

const DOM = {
  root: document.getElementById("root"),
  stage: document.getElementById("stage"),
  log: document.getElementById("log"),
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
};

const animate = async (from: number, to: number) => {
  DOM.stage.innerHTML = "";

  const $current = toNode(`<div class='Current'>${render.abacus(from)}</div>`);
  const $next = toNode(`<div class='Next'>${render.abacus(to)}</div>`);

  DOM.stage.appendChild($current);
  DOM.stage.appendChild($next);
  DOM.log.innerHTML = render.log(STATE.values);

  const columns = $current.querySelectorAll(".Column");

  for await (const [i, $nextColumn] of $next
    .querySelectorAll(".Column")
    .entries()) {
    // Stagger each column
    await wait(100);

    const $currentColumn = columns[i];

    $nextColumn.querySelectorAll(".Cell").forEach(($cell) => {
      const $to = $cell as HTMLElement;

      // Skip blanks
      if ($to.dataset.cell === "false") return;

      const $from = $currentColumn.querySelector(
        `.Cell[data-cell='${$to.dataset.cell}']`
      ) as HTMLElement;

      const y = $to.offsetTop - $from.offsetTop;

      // Skip if already at the right position
      if (y === 0) return;

      $from.style.transform = `translateY(${y}px)`;
    });
  }

  DOM.log.innerHTML = render.log(STATE.values);

  // Wait for the animation to finish + pause
  await wait(500 + 1000);

  DOM.stage.innerHTML = `<div class='Current'>${render.abacus(to)}</div>`;
};

const STATE = {
  values: [0],
};

const step = async () => {
  const next = randomNumber(1, 999999999);
  const current = STATE.values[STATE.values.length - 1];

  STATE.values = [...STATE.values, next];

  await animate(current, next);
  await step();
};

step();
resize();

window.addEventListener("resize", resize);

// Parcel
const hot = (module as any)?.hot;
if (hot) {
  hot.dispose(() => {
    window.location.reload();
    throw "hotReload";
  });
}
