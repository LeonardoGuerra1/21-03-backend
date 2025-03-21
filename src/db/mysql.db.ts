import { createPool } from "mysql2/promise"
import { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT } from "../constants"

export const pool = createPool({
  host: MYSQL_HOST,
  user: "root",
  password: MYSQL_PASSWORD,
  port: parseInt(MYSQL_PORT),
  database: MYSQL_DATABASE
})