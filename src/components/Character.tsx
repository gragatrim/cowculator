import { useMemo, useState } from "react";
import { ApiData } from "../services/ApiService";
import { Flex, NumberInput, Select, Table } from "@mantine/core";
import { CategoryHrid } from "../models/Client";

export type CharacterType = {
  [key: string]: {
    level: number;
    toolHrid: string | null;
    toolLevel: number;
  };
};

interface Props {
  data: ApiData;
}

const excludedSkills = [
  "/skills/attack",
  "/skills/defense",
  "/skills/intelligence",
  "/skills/magic",
  "/skills/power",
  "/skills/ranged",
  "/skills/stamina",
  "/skills/total_level",
];

export default function Character({ data }: Props) {
  const [character, setCharacter] = useState<CharacterType>({});

  const relevantSkills = useMemo(
    () =>
      Object.values(data.skillDetails)
        .filter((x) => !excludedSkills.includes(x.hrid))
        .sort((a, b) => {
          if (a.sortIndex < b.sortIndex) return -1;
          if (a.sortIndex > b.sortIndex) return 1;
          return 0;
        }),
    [data.skillDetails]
  );

  const toolMap = useMemo(
    () =>
      new Map(
        relevantSkills.map((x) => {
          const tools = Object.values(data.itemDetails)
            .filter(
              (y) =>
                y.categoryHrid === CategoryHrid.ItemCategoriesEquipment &&
                y.equipmentDetail.levelRequirements?.some(
                  (z) => z.skillHrid === x.hrid
                )
            )
            .sort((a, b) => {
              if (a.sortIndex < b.sortIndex) return -1;
              if (a.sortIndex > b.sortIndex) return 1;
              return 0;
            });

          return [x.hrid, tools];
        })
      ),
    [data.itemDetails, relevantSkills]
  );

  const rows = relevantSkills.map((x) => {
    const tools = toolMap.get(x.hrid)?.map((x) => ({
      value: x.hrid,
      label: x.name,
    }));

    const { toolHrid, toolLevel } = character[x.hrid] ?? {};
    const tool = toolHrid ? data.itemDetails[toolHrid] : null;

    const bonusFieldName =
      x.hrid === "/skills/enhancing"
        ? `enhancingSuccess`
        : `${x.name.toLowerCase()}Speed`;

    const toolBonus = tool
      ? tool.equipmentDetail.noncombatStats[bonusFieldName] +
        tool.equipmentDetail.noncombatEnhancementBonuses[bonusFieldName] *
          data.enhancementLevelTotalBonusMultiplierTable[toolLevel ?? 0]
      : 0;

    return (
      <tr key={`character${x.hrid}`}>
        <td>{x.name}</td>
        <td>
          <NumberInput
            value={character[x.hrid]?.level || 1}
            onChange={(val) =>
              setCharacter({
                ...character,
                [x.hrid]: {
                  ...character[x.hrid],
                  level: val || 1,
                },
              })
            }
            withAsterisk
            hideControls
            min={1}
            max={200}
          />
        </td>
        <td>
          <Select
            clearable
            size="lg"
            value={character[x.hrid]?.toolHrid}
            onChange={(val) =>
              setCharacter({
                ...character,
                [x.hrid]: {
                  ...character[x.hrid],
                  toolHrid: val,
                },
              })
            }
            data={tools ?? []}
            placeholder="Empty"
          />
        </td>
        <td>
          <NumberInput
            value={character[x.hrid]?.toolLevel || 0}
            onChange={(val) =>
              setCharacter({
                ...character,
                [x.hrid]: {
                  ...character[x.hrid],
                  toolLevel: val || 0,
                },
              })
            }
            min={0}
            max={20}
          />
        </td>
        <td>
          {toolBonus.toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
          })}
        </td>
      </tr>
    );
  });

  return (
    <>
      <Flex
        gap="sm"
        justify="flex-start"
        align="flex-start"
        wrap="wrap"
        direction="row"
      >
        <Flex>
          <Table striped highlightOnHover withBorder withColumnBorders>
            <thead>
              <tr>
                <th>Skill</th>
                <th>Level</th>
                <th>Tool</th>
                <th>Tool Level</th>
                <th>Tool Bonus</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Flex>
      </Flex>
    </>
  );
}
