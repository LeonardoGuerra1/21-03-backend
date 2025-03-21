import express, { json } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import userRouter from "./routes/user.router"
import favoriteRouter from "./routes/favorite.router"
import playlistRouter from "./routes/playlist.router"
import commentaryRouter from "./routes/commentary.router"
import trackRouter from "./routes/tracks.router"
import albumRouter from "./routes/albums.router"
import artistRouter from "./routes/artists.router"
import { ALLOWED_PORT, PORT } from "./constants"

const app = express()
app.use(cors({ origin: ALLOWED_PORT, credentials: true }))
app.use(json())
app.use(cookieParser())


app.use("/users", userRouter)

app.use("/favorites", favoriteRouter)
app.use("/playlist", playlistRouter)
app.use("/commentary", commentaryRouter)

app.use("/track", trackRouter)
app.use("/album", albumRouter)
app.use("/artist", artistRouter)


app.listen(PORT, (() => {
  console.log("Listening on port " + PORT);
}))