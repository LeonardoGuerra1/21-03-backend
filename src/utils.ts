import { Response } from "express"
import { BAD_REQUEST, INTERNAL_ERROR, ITEM_TYPES, OK, SECRET_KEY } from "./constants"
import { Album, DetailedAlbum } from "./entities/Album"
import { Artist } from "./entities/Artist"
import { DetailedTrack, Track } from "./entities/Track"
import jwt, { VerifyErrors } from "jsonwebtoken"

export interface Decoded {
  id: number,
  iat: number,
  exp: number
}

export interface ServiceResponse {
  ok: boolean
  internal?: boolean
  message: string
  data: any
}

export const INTERNAL_RESPONSE: ServiceResponse = {
  ok: false,
  message: "Something went wrong",
  data: null,
  internal: true
}

export const UNAUTHORIZED_RESPONSE: ServiceResponse = {
  ok: false,
  message: "Unauthorized",
  data: null
}

export const FORBIDDEN_RESPONSE: ServiceResponse = {
  ok: false,
  message: "Forbidden user",
  data:  null
}

export const getStatus = (result: ServiceResponse) => {
  return result.internal
  ? INTERNAL_ERROR
  : result.ok
    ? OK
    : BAD_REQUEST
}

export function randomNumber(min: number, max: number, decimals: number) {
  return parseFloat((Math.random() * (max - min + 1) + min).toFixed(decimals))
}


const DEFAULT_IMAGE = "https://i.scdn.co/image/ab676161000051747baf6a3e4e70248079e48c5a"

export function mapTrack(item: any): Track {
  const image = (item.album?.images.length > 0)
    ? item.album.images[0].url 
    : DEFAULT_IMAGE

  return {
    id: item.id,
    s_id: item.id,
    name: item.name,
    image,
    type: ITEM_TYPES.TRACK,
  }
}

export function mapDetailedTrack(item: any): DetailedTrack {
  const image = (item.album.images?.length > 0)
    ? item.album.images[0].url 
    : DEFAULT_IMAGE
  const duration = item.duration_ms
  const number = item.track_number
  const album = mapAlbum(item.album)
  const artist = mapArtist(item.artists[0])

  return {
    id: item.id,
    s_id: item.id,
    name: item.name,
    image,
    type: ITEM_TYPES.TRACK,
    duration,
    number,
    album,
    artist
  }
}

export function mapAlbum(item: any): Album {
  const image = (item.images?.length > 0)
    ? item.images[0].url
    : DEFAULT_IMAGE

  const stock = randomNumber(1, 30, 0)
  const price = randomNumber(10, 100, 2)
  const isAvaliable = stock > 0

  return {
    id: item.id,
    s_id: item.id,
    name: item.name,
    image,
    type: ITEM_TYPES.ALBUM,
    price,
    stock,
    isAvaliable
  }
}

export function mapDetailedAlbum(item: any): DetailedAlbum {
  const image = (item.images?.length > 0)
  ? item.images[0].url
  : DEFAULT_IMAGE

  const stock = randomNumber(1, 30, 0)
  const price = randomNumber(10, 100, 2)
  const isAvaliable = stock > 0

  const gallery = item.images.map((i: any) => i.url)
  const release = item.release_date
  const totalTracks = item.total_tracks
  
  const tracks = item.tracks.items.map((t: any) => mapTrack(t))
  const artist = mapArtist(item.artists[0])

  return {
    id: item.id,
    s_id: item.id,
    name: item.name,
    image,
    type: ITEM_TYPES.ALBUM,
    price,
    stock,
    isAvaliable,
    gallery,
    release,
    totalTracks,
    tracks,
    artist
  }
}

export function mapArtist(item: any): Artist {
  const image = (item.images?.length > 0)
    ? item.images[0].url
    : DEFAULT_IMAGE

  return {
    id: item.id,
    s_id: item.id,
    name: item.name,
    image,
    type: ITEM_TYPES.ARTIST
  }
}


export const setCookie = (name: string, id: number, res: Response, life: any, dateLife: Date) => {
  const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: life })
  res.cookie(name, token, {
    expires: dateLife,
    httpOnly: true,
    secure: true,
    sameSite: "none"
  })
}

export const unsetCookie = (name: string, res: Response) => {
  res.cookie(name, "", { expires: new Date(0) })
}

export const verifyToken = (token: string, onError: () => void, onSuccess: (decoded: any) => void) => {
  jwt.verify(token, SECRET_KEY, (error: VerifyErrors | null, tokenDecoded: any) => {
    if (error !== null) onError()
    else onSuccess(tokenDecoded)
  })
}
