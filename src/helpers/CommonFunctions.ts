export const getActionSeconds = (
  baseTimeCost: number,
  toolBonus: number | "",
) => {
  return Math.max(
    3,
    baseTimeCost / 1000000000 / (1 + (toolBonus || 0) / 100),
  );
};

export const getTeaBonuses = (
  teas: string[],
  skill: Skill,
) => {
  const artisanTeaBonus = teas.some((x) => x === "/items/artisan_tea")
    ? 0.9
    : 1;
  const wisdomTeaBonus = teas.some((x) => x === "/items/wisdom_tea") ? 1.12 : 1;
  const gourmetTeaBonus = teas.some((x) => x === "/items/gourmet_tea")
    ? 1.12
    : 1;
  const blessedTeaBonus = teas.some((x) => x === "/items/blessed_tea")
    ? 0.01
    : 0;
  const gatheringTeaBonus = teas.some((x) => x === "/items/gathering_tea")
    ? 1.15
    : 1;
  const efficiencyTeaBonus = teas.some((x) => x === "/items/efficiency_tea")
    ? 0.1
    : 0;

  const levelTeaBonus = teas.some((x) => x === `/items/super_${skill}_tea`)
    ? 6
    : teas.some((x) => x === `/items/${skill}_tea`)
    ? 3
    : 0;

  const teaError = teas.filter((x) => x.includes(`${skill}_tea`)).length > 1
    ? `Cannot use both ${skill} teas.`
    : null;

  return {
    teaError,
    wisdomTeaBonus,
    artisanTeaBonus,
    gourmetTeaBonus,
    blessedTeaBonus,
    levelTeaBonus,
    gatheringTeaBonus,
    efficiencyTeaBonus,
  };
};

export enum Skill {
  Brewing = "brewing",
  Cheesesmithing = "cheesesmithing",
  Cooking = "cooking",
  Crafting = "crafting",
  Enhancing = "enhancing",
  Foraging = "foraging",
  Milking = "milking",
  Tailoring = "tailoring",
  Woodcutting = "woodcutting",
}
