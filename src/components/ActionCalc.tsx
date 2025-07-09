import {
  Flex,
  Table,
  NumberInput,
  MultiSelect,
  Tooltip,
  Grid,
} from "@mantine/core";
import { ActionDetailMap, Cost } from "../models/Client";
import { Fragment, useEffect, useState } from "react";
import { ApiData } from "../services/ApiService";
import { getFriendlyIntString } from "../helpers/Formatting";
import Icon from "./Icon";

interface Props {
  action: ActionDetailMap;
  fromRaw: boolean;
  data: ApiData;
}

export default function ActionCalc({ action, fromRaw = false, data }: Props) {
  const GUZZ_LEVEL_MULTIPLIERS: number[] = [
  0.1,          // index 0 unused so level == index
  0.1020,    // +1  (2.0 %)
  0.1042,    // +2  (4.2 %)
  0.1066,    // +3  (6.6 %)
  0.1092,    // +4  (9.2 %)
  0.1120,    // +5  (12.0 %)
  0.1150,    // +6  (15.0 %)
  0.1182,    // +7  (18.2 %)
  0.1216,    // +8  (21.6 %)
  0.1252,    // +9  (25.2 %)
  0.1290,    // +10 (29.0 %)
  0.1330,    // +11 (33.0 %)
  0.1372,    // +12 (37.2 %)
  0.1416,    // +13 (41.6 %)
  0.1462,    // +14 (46.2 %)
  0.1510,    // +15 (51.0 %)
  0.1560,    // +16 (56.0 %)
  0.1612,    // +17 (61.2 %)
  0.1666,    // +18 (66.6 %)
  0.1722,    // +19 (72.2 %)
  0.1780     // +20 (78.0 %)
];
  const [priceOverrides, setPriceOverrides] = useState<{
    [key: string]: number | "";
  }>({});
  const [guzzLevel, setGuzzLevel] = useState<number | "">("");   // "" = empty field
  const [teas, setTeas] = useState<string[]>([]);
  const availableTeas = Object.values(data.itemDetails)
    .filter((x) => x.consumableDetail.usableInActionTypeMap?.[action.type])
    .map((x) => ({
      label: x.name,
      value: x.hrid,
    }));

  useEffect(() => {
    setTeas([]);
  }, [action]);

  if (!action.outputItems) return <Fragment />;

  const hasArtisan = teas.some((x) => x === "/items/artisan_tea");
  const wisdomTeaBonus = teas.some((x) => x === "/items/wisdom_tea") ? 1.12 : 1;
  const gourmetBonus = teas.some((x) => x === "/items/gourmet_tea") ? 1.12 : 1;

  var outputItem = {
    ...data.itemDetails[action.outputItems[0].itemHrid],
    count: action.outputItems[0].count,
  };

  if (!action.inputItems) {
    return <Fragment />;
  }

  let inputs: Cost[] = action.inputItems.slice();
  let action_type = action.hrid.substring(0, action.hrid.lastIndexOf('/')) + "/";
  let upgradeHrid: string = action.upgradeItemHrid ?? "";
  const upgradeHrids: Array<[string, number]> = [];
  for (const input of inputs) {
    var key = `${action_type.endsWith("/") ? action_type.slice(0, -1) : action_type}/${input.itemHrid.substring(input.itemHrid.lastIndexOf('/') + 1)}`;
    const exists = Object.prototype.hasOwnProperty.call(data.actionDetails, key);
    if (exists) {
      upgradeHrids.push([input.itemHrid, input.count]);
    }
  };
  const actions = [action];

  while (fromRaw && upgradeHrid) {
    const newItem = upgradeHrid.split("/").pop();
    if (!newItem) break;
    const newActionHrid = action.hrid
      .split("/")
      .slice(0, -1)
      .concat([newItem])
      .join("/");
    const newAction = data.actionDetails[newActionHrid];
    if (newAction === undefined) {
      break;
    }
    if (newAction.inputItems) {
      inputs = inputs.concat(newAction.inputItems);
      actions.push(newAction);
    }

    upgradeHrid = newAction.upgradeItemHrid ?? "";
  }

  /** running total of how many of each input we need */
  const input_counts: Record<string, number> = {};
  /** tracks which actions we have already expanded */
  const expanded_items: Record<string, boolean> = {};
  for (const upgrade_item of upgradeHrids) {
    let upgrade_hrid: string = upgrade_item[0];
    if (fromRaw) {
      expanded_items[upgrade_hrid] = true;
    }
    while (fromRaw && upgrade_hrid) {
      const newItem = upgrade_hrid.split("/").pop();
      if (!newItem) break;
      const newActionHrid = action.hrid
        .split("/")
        .slice(0, -1)
        .concat([newItem])
        .join("/");
      const newAction = data.actionDetails[newActionHrid];
      if (newAction.inputItems) {
        for (var item of newAction.inputItems) {
          if (input_counts[item.itemHrid]) {
            input_counts[item.itemHrid] += item.count * upgrade_item[1];
          } else {
            input_counts[item.itemHrid] = item.count * upgrade_item[1];
          }
        }
        inputs = inputs.concat(newAction.inputItems);
        actions.push(newAction);
      }

      upgrade_hrid = newAction.upgradeItemHrid;
    }
  }

  const totalExp = actions.reduce(
    (acc, val) => acc + val.experienceGain.value * wisdomTeaBonus,
    0
  );

  const totalSeconds = actions.reduce(
    (acc, val) => acc + val.baseTimeCost / 1000000000,
    0
  );

  const entries: Record<string, boolean> = {};
  var rowData = inputs.map((x) => {
    var artisan_modify = 0.1;
    var artisan_value = 1 - artisan_modify;
    if (typeof guzzLevel === "number") {
      var guzz_modifier = 1 + GUZZ_LEVEL_MULTIPLIERS[guzzLevel];
      artisan_value = 1 - artisan_modify * guzz_modifier;
    }
    if (entries[x.itemHrid] === undefined) {
      entries[x.itemHrid] = true;
      var modified_count = hasArtisan ? x.count * artisan_value : x.count;
      if (input_counts[x.itemHrid] !== undefined) {
        modified_count = hasArtisan ? input_counts[x.itemHrid] * artisan_value : input_counts[x.itemHrid];
      }
      return {
        ...data.itemDetails[x.itemHrid],
        count: modified_count,
      };
    }
  });

  if (upgradeHrid) {
    rowData.push({
      ...data.itemDetails[upgradeHrid],
      count: 1,
    });
  }

  var clean = rowData.filter(
    (v): v is NonNullable<(typeof rowData)[number]> => v !== undefined
  );


  var filtered = clean.filter(item => expanded_items[item.hrid] !== true);

  rowData = filtered;

  const askTotal = rowData.reduce((acc, val) => {
    if (val === undefined) {
      return;
    }
    if (val.hrid === "/items/coin") return acc + val.count;
    if (val.ask < 1) return acc;
    return acc + (val.ask ?? 0) * val.count;
  }, 0);

  const bidTotal = rowData.reduce((acc, val) => {
    if (!val) return acc;
    if (val.hrid === "/items/coin") return acc + val.count;
    return acc + Math.max(val.bid, val.sellPrice) * val.count;
  }, 0);

  const vendorTotal = rowData.reduce(
    (acc, val) => {
      if (!val) return acc;
      return acc + val.sellPrice * val.count},
    0
  );

  const getApproxValue = (hrid: string): number => {
    if(hrid === undefined) {
      return 0;
    }
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

  const overrideTotal = rowData.reduce(
    (acc, val) => {
      if (!val) return acc;
      return acc + getApproxValue(val.hrid) * val.count},
    0
  );

  const outputCount = outputItem.count * gourmetBonus;
  const outputCost = getApproxValue(outputItem.hrid);

  const rows = rowData.map((x, i) => {
    if (!x) return;
    if (x.hrid === "/items/coin") {
      return (
        <tr key={x.hrid + i}>
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
          <td>{x.count}</td>
          <td colSpan={4} />
        </tr>
      );
    }

    return (
      <tr key={x.hrid + i}>
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
        <td>{x.count.toFixed(2)}</td>
        <td>{getFriendlyIntString(x.ask)}</td>
        <td>{getFriendlyIntString(x.bid)}</td>
        <td>{getFriendlyIntString(x.sellPrice)}</td>
        <td>
          <NumberInput
            hideControls
            value={priceOverrides[x.hrid]}
            placeholder={getFriendlyIntString(getApproxValue(x.hrid))}
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
    <Flex
      gap="sm"
      justify="flex-start"
      align="flex-start"
      direction="column"
      wrap="wrap"
    >
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
        />
      </Tooltip>
      <NumberInput
        hideControls
        value={guzzLevel}
        label="Guzz Pouch Level"
        onChange={(v) => setGuzzLevel(v)}
      />
      <Grid>
        <Grid.Col span={10}>
          <Table
            verticalSpacing="xs"
            striped
            highlightOnHover
            withBorder
            withColumnBorders
          >
            <thead>
              <tr>
                <th>Item</th>
                <th>Count</th>
                <th>Ask</th>
                <th>Bid</th>
                <th>Vendor</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {rows}
              <tr>
                <th colSpan={2}>Total</th>
                <td>{getFriendlyIntString(askTotal)}</td>
                <td>{getFriendlyIntString(bidTotal)}</td>
                <td>{getFriendlyIntString(vendorTotal)}</td>
                <td>{getFriendlyIntString(overrideTotal)}</td>
              </tr>
              <tr>
                <th>
                  <Flex
                    justify="flex-start"
                    align="center"
                    direction="row"
                    wrap="wrap"
                    gap="xs"
                  >
                    <Icon hrid={outputItem.hrid} /> {outputItem.name}
                  </Flex>
                </th>
                <td>{outputCount.toFixed(2)}</td>
                <td>{getFriendlyIntString(outputItem.ask)}</td>
                <td>{getFriendlyIntString(outputItem.bid)}</td>
                <td>{getFriendlyIntString(outputItem.sellPrice)}</td>
                <td>
                  <NumberInput
                    hideControls
                    value={priceOverrides[outputItem.hrid]}
                    placeholder={getFriendlyIntString(outputCost)}
                    onChange={(y) =>
                      setPriceOverrides({
                        ...priceOverrides,
                        [outputItem.hrid]: y,
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={2}>Total</th>
                <td>{getFriendlyIntString(outputItem.ask * outputCount)}</td>
                <td>{getFriendlyIntString(outputItem.bid * outputCount)}</td>
                <td>
                  {getFriendlyIntString(outputItem.sellPrice * outputCount)}
                </td>
                <td>{getFriendlyIntString(outputCost * outputCount)}</td>
              </tr>
            </tbody>
          </Table>
        </Grid.Col>
        <Grid.Col span="auto">
          <div>xp: {totalExp.toFixed(2)}</div>
          <div>time: {totalSeconds} seconds</div>
          <div>
            xp/h: {getFriendlyIntString((totalExp / totalSeconds) * 3600)}
          </div>
        </Grid.Col>
      </Grid>
    </Flex>
  );
}
