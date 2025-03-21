import { Router } from "express"
import { changePassword, getProfile, getSecurity, login, signup, updateInfo } from "../service/user.service"
import { getStatus, ServiceResponse, setCookie, unsetCookie } from "../utils"
import { middlewareAuth } from "../middlewares/middlewareAuth"
import { ACCESS_LIFE, ACCESS_LIFE_DATE, ACCESS_TOKEN_KEY, OK, REFRESH_LIFE, REFRESH_LIFE_DATE, REFRESH_TOKEN_KEY } from "../constants"


const router = Router()

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const result = await login(email, password)

  if (result.ok) {
    setCookie(ACCESS_TOKEN_KEY, result.data.id, res, ACCESS_LIFE, ACCESS_LIFE_DATE())
    setCookie(REFRESH_TOKEN_KEY, result.data.id, res, REFRESH_LIFE, REFRESH_LIFE_DATE())
  }
  const status = getStatus(result)
  res.status(status).send(result)
})

router.post("/signup", async (req, res) => {
  const { payload } = req.body
  const result = await signup(payload)
  
  if (result.ok) {
    setCookie(ACCESS_TOKEN_KEY, result.data.id, res, ACCESS_LIFE, ACCESS_LIFE_DATE())
    setCookie(REFRESH_TOKEN_KEY, result.data.id, res, REFRESH_LIFE, REFRESH_LIFE_DATE())
  }
  const status = getStatus(result)
  res.status(status).send(result)
})

router.post("/logout", (req, res) => {
  unsetCookie(ACCESS_TOKEN_KEY, res)
  unsetCookie(REFRESH_TOKEN_KEY, res)
  
  const response: ServiceResponse = {
    ok: true,
    message: "Successfully logged out",
    data: null
  }
  res.status(OK).send(response)
})

router.get("/profile", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const result = await getProfile(userId)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.get("/security", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const result = await getSecurity(userId)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.put("/update-info", middlewareAuth, async (req, res) => {
  const { payload } = req.body
  const { userId } = req as any
  const result = await updateInfo(userId, payload)
  const status = getStatus(result)
  res.status(status).send(result)
})

router.put("/change-password", middlewareAuth, async (req, res) => {
  const { userId } = req as any
  const { newPassword, oldPassword } = req.body
  
  const result = await changePassword(userId, newPassword, oldPassword)
  const status = getStatus(result)
  res.status(status).send(result)
})

export default router