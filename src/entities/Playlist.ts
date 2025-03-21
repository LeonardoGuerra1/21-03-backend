export interface Playlist {
  // id: string
  name: string
  items: PlaylistItem[]
  userId: number
}

export interface PlaylistItem {
  // id: string
  s_id: string
  name: string
  image: number
}
