import { config } from "dotenv";
config()

export const INTERNAL_ERROR = 500
export const OK = 200
export const BAD_REQUEST = 400
export const UNAUTHORIZED = 401
export const FORBIDDEN = 403

export const GET_UNIX_NOW = () => Math.floor(Date.now() / 1000);
export const ACCESS_LIFE = "1h"
export const ACCESS_LIFE_DATE = () => new Date(Date.now() + (1000 * 60 * 60 * 1))
export const REFRESH_LIFE = "6h"
export const REFRESH_LIFE_DATE = () => new Date(Date.now() + (1000 * 60 * 60 * 6))
export const MIN_ACCESS_DIFF = 30
export const ACCESS_TOKEN_KEY = "access_token"
export const REFRESH_TOKEN_KEY = "refresh_token"


export const SECRET_KEY = process.env.SECRET_KEY!

export const PORT = process.env.PORT || 3000
export const ALLOWED_PORT = process.env.ALLOWED_PORT!

export const MONGO_STRING = process.env.MONGO_STRING!

export const MYSQL_HOST = process.env.MYSQL_HOST!
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD!
export const MYSQL_PORT = process.env.MYSQL_PORT!
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE!

export const SPOTIFY_BASE_URL = process.env.SPOTIFY_BASE_URL!
export const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!
export const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!


export const ITEM_TYPES = {
  TRACK: "track",
  ALBUM: "album",
  ARTIST: "artist"
}
