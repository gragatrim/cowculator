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
  //I don't care about this
  return <Loader />;
}
