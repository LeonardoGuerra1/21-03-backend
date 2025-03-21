import { NextFunction, Request, Response } from "express";
import { handleToken, token, tokenExpiration } from "../db/spotify.db";

export const middlewareSpotify = async (req: Request, res: Response, next: NextFunction) => {
  if (token === null || (tokenExpiration !== null && Date.now() >= tokenExpiration)) {
    await handleToken();
  }
  next();
}