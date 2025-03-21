import { NextFunction, Request, Response } from "express";
import { Decoded, setCookie, UNAUTHORIZED_RESPONSE, verifyToken } from "../utils";
import { ACCESS_LIFE, ACCESS_LIFE_DATE, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, UNAUTHORIZED } from "../constants";

export const middlewareAuth = async (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req.cookies[ACCESS_TOKEN_KEY],
    () => { //NO VALID ACCESS TOKEN
      verifyToken(req.cookies[REFRESH_TOKEN_KEY],
        () => res.status(UNAUTHORIZED).send(UNAUTHORIZED_RESPONSE), //NO VALID REFRESH TOKEN
        (decoded: Decoded) => {
          setCookie(ACCESS_TOKEN_KEY, decoded.id, res, ACCESS_LIFE, ACCESS_LIFE_DATE()); //VALID REFRESH TOKEN, SO UPDATE ACCESS TOKEN
          (req as any).userId = decoded.id
          next()
        }
      )
    }, (decoded: Decoded) => {
      (req as any).userId = decoded.id //VALID ACCESS TOKEN
      next()
    }
  )
}
