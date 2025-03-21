import { Router } from "express";
import { getComments, submitComment, editComment, deleteComment, getAllUserComments } from "../service/commentary.service";
import { getStatus } from "../utils";
import { middlewareAuth } from "../middlewares/middlewareAuth";

const router = Router()

router.get("/list", async (req, res) => {
  const { itemId } = req.query
  const result = await getComments(itemId as string)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.get("/list-user", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const result = await getAllUserComments(userId)
  const status = getStatus(result)
  res.status(status).send(result)
  })

router.post("/submit", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const { payload } = req.body
  const result = await submitComment(payload, userId)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.put("/edit", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const { id, content } = req.body
  const result = await editComment(id, userId, content)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.delete("/delete", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const { id, itemId } = req.query
  const result = await deleteComment(id as string, itemId as string, userId)
  const status = getStatus(result)
  res.status(status).send(result)
})

export default router