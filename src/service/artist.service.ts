import { INTERNAL_RESPONSE, mapAlbum, mapArtist, ServiceResponse } from "../utils"
import { fetchSpotify } from "../db/spotify.db"
import { SPOTIFY_BASE_URL } from "../constants"

const ids = ["6Yxfl63ymAk7MkN8TP10iT","3HJvj2ET4zSRuxv0m4nLmw","60uh2KYYSCqAgJNxcU4DA0","3Azj8v21CQ76AVvjuNv5Vg","4AGALQQLo0S46FUlhJ25V0","47nHIKTmZwcDtIOaSflgPZ","55bGuHb50r5c0PeqqMeNBV","34jw2BbxjoYalTp8cJFCPv","2GXFOqcKmVGfX4OCEKxHFP","7J7btQloI9KSJg0o4e9Fno","7guDJrEfX3qb6FEbdPA5qi","0k17h0D3J5VfsdmQ1iZtE9","3EAHF3jdnHHdko5DBrhRUP","0l8RtvcBMjeOqfgRSVo2d6","7An4yvF7hDYDolN4m5zKBp","3avjTKhr5ZAxRVGMDs9AeX","27GzlZraldlAG0k7oBqmUS","2mSHY8JOR0nRi3mtHqVa04"]

export const listArtists = async (start = 0, end = 10): Promise<ServiceResponse> => {
  try {
    const q = ids.slice(start, end).join(",")
    const url = `${SPOTIFY_BASE_URL}/artists?ids=${q}`

    return fetchSpotify(url, (json) => {
      const list: any[] = json.artists
      return {
        ok: true,
        message: "",
        data: list.map(item => mapArtist(item))
      }
    })
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const findArtist = async (id: string): Promise<ServiceResponse> => {
  try {
    const url = `${SPOTIFY_BASE_URL}/artists/${id}`

    return fetchSpotify(url, (json) => {
      const item = mapArtist(json)
      return {
        ok: true,
        message: "",
        data: item
      }
    })
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const listArtistAlbums = async (id: string, offset = 0): Promise<ServiceResponse> => {
  try {
    const url = `${SPOTIFY_BASE_URL}/artists/${id}/albums?offset=${offset}`
    
    return fetchSpotify(url, (json) => {
      const list: any[] = json.items
      return {
        ok: true,
        message: "",
        data: list.map(album => mapAlbum(album))
      }
    })
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}