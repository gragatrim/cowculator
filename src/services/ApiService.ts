import axios from "axios";
import {
  ActionCategoryDetailMap,
  ActionDetailMap,
  CombatMonsterDetail,
  ClientResponse,
  ItemDetail,
  OpenableLootDropMap,
  ShopItemDetail,
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
  combatMonsterDetails: { [key: string]: CombatMonsterDetail };
  openableLootDropMap: { [key: string]: OpenableLootDropMap[] };
  shopItemDetailMap: { [key: string]: ShopItemDetail };
}

const getApiData = async (): Promise<ApiData> => {
  const marketData = await getMarketData().catch(() => undefined);

  const clientData = rawData as unknown as ClientResponse;

  const itemDetails: { [key: string]: ItemDetail & MarketValue } = {};

  Object.entries(clientData.itemDetailMap).forEach(([key, value]) => {
    const marketDataEntry = marketData?.marketData?.[key];
    const normalizedMarketDataEntry = Array.isArray(marketDataEntry)
      ? marketDataEntry[0]
      : marketDataEntry;

    const marketEntryFromMarket = marketData?.market?.[key];
    const normalizedMarketEntry = Array.isArray(marketEntryFromMarket)
      ? marketEntryFromMarket[0]
      : marketEntryFromMarket;

    const marketEntry =
      marketData?.items?.[key.replace("/items/", "")] ??
      marketData?.items?.[key] ??
      normalizedMarketDataEntry ??
      normalizedMarketEntry;
    const ask = marketEntry?.ask ?? marketEntry?.a ?? -1;
    const bid = marketEntry?.bid ?? marketEntry?.b ?? -1;
    itemDetails[key] = {
      ...value,
      a: ask,
      b: bid,
      ask,
      bid,
      vendor: value.sellPrice, // default vendor
    };
  });

  const marketTimestamp = marketData?.timestamp ?? marketData?.time;
  const marketDate =
    marketTimestamp !== undefined
      ? new Date(
          marketTimestamp > 1_000_000_000_000
            ? marketTimestamp
            : marketTimestamp * 1000,
        )
      : undefined;

  const result = {
    gameVersion: clientData.gameVersion,
    marketTime: marketDate,
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
    combatMonsterDetails: clientData.combatMonsterDetailMap,
    openableLootDropMap: clientData.openableLootDropMap,
    shopItemDetailMap: clientData.shopItemDetailMap,
  };

  return result;
};

export const getMarketData = () => {
  return axios.get<MarketResponse>(
    `https://www.milkywayidle.com/game_data/marketplace.json`,
    {
      // allow proxies in environments that need them
      proxy: false,
    },
  ).then((x) => x.data);
};

export default getApiData;
