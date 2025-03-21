import { INTERNAL_RESPONSE, mapDetailedTrack, mapTrack, ServiceResponse } from "../utils"
import { fetchSpotify } from "../db/spotify.db"
import { SPOTIFY_BASE_URL } from "../constants"

const ids = ["17xHIqoIhBpod2TFXhauE3","6W1BLmVBxkqZwFQcORQLnv","4it4NYn9wNqGV54joA6oN0","1Ahb1lGCvsRSlmThubFzsy","7kriFJLY2KOhw5en9iI2jb","4a9FZDn8ydY1jDrObifbno","2ZWkWB5ZC9BOuPkVuLZs8p","10tzk7ZRjwnLKd3gjKLtTA","4tCUPh6Tm1tsNxsDdFhHzd","3viUDcnE07kiR1PCJ8di7R","0I5Zb7arY0VaOSAEfRFv8B","4RKfajnTCUsDEGoD9pi0dZ","0gnsuw6eGZEwph1rKnxzOu","5jBEAyoj4ZBXfVhxN8WCf6","1nQRg9q9uwALGzouOX5OyQ","3TO7bbrUKrOSPGRTB5MeCz","2WfaOiMkCvy7F5fcp2zZ8L","0sN4ERM2Q2UBKyePqfcgv9","79jHbl16mPsCzgozwFw9Dg","5O36OQojWr4r4BLy4Iz02g"]

export const listTracks = async (start = 0, end = 10): Promise<ServiceResponse> => {
  try {
    const q = ids.slice(start, end).join(",")
    const url = `${SPOTIFY_BASE_URL}/tracks?ids=${q}`

    return fetchSpotify(url, (json) => {
      const list: any[] = json.tracks
      return {
        ok: true,
        message: "",
        data: list.map(item => mapTrack(item))
      }
    })
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const findTrack = async (id: string): Promise<ServiceResponse> => {
  try {
    const url = `${SPOTIFY_BASE_URL}/tracks/${id}`

    return fetchSpotify(url, (json) => {
      const item = mapDetailedTrack(json)
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