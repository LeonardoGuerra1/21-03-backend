import { ServiceResponse } from "../utils"
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "../constants"

interface SpotifyTokenResponse {
  ok: boolean
  token: string | null
  expiration?: number | null
}

type TokenType = string | null
type ExpirationTokenType = number | null

export let token: TokenType = null
export let tokenExpiration: ExpirationTokenType = null;


const getToken = async (): Promise<SpotifyTokenResponse> => {
  const url = "https://accounts.spotify.com/api/token"
  const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials'
    })
  }

  const response = await fetch(url, options)
  if (!response.ok) {
    return {
      ok: false,
      token: null
    }
  } else {
    const data = await response.json()
    return {
      ok: true,
      token: data.access_token,
      expiration: data.expires_in
    }
  }
}

export const handleToken = async () => {
  const tokenResponse = await getToken()
  if (tokenResponse.ok) {
    token = tokenResponse.token
    tokenExpiration = Date.now() + tokenResponse.expiration! * 1000
  }
}

export const fetchSpotify = async (url: string, callback: (json: any) => ServiceResponse): Promise<ServiceResponse> => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  
  if (!response.ok) {
    return {
      ok: false,
      message: "Something went wrong",
      data: null
    }
  } else {
    const json = await response.json()
    return callback(json)
  }
}