import axios from "axios";
import {
  ActionCategoryDetailMap,
  ActionDetailMap,
  ClientResponse,
  ItemDetail,
} from "../models/Client";
import { MarketResponse, MarketValue } from "../models/Market";
import rawData from "../assets/init_client_data.json";

export interface ApiData {
  gameVersion: string;
  marketTime?: Date;
  levelExperienceTable: number[];
  itemDetails: { [key: string]: ItemDetail & MarketValue };
  actionDetails: { [key: string]: ActionDetailMap };
  actionTypeDetails: { [key: string]: ActionCategoryDetailMap };
  actionCategoryDetails: { [key: string]: ActionCategoryDetailMap };
  enhancementLevelSuccessRateTable: number[];
  enhancementLevelTotalBonusMultiplierTable: number[];
  skillDetails: { [key: string]: ActionCategoryDetailMap };
}

const getApiData = async (): Promise<ApiData> => {
  const marketData = await getMarketData();

  const clientData = rawData as ClientResponse;

  const itemDetails: { [key: string]: ItemDetail & MarketValue } = {};

  Object.entries(clientData.itemDetailMap).forEach(([key, value]) => {
    const m = marketData?.marketData?.[key]?.[0] ?? {};
    itemDetails[key] = {
      ...value,
      a: -1,
      b: -1,
      vendor: value.sellPrice,  // default vendor
      ...m,                     // overwrite a/b if present; no vendor here so default remains
    };
  });

  const result = {
    gameVersion: clientData.gameVersion,
    marketTime: marketData?.timestamp ? new Date(marketData.timestamp * 1000) : undefined,
    itemDetails,
    actionDetails: clientData.actionDetailMap,
    actionTypeDetails: clientData.actionTypeDetailMap,
    actionCategoryDetails: clientData.actionCategoryDetailMap,
    levelExperienceTable: clientData.levelExperienceTable,
    enhancementLevelSuccessRateTable:
      clientData.enhancementLevelSuccessRateTable,
    enhancementLevelTotalBonusMultiplierTable:
      clientData.enhancementLevelTotalBonusMultiplierTable,
    skillDetails: clientData.skillDetailMap,
  };

  return result;
};

export const getMarketData = (useMedian = true) => {
  return axios.get<MarketResponse>(`https://www.milkywayidle.com/game_data/marketplace.json`,
  ).then((x) => x.data);
};

export default getApiData;
