import { Schema } from "mongoose"
import connection from "../mongo.db"

const FavoriteSchema = new Schema({
  s_id: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  userId: { type: Number, required: true, trim: true },
}, { timestamps: { createdAt: true, updatedAt: false } })

const FavoriteModel = connection!.model("Favorite", FavoriteSchema)
export default FavoriteModel