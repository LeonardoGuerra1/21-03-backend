import { INTERNAL_RESPONSE, mapAlbum, mapDetailedAlbum, ServiceResponse } from "../utils"
import { SPOTIFY_BASE_URL } from "../constants"
import { fetchSpotify } from "../db/spotify.db"

const ids = ["7z56OdGdBMjgUmDG9SB5sI","78Cgst6GCkXDVnyzNfUGBT","5EyIDBAqhnlkAHqvPRwdbX","7p5Jz24ONoCZNRG6wIyFL4","1ewzcnxwhekq50IMd864PW","4guAwaniEAEQSW0NCpo4gm","3B61kSKTxlY36cYgzvf3cP","6Hv7UZCLx4kCYZCY0kBbZc","6RctuyYdvP65YaFZMwv9Xo","4Q9zv0BFqFTDb3KF3ZrwJv","6YJYFQ1Zz9I49YQknK4wIn","2UKBaeUC50EitkqvCIrip6","5Dbax7G8SWrP9xyzkOvy2F","1cwZmK0zXorTlALtgOajeC","4LH4d3cOWNNsVw41Gqt2kv","1Y1EHrMPW3VMM3RNTGKU5l","2EiE9zQ3CdOSqlqrvbKghm","16m1xehdAu0dlKIrWeXuEw"]

export const listAlbums = async (start = 0, end = 10): Promise<ServiceResponse> => {
  try {
    const q = ids.slice(start, end).join(",")
    const url = `${SPOTIFY_BASE_URL}/albums?ids=${q}`

    return fetchSpotify(url, (json) => {
      
      const list: any[] = json.albums
      return {
        ok: true,
        message: "",
        data: list.map(item => mapAlbum(item))
      }
    })
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const findAlbum = async (id: string): Promise<ServiceResponse> => {
  try {
    const url = `${SPOTIFY_BASE_URL}/albums/${id}`

    return fetchSpotify(url, (json) => {
      const item = mapDetailedAlbum(json)
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