import { Schema } from "mongoose"
import connection from "../mongo.db"
import { PlaylistItemSchema } from "./playlistItemModel"

const PlaylistSchema = new Schema({
  name: { type: String, required: true, trim: true },
  items: { type: [PlaylistItemSchema] },
  userId: { type: Number, required: true, trim: true },
}, { timestamps: { createdAt: true, updatedAt: false } })

const PlaylistModel = connection!.model("Playlist", PlaylistSchema)
export default PlaylistModel
