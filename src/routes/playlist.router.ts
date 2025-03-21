import { Router } from "express";
import { getStatus } from "../utils";
import { addItemToPlaylist, changeName, cleanPlaylist, createPlaylist, deletePlaylist, findPlaylist, listPlaylists, removeItemFromPlaylist } from "../service/playlist.service";
import { middlewareAuth } from "../middlewares/middlewareAuth";

const router = Router()

router.get("/list", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const result = await listPlaylists(userId)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.get("/find", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const { id } = req.query
  const result = await findPlaylist(id as string, userId)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.post("/create", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const { payload } = req.body
  const result = await createPlaylist(payload, userId)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.delete("/delete", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const { id } = req.query
  const result = await deletePlaylist(id as string, userId)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.put("/change-name", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const { name, id } = req.body
  const result = await changeName(name, id, userId)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.post("/clean", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const { id } = req.body
  const result = await cleanPlaylist(id as string, userId)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.post("/add-item", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const { playlistId, item } = req.body
  const result = await addItemToPlaylist(playlistId, item, userId)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.delete("/remove-item", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const { playlistId, itemId } = req.query as any
  const result = await removeItemFromPlaylist(playlistId, itemId, userId)
  const status = getStatus(result)
  res.status(status).send(result)
})

export default router