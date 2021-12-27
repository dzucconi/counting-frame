const SIZE = 100;
const COLOR = "gray";
const BACKGROUND_COLOR = "transparent";

const toStyle = (style: Record<string, string>) => {
  return Object.entries(style)
    .map(([key, value]) => [key, value].join(":"))
    .join(";");
};

export const POSITIVE_STYLES = toStyle({
  width: `${SIZE}px`,
  height: `${SIZE}px`,
  "background-image": `radial-gradient(${SIZE}px at 50% 50%, white 0%, ${COLOR} 10%, ${BACKGROUND_COLOR} 50%)`,
});

export const NEGATIVE_STYLES = toStyle({
  width: `${SIZE}px`,
  height: `${SIZE}px`,
});

export const randomNumber = (min: number, max: number) => {
  const number = Math.random() * (max - min) + min;
  return Math.round(number);
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
