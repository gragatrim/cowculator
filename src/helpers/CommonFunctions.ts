export const getActionSeconds = (
  baseTimeCost: number,
  toolBonus: number | "",
) => {
  return Math.max(
    3,
    baseTimeCost / 1000000000 / (1 + (toolBonus || 0) / 100),
  );
};
