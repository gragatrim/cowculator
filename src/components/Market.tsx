// @ts-nocheck
import { useState } from "react";
import { Flex, Loader } from "@mantine/core";
import { Legend, LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ItemDropdown from "./ItemDropdown";
import {ApiData} from "../services/ApiService";

interface Props {
  data: ApiData;
}

const shapeData = (data: any) => {
  return data[0].values.map((d: any) => {
    return {
      date: d[0].substring(5, d[0].length - 3),
      ask: d[1] != -1 ? d[1] : null,
      bid: d[2] != -1 ? d[2] : null,
      spread: d[3] != -1 ? d[3] : null,
    }
  }).reverse();
}

const BID_COLOR = "#bbffbb";
const ASK_COLOR = "#ffbbbb";
const SPREAD_COLOR = "#bbbbff";

export default function Market({ data }: Props): JSX.Element | null {
  /* ---- quick guard while data is loading ---- */
  if (!data) return <Loader />;

  /* ---- (demo) pick the first item & shape its series ---- */
  const [itemIndex, setItemIndex] = useState(0);
  const chartData = shapeData([data[itemIndex]]);

  return (
    <Flex direction="column" gap="sm">
      <ItemDropdown
        items={data.map((d) => {
          if (!d) return;
          return d.item})}
        value={itemIndex}
        onChange={setItemIndex}
      />

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ask" stroke={ASK_COLOR} dot={false} />
          <Line type="monotone" dataKey="bid" stroke={BID_COLOR} dot={false} />
          <Line type="monotone" dataKey="spread" stroke={SPREAD_COLOR} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Flex>
  );
}
