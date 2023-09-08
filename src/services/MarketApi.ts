import { createDbWorker } from "sql.js-httpvfs"

// WASM + WebWorker shit
const workerUrl = new URL("sql.js-httpvfs/dist/sqlite.worker.js", import.meta.url);
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);

// DB Config
const config: any = [{
  from: "inline",
  config: {
    serverMode: "full", // file is just a plain old full sqlite database
    requestChunkSize: 4096, // the page size of the  sqlite database (by default 4096)
    url: "https://holychikenz.github.io/MWIApi/market.db" // url to the database (relative or full)
  }
}];

const worker: any = await createDbWorker(config, workerUrl.toString(), wasmUrl.toString());
const LIMIT_RECORDS = 48 * 7;

export function getHistoricalData(item_name: string) {
  return worker.db.exec(`SELECT DATETIME(a.time, "unixepoch") AS time, a."${item_name}" AS ask, b."${item_name}" AS bid, a."${item_name}" - b."${item_name}" AS spread FROM ask a JOIN bid b ON a.time = b.time ORDER BY time DESC LIMIT ${LIMIT_RECORDS}`);
}

export default async function queryMarket(sql: any, params: any) {
  return worker.db.exec(sql, params);
}
