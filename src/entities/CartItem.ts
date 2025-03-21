import { Album } from "./Album"

export interface CartItem {
  id: string
  item: Album
  quantity: number
}