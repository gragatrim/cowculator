import { Flex, Grid, Loader, NumberInput, Table, Tooltip } from "@mantine/core";
import { ApiData } from "../services/ApiService";
import { Cost, ItemDetail } from "../models/Client";
import { MarketValue } from "../models/Market";
import { useState } from "react";
import { IconInfoCircle } from "@tabler/icons-react";
import { getFriendlyIntString } from "../helpers/Formatting";

interface Props {
  data: ApiData;
  item: ItemDetail & MarketValue;
  baseLevel: number;
  toolPercent: number;
  target: number;
  teas: string[];
}

const FAIL_XP = 0.1;
const TARGET_COL = [...Array(21).keys()];

export default function EnhancingCalc({
  data,
  item,
  baseLevel,
  toolPercent,
  target,
  teas,
}: Props) {
  const toolBonus = toolPercent * 0.01;
  const action = data.actionDetails["/actions/enhancing/enhance"];

  const [priceOverrides, setPriceOverrides] = useState<{
    [key: string]: number | "";
  }>({});

  const blessedTeaBonus = teas.some((x) => x === "/items/blessed_tea")
    ? 0.01
    : 0;
  const teaLevelBonus = teas.some((x) => x === "/items/super_enhancing_tea")
    ? 6
    : teas.some((x) => x === "/items/enhancing_tea")
    ? 3
    : 0;
  const wisdomTeaBonus = teas.some((x) => x === "/items/wisdom_tea") ? 0.12 : 0;

  const level = baseLevel + teaLevelBonus;

  if (!item.enhancementCosts) return <Loader />;

  const actionTimer =
    (action.baseTimeCost / 1000000000) *
    Math.min(1, 100 / (100 + level - item.itemLevel));

  const getAveragePrice = (items: Cost[] | null): number => {
    let price = 0;

    if (!items) return price;

    price = items
      .map((y) => {
        if (y.itemHrid === "/items/coin") return y.count;

        const item = data.itemDetails[y.itemHrid];

        const averageCost =
          priceOverrides[y.itemHrid] || +((item.ask + item.bid) / 2).toFixed(0);

        return y.count * averageCost;
      })
      .reduce((acc, val) => acc + val);

    return price;
  };

  function X(N: number) {
    return (
      data.enhancementLevelSuccessRateTable[N] *
      (Math.min((level / item.itemLevel + 1) / 2, 1) +
        toolBonus +
        0.0005 * Math.max(level - item.itemLevel, 0))
    );
  }

  function Z(N: number) {
    if (N <= 0) {
      return 1 - X(0);
    } else if (N == 1) {
      return (1 - X(N)) * X(N - 1);
    }
    const n = [...Array(N).keys()];
    return (1 - X(N)) * n.map((i) => X(i)).reduce((a, b) => a * b);
  }

  function S(N: number) {
    if (N <= 0) {
      return 1 - X(0);
    } else if (N == 1) {
      return X(N - 1);
    }
    const n = [...Array(N).keys()];
    return n.map((i) => X(i)).reduce((a, b) => a * b);
  }

  function T(N: number) {
    return N + 1;
  }
  const costPerEnhance = getAveragePrice(item.enhancementCosts);
  const protectionItems: Cost[] = [{ count: 1, itemHrid: item.hrid }];
  const protectionCost = getAveragePrice(protectionItems);

  const pCol = TARGET_COL.map((x) => (x === 0 ? 0 : X(x - 1)));
  const sCol = TARGET_COL.map((x) => S(x));
  const zCol = TARGET_COL.map((x) => Z(x));
  const tCol = TARGET_COL.map((x) => T(x));
  const costCol = TARGET_COL.reduce((acc: number[], _x, i) => {
    if (i === 0) return [0];
    const previous =
      acc.reduce(
        (sum, _value, j) => sum + zCol[TARGET_COL[j]] * tCol[TARGET_COL[j]],
        0
      ) +
      sCol[i] * tCol[i - 1];

    const cost = (previous / sCol[i]) * costPerEnhance;
    acc.push(cost);
    return acc;
  }, []);

  const inflectionCol: number[] = TARGET_COL.reduce((acc: number[], x) => {
    if (x <= 1) {
      acc.push(costCol[x]);
    } else {
      const back = acc[acc.length - 1];
      const back2 = acc[acc.length - 2];
      const newValue = Math.min(
        costCol[x],
        (back +
          (protectionCost * (1 - pCol[x]) + costPerEnhance) -
          (1 - pCol[x]) * back2) /
          pCol[x]
      );
      acc.push(newValue);
    }
    return acc;
  }, []);

  const protLevel = costCol.findLastIndex((x, i) => x <= inflectionCol[i]);
  const actionsCol = TARGET_COL.reduce((acc: number[], x) => {
    if (x <= protLevel) {
      acc.push(costCol[x] / costPerEnhance);
    } else {
      const back = acc[acc.length - 1];
      const back2 = acc[acc.length - 2];
      acc.push((back + 1 - (1 - pCol[x]) * back2) / pCol[x]);
    }
    return acc;
  }, []);

  const protUsedCol = TARGET_COL.map(
    (x) => (inflectionCol[x] - actionsCol[x] * costPerEnhance) / protectionCost
  );

  const criticalCol = TARGET_COL.reduce((acc: number[], x) => {
    if (x <= 1 || blessedTeaBonus === 0) {
      acc.push(1);
    } else {
      const back = acc[acc.length - 1];
      const teaInvert = 1 - blessedTeaBonus;
      acc.push(
        (Math.pow(teaInvert, 2) +
          blessedTeaBonus * teaInvert * (1 - pCol[x]) +
          blessedTeaBonus / pCol[x - 1]) *
          back
      );
    }
    return acc;
  }, []);

  const expectedCostCol = TARGET_COL.map(
    (x) => inflectionCol[x] / criticalCol[x]
  );

  const cost = expectedCostCol[target];

  const sample = [
    ...Array(data.enhancementLevelSuccessRateTable.length).keys(),
  ];

  const getAverageEnhanceXp = () => {
    return (
      (sample
        .map((i) => S(i) * i + Z(i) * (i + 1) * FAIL_XP)
        .reduce((a, b) => a + b) /
        sample.map((i) => Z(i) * T(i)).reduce((a, b) => a + b)) *
      1.5 *
      (item.itemLevel + 10) *
      (1 + wisdomTeaBonus)
    );
  };

  const averageEnhanceXp = getAverageEnhanceXp();

  const marketRows = item.enhancementCosts.concat(protectionItems).map((x) => {
    if (x.itemHrid === "/items/coin") {
      return (
        <tr key={"override/enhancing/" + x.itemHrid}>
          <td>Coin</td>
          <td>{x.count}</td>
          <td colSpan={3} />
        </tr>
      );
    }

    const marketItem = data.itemDetails[x.itemHrid];
    return (
      <tr key={"override/enhancing/" + x.itemHrid}>
        <td>{marketItem.name}</td>
        <td>{x.count}</td>
        <td>{marketItem.ask}</td>
        <td>{marketItem.bid}</td>
        <td>
          <NumberInput
            hideControls
            value={priceOverrides[x.itemHrid]}
            onChange={(y) =>
              setPriceOverrides({
                ...priceOverrides,
                [x.itemHrid]: y,
              })
            }
          />
        </td>
      </tr>
    );
  });

  return (
    <Flex
      gap="sm"
      justify="flex-start"
      align="flex-start"
      direction="column"
      wrap="wrap"
    >
      <Grid>
        <Grid.Col span="auto">
          <Table striped highlightOnHover withBorder withColumnBorders>
            <thead>
              <tr>
                <th>Item</th>
                <th>Count</th>
                <th>Median Ask</th>
                <th>Median Bid</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>{marketRows}</tbody>
          </Table>
        </Grid.Col>
        <Grid.Col span="auto">
          <div>time: {actionTimer.toFixed(2)}</div>
          <div>avg xp: {averageEnhanceXp.toFixed(2)}</div>
          <div>cost per: {costPerEnhance.toFixed(0)}</div>
          <div>coin / xp: {(costPerEnhance / averageEnhanceXp).toFixed(2)}</div>
          <div>
            xp / hr:{" "}
            {getFriendlyIntString((averageEnhanceXp * 3600) / actionTimer)}
          </div>
          <div>protection cost: {protectionCost.toFixed(0)}</div>
          <div>cost: {getFriendlyIntString(cost)}</div>
          <div>prot level: {protLevel}</div>
          <div>prots Used: {protUsedCol[target].toFixed(2)}</div>
          <div>actions: {actionsCol[target].toFixed(2)}</div>
          <div>
            hours: {((actionsCol[target] * actionTimer) / 3600).toFixed(2)}
          </div>
        </Grid.Col>
      </Grid>
      <Table>
        <thead>
          <tr>
            <th>Target</th>
            <th>Mod Probability</th>
            <th>S(N)</th>
            <th>Z(N)</th>
            <th>T(N)</th>
            <th>Cost Target</th>
            <th>Inflection</th>
            <th>Actions</th>
            <th>Protections</th>
            <th>Critical</th>
            <th>
              <Tooltip label="Factors in blessed tea if applicable" withArrow>
                <Flex gap="xs" justify="center">
                  Expected Cost
                  <IconInfoCircle />
                </Flex>
              </Tooltip>
            </th>
          </tr>
        </thead>
        <tbody>
          {TARGET_COL.map((x) => {
            return (
              <tr key={"enhancing/results/" + x}>
                <td>{x}</td>
                <td>{pCol[x].toFixed(2)}</td>
                <td>{sCol[x].toFixed(2)}</td>
                <td>{zCol[x].toFixed(2)}</td>
                <td>{tCol[x].toFixed(2)}</td>
                <td>{getFriendlyIntString(costCol[x])}</td>
                <td>{getFriendlyIntString(inflectionCol[x])}</td>
                <td>{actionsCol[x].toFixed(2)}</td>
                <td>{protUsedCol[x].toFixed(2)}</td>
                <td>{criticalCol[x].toFixed(4)}</td>
                <td>{getFriendlyIntString(expectedCostCol[x])}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Flex>
  );
}
