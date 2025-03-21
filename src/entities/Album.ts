import { Artist } from "./Artist"
import { Track } from "./Track"

export interface Album {
  id: string
  s_id: string
  name: string
  image: string
  type: string
  price: number
  stock: number
  isAvaliable: boolean
}

export interface DetailedAlbum extends Album {
  gallery: string[]
  release: string
  totalTracks: number
  tracks: Track[]
  artist: Artist
}