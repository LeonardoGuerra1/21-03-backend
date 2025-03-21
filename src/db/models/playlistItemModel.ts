import { Schema } from "mongoose"

export const PlaylistItemSchema = new Schema({
  s_id: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true }
}, { timestamps: { createdAt: true, updatedAt: false } })

// const PlaylistItemModel = connection!.model("PlaylistItem", PlaylistItemSchema)
// export default PlaylistItemModel