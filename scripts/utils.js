// utils.js
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function randOdd(min, max) {
  const lo = Math.ceil(min);
  const hi = Math.floor(max);
  if (hi < lo) return lo | 1; // best effort
  let r = Math.floor(Math.random() * (hi - lo + 1)) + lo;
  if (r % 2 === 0) r += (r + 1 <= hi ? 1 : -1);
  return r;
}