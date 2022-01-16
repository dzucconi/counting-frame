import { RANGE } from "./abacus";

export const __randomNumber__ = (min: number, max: number) => {
  const number = Math.random() * (max - min) + min;
  return Math.round(number);
};

export const randomNumber = () => {
  const max = sample(RANGE.slice(0, -1)) - 1;
  return __randomNumber__(1, max);
};

export const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const toNode = (html: string) => {
  return new DOMParser().parseFromString(html, "text/html").body
    .firstChild as HTMLElement;
};

export const times = (n: number, fn: (i: number) => void) => {
  const xs = [];
  for (let i = 0; i < n; i++) {
    xs.push(fn(i));
  }
  return xs;
};

export const sample = <T>(xs: T[]) => {
  return xs[Math.floor(Math.random() * xs.length)];
};
