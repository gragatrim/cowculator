export function getFriendlyIntString(
  num: number | undefined,
  digits = 0
): string {
  if (!num) return "-1";
  return num.toLocaleString(undefined, {
    maximumFractionDigits: digits,
  });
}
