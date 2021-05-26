import { Request, Response, NextFunction } from "express"
import createHttpError from "http-errors";
import httpStatus from "http-status";
import userRepo from "../../repositiories/user.repository"

const get = async (req : Request, res : Response, next : NextFunction) => {
  try {
    // /v1/users/uuid
    if (req.params.uuid) {
      const user = await userRepo.find(req.params.uuid)
      if (!user) {
        throw (createHttpError(httpStatus.NOT_FOUND, '사용자를 찾을 수 없습니다.'))
      }

      return res
        .status(httpStatus.OK)
        .json(user)
    }
    // /v1/users
    else {
      const users = await userRepo.all()
      return res.json(users)
    }
  } catch (e) {
    next(e)
  }
}

export {
  get
}
