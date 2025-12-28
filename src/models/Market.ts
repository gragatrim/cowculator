export interface MarketValue {
  /** alias for ask */
  a: number;
  /** alias for bid */
  b: number;
  ask: number;
  bid: number;
  vendor?: number;
}

export interface MarketResponse {
  /** new shape: { timestamp, items: { hrid: {a,b} } } */
  items?: Record<string, MarketValue>;
  timestamp?: number;
  /** legacy shapes for backwards compatibility */
  marketData?: Record<string, MarketValue[]>;
  market?: Record<string, MarketValue | MarketValue[]>;
  time?: number;
}
