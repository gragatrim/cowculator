// One API call returns the *current* top ask & bid for every item.
// The response shape is:
//
// {
//   "timestamp": 1718805000,          // unix seconds
//   "items": {
//      "iron_ore": { "ask": 42.1, "bid": 40.9 },
//      "iron_bar": { "ask": 89.9, "bid": 87.3 },
//      ...
//   }
// }
export interface Snapshot {
  timestamp: number;
  items: Record<
    string,
    {
      a: number;
      b: number;
    }
  >;
}

const API_URL =
  "https://www.milkywayidle.com/game_data/marketplace.json" as const;

let cached: Snapshot | null = null;

/** download once per load, reuse afterwards */
export async function loadSnapshot(): Promise<Snapshot> {
  if (cached) return cached;
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok)
    throw new Error(`Market API returned ${res.status} ${res.statusText}`);
  cached = (await res.json()) as Snapshot;
  return cached;
}

/** Convenience: return {ask,bid} for one item or undefined if not found */
export async function getMarketPrice(item: string) {
  const snap = await loadSnapshot();
  return snap.items[item] ?? undefined;
}
