import { Album } from "./Album"
import { Artist } from "./Artist"

export interface Track {
  id: string
  s_id: string
  name: string
  image: string
  type: string
}

export interface DetailedTrack extends Track {
  duration: number
  number: number
  album: Album
  artist: Artist
}