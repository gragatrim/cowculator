import { useMemo, useState } from "react";
import {
  Flex,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Tooltip,
  Text,
} from "@mantine/core";
import { ApiData } from "../services/ApiService";
import EnhancingCalc from "./EnhancingCalc";
import { ActionType } from "../models/Client";

interface Props {
  data: ApiData;
}

const skillName = "enhancing";

export default function Enhancing({ data }: Props) {
  const [item, setItem] = useState<string | null>(null);
  const [level, setLevel] = useState<number | "">(1);
  const [toolBonus, setToolBonus] = useState<number | "">(0);
  const [teas, setTeas] = useState<string[]>([]);
  const [target, setTarget] = useState<number>(1);

  const availableTeas = useMemo(
    () =>
      Object.values(data.itemDetails)
        .filter(
          (x) =>
            x.consumableDetail.usableInActionTypeMap?.[ActionType.Enhancing]
        )
        .map((x) => ({
          label: x.name,
          value: x.hrid,
        })),
    [data.itemDetails]
  );

  const teaLevelBonus = teas.some((x) => x === `/items/super_${skillName}_tea`)
    ? 6
    : teas.some((x) => x === `/items/${skillName}_tea`)
    ? 3
    : 0;

  const getTeaError = () => {
    if (teas.length === 0) return null;

    if (teas.filter((x) => x.includes(`${skillName}_tea`)).length > 1) {
      return `Cannot use both ${skillName} teas.`;
    }
  };

  const items = useMemo(
    () =>
      Object.values(data.itemDetails)
        .filter((x) => x.enhancementCosts)
        .sort((a, b) => {
          if (a.sortIndex < b.sortIndex) return -1;
          if (a.sortIndex > b.sortIndex) return 1;
          return 0;
        }),
    [data.itemDetails]
  );

  const itemOptions = useMemo(
    () =>
      items.map((x) => ({
        value: x.hrid,
        label: x.name,
      })),
    [items]
  );

  return (
    <Flex
      gap="sm"
      justify="flex-start"
      align="flex-start"
      direction="column"
      wrap="wrap"
    >
      <Group>
        <NumberInput
          value={level}
          onChange={setLevel}
          label="Enhancing Level"
          withAsterisk
          hideControls
          rightSection={
            teaLevelBonus && (
              <>
                <Text c="#EE9A1D">+{teaLevelBonus}</Text>
              </>
            )
          }
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
        <Tooltip
          label="Tea costs are not yet included in cost calculations."
          withArrow
        >
          <MultiSelect
            clearable
            data={availableTeas}
            value={teas}
            onChange={setTeas}
            label="Teas"
            maxSelectedValues={3}
            error={getTeaError()}
          />
        </Tooltip>
      </Group>
      <Group>
        <Select
          searchable
          size="lg"
          value={item}
          onChange={setItem}
          data={itemOptions}
          label="Select an item"
          placeholder="Pick one"
        />
        <NumberInput
          value={target}
          onChange={(value) => setTarget(value || 1)}
          label="Target Level"
          withAsterisk
          min={1}
          max={20}
        />
      </Group>
      {item && (
        <EnhancingCalc
          data={data}
          item={data.itemDetails[item]}
          baseLevel={level || 1}
          toolPercent={toolBonus || 0}
          target={target}
          teas={teas}
        />
      )}
    </Flex>
  );
}
