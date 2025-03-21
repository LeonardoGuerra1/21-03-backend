import { createConnection } from "mongoose"
import { MONGO_STRING } from "../constants"

const getConnection = () => {
  try {
    const con = createConnection(MONGO_STRING)
    return con
  } catch (error) {
    console.log({
      from: "MONGOOSE CONNECT",
      error,
    });
  }
}
const connection = getConnection()
export default connection
