import { scale } from "proportional-scale";
import { randomNumber, toNode, wait } from "./utils";
import * as render from "./render";

const root = document.getElementById("root");

const resize = () => {
  root.style.position = "fixed";
  root.style.top = "50%";
  root.style.left = "50%";
  root.style.marginLeft = `-${root.offsetWidth / 2}px`;
  root.style.marginTop = `-${root.offsetHeight / 2}px`;

  const resized = scale({
    width: root.offsetWidth,
    height: root.offsetHeight,
    maxWidth: window.innerWidth,
    maxHeight: window.innerHeight,
  });

  root.style.transform = `scale(${resized.scale})`;
};

const animate = async (from: number, to: number) => {
  root.innerHTML = "";

  const $current = toNode(`<div class='Current'>${render.abacus(from)}</div>`);
  const $next = toNode(`<div class='Next'>${render.abacus(to)}</div>`);

  root.appendChild($current);
  root.appendChild($next);

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

  // Wait for the animation to finish + pause
  await wait(500 + 1000);

  root.innerHTML = `<div class='Current'>${render.abacus(to)}</div>`;
};

const STATE = {
  current: randomNumber(1, 999999999),
};

const step = async () => {
  const next = randomNumber(1, 999999999);
  await animate(STATE.current, next);
  STATE.current = next;
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
