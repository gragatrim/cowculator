export interface MarketResponse {
  marketData: { [key: string]: MarketValue };
  timestamp: number;
}

export interface MarketValue {
  a: number;
  b: number;
  vendor: number;
}
