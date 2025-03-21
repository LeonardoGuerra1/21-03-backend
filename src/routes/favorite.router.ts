import { Router } from "express";
import { addItem, listFavoritesAlbums, listFavoritesArtists, listFavoritesTracks, removeItem } from "../service/favorite.service";
import { getStatus } from "../utils";
import { middlewareAuth } from "../middlewares/middlewareAuth";

const router = Router()

router.get("/list-tracks", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const result = await listFavoritesTracks(userId)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.get("/list-albums", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const result = await listFavoritesAlbums(userId)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.get("/list-artists", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const result = await listFavoritesArtists(userId)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.post("/save", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const { payload } = req.body
  const result = await addItem(payload, userId)
  const status = getStatus(result)

  res.status(status)
  res.send(result)
})

router.delete("/delete", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const { id } = req.query
  const result = await removeItem(id as string, userId)
  const status = getStatus(result)
  res.status(status).send(result)
})

export default router