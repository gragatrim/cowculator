export interface MarketListing {
  a: number;
  b: number;
}

export interface MarketValue {
  [enhancementLevel: string]: MarketListing;
}

export interface MarketData {
  [itemHrid: string]: MarketValue;
}

export interface Marketplace {
  marketData: MarketData;
}

