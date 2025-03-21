import { Schema } from "mongoose"
import connection from "../mongo.db"

const CommentarySchema = new Schema({
  content: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  itemId: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  userId: { type: Number, required: true, trim: true },
}, { timestamps: { createdAt: true, updatedAt: false } })

const CommentaryModel = connection!.model("Commentary", CommentarySchema)
export default CommentaryModel
