import { Flex, NumberInput, Table } from "@mantine/core";
import { ApiData } from "../services/ApiService";
import { Cost } from "../models/Client";
import { useMemo, useState } from "react";
import Icon from "./Icon";

interface Props {
  actionCategory: string;
  data: ApiData;
  level: number | "";
  xp: number | "";
  targetLevel: number | "";
  toolBonus: number | "";
  fromRaw: boolean;
}

export default function Materials({
  actionCategory,
  data,
  level,
  xp,
  targetLevel,
  toolBonus,
  fromRaw = false,
}: Props) {
  const [priceOverrides, setPriceOverrides] = useState<{
    [key: string]: number | "";
  }>({});

  const actions = useMemo(
    () =>
      Object.values(data.actionDetails)
        .filter((x) => x.category === actionCategory)
        .sort((a, b) => {
          if (a.sortIndex > b.sortIndex) return -1;
          if (a.sortIndex < b.sortIndex) return 1;
          return 0;
        }),
    [actionCategory, data.actionDetails]
  );

  const relevantItems = useMemo(
    () => [
      ...new Set(
        actions
          .flatMap((x) => {
            const input = x.inputItems ?? [];
            const output = x.outputItems ?? [];
            return [input, output].flat();
          })
          .map((x) => data.itemDetails[x.itemHrid])
      ),
    ],
    [actions, data.itemDetails]
  );

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

  const getAveragePrice = (items: Cost[] | null): number => {
    let price = 0;

    if (!items) return price;

    price = items
      .map((y) => y.count * getApproxValue(y.itemHrid))
      .reduce((acc, val) => acc + val);

    return price;
  };

  const rows = actions.map((x) => {
    const seconds = x.baseTimeCost / 1000000000 / (1 + (toolBonus || 0) / 100);
    const exp = x.experienceGain.value;
    const levelReq = x.levelRequirement.level;
    const efficiency = Math.max(1, (100 + (level || 1) - levelReq) / 100);

    let actionsToTarget = 0;

    if (xp && targetLevel) {
      actionsToTarget = (data.levelExperienceTable[targetLevel + 1] - xp) / exp;
    }

    const expPerHour = ((exp / seconds) * 3600 * efficiency).toLocaleString(
      undefined,
      {
        maximumFractionDigits: 0,
      }
    );

    let inputs: Cost[] = x.inputItems?.slice() || [];
    let upgradeHrid = x.upgradeItemHrid;
    const actions = [x];

    while (fromRaw && upgradeHrid) {
      const newItem = upgradeHrid.split("/").pop();
      if (!newItem) break;
      const newActionHrid = x.hrid
        .split("/")
        .slice(0, -1)
        .concat([newItem])
        .join("/");
      const newAction = data.actionDetails[newActionHrid];
      if (newAction.inputItems) {
        inputs = inputs.concat(newAction.inputItems);
        actions.push(newAction);
      }

      upgradeHrid = newAction.upgradeItemHrid;
    }

    const inputCost = getAveragePrice(inputs);
    const outputCost = getAveragePrice(x.outputItems);

    const profit = outputCost - inputCost;
    const profitPerHour = (
      (profit / seconds) *
      3600 *
      efficiency
    ).toLocaleString(undefined, { maximumFractionDigits: 0 });

    const outputItem = x.outputItems?.[0];

    return (
      <tr key={x.hrid}>
        <td>{levelReq}</td>
        <td>
          <Flex
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
            gap="xs"
          >
            {outputItem && <Icon hrid={outputItem.itemHrid} />} {x.name}
          </Flex>
        </td>
        <td>{exp}</td>
        <td>{seconds.toFixed(2)}s</td>
        <td>{efficiency.toFixed(2)}</td>
        <td>{expPerHour}</td>
        <td>
          {actionsToTarget.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </td>
        <td>{inputCost}</td>
        <td>{outputCost}</td>
        <td>{profit}</td>
        <td>{profitPerHour}</td>
      </tr>
    );
  });

  const marketRows = relevantItems
    .filter((x) => x.hrid !== "/items/coin")
    .map((x, i) => {
      return (
        <tr key={"marketOverride" + actionCategory + x.hrid + i}>
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
                <th>Item</th>
                <th>XP</th>
                <th>Time</th>
                <th>Efficiency</th>
                <th>XP/h</th>
                <th>Actions to Target</th>
                <th>Input Cost</th>
                <th>Output Cost</th>
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
