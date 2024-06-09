import { useMemo } from "react";

interface Props {
  hrid: string;
}

const foragingActionExceptions = [
  "asteroid_belt",
  "olympus_mons",
  "silly_cow_valley",
  "burble_beach",
  "misty_forest",
  "shimmering_lake",
  "farmland",
];

export default function Icon({ hrid }: Props) {
  const imgUrl = useMemo(() => {
    const split = hrid.split("/");
    const name = split[split.length - 1];
    const type = split[1];
    if (type === "actions") {
      if (
        hrid.includes("/foraging/") &&
        !foragingActionExceptions.includes(name)
      ) {
        return `/cowculator/items_sprite.5d6879fa.svg#${name}`;
      }
      return `/cowculator/actions_sprite.aa2afca3.svg#${name}`;
    } else if (type === "items") {
      return `/cowculator/items_sprite.5d6879fa.svg#${name}`;
    } else {
      return `/cowculator/combat_monsters_sprite.a27599ae.svg#${name}`;
    }
  }, [hrid]);

  return (
    <svg width="30px" height="30px">
      <use href={imgUrl} />
    </svg>
  );
}
