// utils.js
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function randOdd(max) {
  let r = Math.floor(Math.random() * (max / 2)) * 2 + 1;
  return Math.min(r, max - 2);
}
