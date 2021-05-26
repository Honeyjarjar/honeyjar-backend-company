import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken"
import createHttpError from "http-errors";
import userRepo from "../repositiories/user.repository"
import {JWTLoginUserPayload} from "../types/user";

export default async (req : Request, res : Response, next : NextFunction) => {
  try {
    req.user = undefined;
    if (req.headers?.authorization) {
      let uuid : string;
      jwt.verify(
        req.headers.authorization.split('Bearer ')[1],
        // @ts-ignore
        process.env.JWT_SECRET,
        (err : Error, payload : JWTLoginUserPayload) => {
          if (err) {
            return next(createHttpError(401, "토큰 정보가 유효하지 않습니다."))
          }
          uuid = payload.uuid
        })

      // @ts-ignore
      const user = await userRepo.find(uuid);
      if (!user) {
        return next(createHttpError(404, '사용자를 찾을 수 없습니다.'))
      }
      req.user = user;
    }
    // next를 리턴해주어야 한다. 그렇지 않으면 app.use 하는 과정에서 문제 발생
    next();
  } catch (e) {
    next(e);
  }
}
