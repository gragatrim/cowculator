import { Flex, Group, NativeSelect, NumberInput, Switch } from "@mantine/core";
import Materials from "./Materials";
import { ApiData } from "../services/ApiService";
import { useMemo, useState } from "react";

interface Props {
  skill: "cheesesmithing" | "crafting" | "tailoring" | "cooking" | "brewing";
  data: ApiData;
}

export default function ActionCategorySelector({ skill, data }: Props) {
  const [fromRaw, setFromRaw] = useState(false);
  const [level, setLevel] = useState<number | "">(1);
  const [xp, setXp] = useState<number | "">("");
  const [targetLevel, setTargetLevel] = useState<number | "">("");
  const [toolBonus, setToolBonus] = useState<number | "">(0);

  const options = useMemo(
    () =>
      Object.values(data.actionCategoryDetails)
        .filter((x) => x.hrid.startsWith(`/action_categories/${skill}`))
        .sort((a, b) => {
          if (a.sortIndex < b.sortIndex) return -1;
          if (a.sortIndex > b.sortIndex) return 1;
          return 0;
        })
        .map((x) => ({
          value: x.hrid,
          label: x.name,
        })),
    [skill, data.actionCategoryDetails]
  );

  const [category, setCategory] = useState(options[0].value);

  return (
    <Flex
      gap="sm"
      justify="flex-start"
      align="flex-start"
      direction="column"
      wrap="wrap"
    >
      <Group>
        <NativeSelect
          label="Category"
          withAsterisk
          data={options}
          value={category}
          onChange={(event) => setCategory(event.currentTarget.value)}
        />
        <Switch
          onLabel="CRAFT UPGRADE ITEM"
          offLabel="BUY UPGRADE ITEM"
          size="xl"
          checked={fromRaw}
          onChange={(event) => setFromRaw(event.currentTarget.checked)}
        />
        <NumberInput
          value={level}
          onChange={setLevel}
          label="Level"
          withAsterisk
          hideControls
        />
        <NumberInput
          value={toolBonus}
          onChange={setToolBonus}
          label="Tool Bonus"
          withAsterisk
          hideControls
          precision={2}
          formatter={(value) => `${value}%`}
        />
        <NumberInput
          value={xp}
          onChange={setXp}
          label="Experience"
          withAsterisk
          hideControls
        />
        <NumberInput
          value={targetLevel}
          onChange={setTargetLevel}
          label="Target Level"
          withAsterisk
          hideControls
        />
      </Group>
      {category && (
        <Materials
          actionCategory={category}
          data={data}
          level={level}
          xp={xp}
          targetLevel={targetLevel}
          toolBonus={toolBonus}
          fromRaw={fromRaw}
        />
      )}
    </Flex>
  );
}
