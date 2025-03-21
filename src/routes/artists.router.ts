import { Router } from "express";
import { getStatus } from "../utils";
import { findArtist, listArtistAlbums, listArtists } from "../service/artist.service";
import { middlewareSpotify } from "../middlewares/middlewareSpotify";

const router = Router()

router.get("/list", middlewareSpotify, async (req, res) => {
  const result = await listArtists()
  const status = getStatus(result)
  res.status(status).send(result)
})

router.get("/list-more", middlewareSpotify, async (req, res) => {
  const result = await listArtists(10, 20)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.get("/:id", middlewareSpotify, async (req, res) => {
  const { id } = req.params
  const result = await findArtist(id)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.get("/:id/albums", middlewareSpotify, async (req, res) => {
  const { id } = req.params
  const { offset } = req.query as any
  const result = await listArtistAlbums(id, offset)
  const status = getStatus(result)
  res.status(status).send(result)
})



export default router