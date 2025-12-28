export interface MarketResponse {
  market: { [key: string]: MarketValue };
  time: number;
}

export interface MarketValue {
  a: number;
  b: number;
  vendor: number;
}
