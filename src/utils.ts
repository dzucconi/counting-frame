export const randomNumber = (min: number, max: number) => {
  const number = Math.random() * (max - min) + min;
  return Math.round(number);
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const toNode = (html: string) =>
  new DOMParser().parseFromString(html, "text/html").body
    .firstChild as HTMLElement;
