export function delay(cb: () => unknown | void, ms: number = 500) {
  setTimeout(cb, ms);
}
