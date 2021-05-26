import { Request, Response, NextFunction }  from "express"
import createHttpError from 'http-errors'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import userRepo from "../../repositiories/user.repository"
import response from "../../utils/response";
import {JWTLoginUserPayload} from "../../types/user";

const login = async (req : Request, res : Response, next : NextFunction) => {

  try {
    const { email, password } = req.body;
    console.log(req.body)
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return next(createHttpError(404, '사용자를 찾을 수 없습니다.'))
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(createHttpError(422, '비밀번호를 확인해주세요.'))
    }

    const payload : JWTLoginUserPayload = {
      email : user.email,
      uuid : user.uuid
    }

    // @ts-ignore
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn : process.env.JWT_EXPIRES_IN // 1hour
    })

    return response(res, {
      token
    })
  } catch (e) {
    next(e)
  }
}

const tokenTest = async (req : Request, res : Response, next : NextFunction) => {
  try {
    return response(res, req.user)
  } catch (e) {
    next(e)
  }
}

export {
  login,
  tokenTest
}
