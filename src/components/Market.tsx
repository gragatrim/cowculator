import { useEffect, useState } from "react";
import { Flex, Loader } from "@mantine/core";
import { Legend, LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ItemDropdown from "./ItemDropdown";
import {ApiData} from "../services/ApiService";
import {getHistoricalData} from "../services/MarketApi";

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

export default function Market({data}: Props) {
  const [item, setItem] = useState<string | null>(null);
  const [historicalData, setHistoricalData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [latest, setLatest] = useState<any>(null);

  useEffect(() => {
    if (!item) { return; }
    setLoading(true);
    getHistoricalData(item).then((d: any) => {
      setHistoricalData(shapeData(d));
      setLoading(false);
    })
  }, [item]);
  useEffect(() => {
    if (historicalData)
      setLatest(historicalData.at(-1));
    else
      setLatest(null);
  }, [historicalData]);

  return (
    <>
      <Flex>
        <ItemDropdown data={data} onChange={setItem}/>
      </Flex>
      <div style={{width: '100%', height: 450, marginTop: '2rem'}}>
        {loading === true && (<Loader/>)}
        {loading === false && (<>
          {/*{latest && (*/}
          {/*  <div style={{marginBottom: '2rem'}}>*/}
          {/*    Latest: <span style={{color: ASK_COLOR}}>{latest.ask.toLocaleString()} Ask</span> / <span style={{color: BID_COLOR}}>{latest.bid.toLocaleString()} Bid</span> / <span style={{color: SPREAD_COLOR}}>{latest.spread.toLocaleString()} Spread</span>*/}
          {/*  </div>*/}
          {/*)}*/}
          <ResponsiveContainer>
            <LineChart data={historicalData}>
              <XAxis dataKey="date" tickCount={0}/>
              <YAxis domain={[0, 'dataMax']}/>
              <Tooltip formatter={(value: any) => value && value.toLocaleString()}/>
              <Legend/>

              <Line type="monotone" dataKey="ask" stroke={ASK_COLOR} dot={false} activeDot={{r: 4}}/>
              <Line type="monotone" dataKey="bid" stroke={BID_COLOR} dot={false} activeDot={{r: 4}}/>
              <Line type="monotone" dataKey="spread" stroke={SPREAD_COLOR} dot={false} activeDot={{r: 4}}/>
            </LineChart>
          </ResponsiveContainer>
        </>)}
      </div>
    </>
  )
}
