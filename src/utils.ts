export const randomNumber = (min: number, max: number) => {
  const number = Math.random() * (max - min) + min;
  return Math.round(number);
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
