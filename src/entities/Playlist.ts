export interface Playlist {
  // id: string
  name: string
  items: PlaylistItem[]
  userId: number
  createdAt: Date
}

export interface PlaylistItem {
  // id: string
  s_id: string
  name: string
  image: number
}
