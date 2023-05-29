export function getFriendlyIntString(num: number, digits = 0): string {
  return num.toLocaleString(undefined, {
    maximumFractionDigits: digits,
  });
}
