import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  user: "root",
  database: "fast_cleaning",
  // password
  namedPlaceholders: true,
  decimalNumbers: true,
});
