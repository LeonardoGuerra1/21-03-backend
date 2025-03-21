import { Router } from "express";
import { getStatus } from "../utils";
import { findTrack, listTracks } from "../service/track.service";
import { middlewareSpotify } from "../middlewares/middlewareSpotify";

const router = Router()

router.get("/list", middlewareSpotify, async (req, res) => {
  const result = await listTracks()
  const status = getStatus(result)
  res.status(status).send(result)
})

router.get("/list-more", middlewareSpotify, async (req, res) => {
  const result = await listTracks(10, 20)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.get("/:id", middlewareSpotify, async (req, res) => {
  const { id } = req.params
  const result = await findTrack(id)
  const status = getStatus(result)
  res.status(status).send(result)
})

export default router