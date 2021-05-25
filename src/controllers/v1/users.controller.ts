import express from "express"
import { PrismaClient } from '@prisma/client'
import createHttpError from "http-errors";
import httpStatus from "http-status";

const prisma = new PrismaClient();

const get = async (req : express.Request, res : express.Response, next : express.NextFunction) => {
  try {
    // /v1/users/uuid
    if (req.params.uuid) {
      const user = await prisma.user.findUnique({
        where : {
          uuid : req.params.uuid
        }
      });

      if (!user) {
        throw (createHttpError(httpStatus.NOT_FOUND, '사용자를 찾을 수 없습니다.'))
      }

      return res
        .status(httpStatus.OK)
        .json(user)
    }
    // /v1/users
    else {
      const users = await prisma.user.findMany()
      return res.json(users)
    }
  } catch (e) {
    next(e)
  }
}

export {
  get
}
