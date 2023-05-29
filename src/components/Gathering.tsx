import {
  Flex,
  MultiSelect,
  NumberInput,
  Space,
  Table,
  Text,
} from "@mantine/core";
import { ApiData } from "../services/ApiService";
import { ActionType, DropTable } from "../models/Client";
import { useMemo, useState } from "react";
import Icon from "./Icon";
import { getFriendlyIntString } from "../helpers/Formatting";

interface Props {
  type: ActionType;
  data: ApiData;
}

export default function Gathering({ type, data }: Props) {
  const [level, setLevel] = useState<number>(1);
  const [toolBonus, setToolBonus] = useState<number | "">(0);
  const [teas, setTeas] = useState([""]);
  const [priceOverrides, setPriceOverrides] = useState<{
    [key: string]: number | "";
  }>({});

  const skillName = type.split("/").pop() ?? "milking";

  const wisdomTeaBonus = teas.some((x) => x === "/items/wisdom_tea") ? 1.12 : 1;
  const efficiencyTeaBonus = teas.some((x) => x === "/items/efficiency_tea")
    ? 0.1
    : 0;
  const gatheringTeaBonus = teas.some((x) => x === "/items/gathering_tea")
    ? 1.15
    : 1;

  const teaLevelBonus = teas.some((x) => x === `/items/super_${skillName}_tea`)
    ? 6
    : teas.some((x) => x === `/items/${skillName}_tea`)
    ? 3
    : 0;

  const effectiveLevel = level + teaLevelBonus;

  const getTeaError = () => {
    if (teas.length === 0) return null;

    if (teas.filter((x) => x.includes(`${skillName}_tea`)).length > 1) {
      return `Cannot use both ${skillName} teas.`;
    }
  };

  const availableTeas = Object.values(data.itemDetails)
    .filter((x) => x.consumableDetail.usableInActionTypeMap?.[type])
    .map((x) => ({
      label: x.name,
      value: x.hrid,
    }));

  const actions = Object.values(data.actionDetails)
    .filter((x) => x.type === type)
    .sort((a, b) => {
      if (a.sortIndex > b.sortIndex) return -1;
      if (a.sortIndex < b.sortIndex) return 1;
      return 0;
    });

  const getItemsPerAction = (items: DropTable[] | null) => {
    return (
      items?.map((y) => {
        const averageDrop = (y.minCount + y.maxCount) / 2;

        return {
          itemHrid: y.itemHrid,
          avgCount: y.dropRate * averageDrop * gatheringTeaBonus,
        };
      }) ?? []
    );
  };

  const getRareItemsPerAction = (items: DropTable[] | null) => {
    return (
      items?.map((y) => {
        const averageDrop = (y.minCount + y.maxCount) / 2;

        return {
          itemHrid: y.itemHrid,
          avgCount: y.dropRate * averageDrop,
        };
      }) ?? []
    );
  };

  const getApproxValue = (hrid: string): number => {
    if (hrid === "/items/coin") return 1;

    if (priceOverrides[hrid]) return +priceOverrides[hrid];

    const item = data.itemDetails[hrid];

    if (item.ask === -1 && item.bid === -1) {
      return item.sellPrice;
    } else if (item.ask === -1) {
      return item.bid;
    } else if (item.bid === -1) {
      return item.ask;
    } else {
      return +((item.ask + item.bid) / 2).toFixed(0);
    }
  };

  const getAveragePrice = (items: DropTable[] | null): number => {
    let price = 0;

    if (!items) return price;

    price = items
      .map((y) => {
        const averageCost = getApproxValue(y.itemHrid);
        const averageDrop = (y.minCount + y.maxCount) / 2;

        return y.dropRate * averageDrop * gatheringTeaBonus * averageCost;
      })
      .reduce((acc, val) => acc + val);

    return price;
  };

  const relevantItems = useMemo(
    () => [
      ...new Set(
        actions
          .flatMap((x) => {
            return x.dropTable ?? [];
          })
          .map((x) => data.itemDetails[x.itemHrid])
      ),
    ],
    [actions, data.itemDetails]
  );

  const marketRows = relevantItems.map((x) => {
    return (
      <tr key={type + "/override/" + x.hrid}>
        <td>
          <Flex
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
            gap="xs"
          >
            <Icon hrid={x.hrid} /> {x.name}
          </Flex>
        </td>
        <td>{x.ask}</td>
        <td>{x.bid}</td>
        <td>{x.sellPrice}</td>
        <td>
          <NumberInput
            hideControls
            value={priceOverrides[x.hrid]}
            placeholder={`${getApproxValue(x.hrid)}`}
            onChange={(y) =>
              setPriceOverrides({
                ...priceOverrides,
                [x.hrid]: y,
              })
            }
          />
        </td>
      </tr>
    );
  });

  const rows = actions.map((x) => {
    const seconds = Math.max(
      3,
      x.baseTimeCost / 1000000000 / (1 + (toolBonus || 0) / 100)
    );
    const exp = x.experienceGain.value * wisdomTeaBonus;
    const levelReq = x.levelRequirement.level;
    const efficiency =
      Math.max(1, (100 + (effectiveLevel || 1) - levelReq) / 100) +
      efficiencyTeaBonus;

    const lootPerAction = getItemsPerAction(x.dropTable).concat(
      getRareItemsPerAction(x.rareDropTable)
    );

    const itemResults = lootPerAction.map((y) => (
      <Flex
        key={`${type}/itemResult/${y.itemHrid}`}
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
        gap="xs"
      >
        <Icon hrid={y.itemHrid} />
        {getFriendlyIntString((y.avgCount / seconds) * 3600 * efficiency, 2)}
      </Flex>
    ));

    const expPerHour = ((exp / seconds) * 3600 * efficiency).toLocaleString(
      undefined,
      {
        maximumFractionDigits: 0,
      }
    );

    const profit = getAveragePrice(x.dropTable) * 0.98;

    const profitPerHour = (
      (profit / seconds) *
      3600 *
      efficiency
    ).toLocaleString(undefined, { maximumFractionDigits: 0 });

    return (
      <tr key={type + "/" + x.hrid}>
        <td>{levelReq}</td>
        <td>
          <Flex
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
            gap="xs"
          >
            <Icon hrid={x.hrid} /> {x.name}
          </Flex>
        </td>
        <td>{exp.toFixed(2)}</td>
        <td>{seconds.toFixed(2)}s</td>
        <td>{efficiency.toFixed(2)}</td>
        <td>{expPerHour}</td>
        <td>{itemResults}</td>
        <td>{getFriendlyIntString(profit)}</td>
        <td>{profitPerHour}</td>
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
        <NumberInput
          value={level}
          onChange={(val) => setLevel(val || 1)}
          label="Level"
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
        <MultiSelect
          data={availableTeas}
          value={teas}
          onChange={setTeas}
          label="Teas"
          maxSelectedValues={3}
          error={getTeaError()}
          clearable
        />
      </Flex>
      <Space h="md" />
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
                <th>Item</th>
                <th>Median Ask</th>
                <th>Median Bid</th>
                <th>Vendor</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>{marketRows}</tbody>
          </Table>
        </Flex>
        <Flex>
          <Table striped highlightOnHover withBorder withColumnBorders>
            <thead>
              <tr>
                <th>Level</th>
                <th>Action</th>
                <th>XP</th>
                <th>Time</th>
                <th>Efficiency</th>
                <th>XP/h</th>
                <th>Items/h</th>
                <th>Profit</th>
                <th>Profit/h</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Flex>
      </Flex>
    </>
  );
}
