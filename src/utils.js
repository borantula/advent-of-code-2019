export function parseLinesToArray(str) {
  return str.split("\n").filter(e => e);
}

// Greatest common devisor
export function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}

export function calcAngleDegrees(dx, dy) {
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}
