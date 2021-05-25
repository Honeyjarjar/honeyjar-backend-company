import express from "express"
import httpStatus from 'http-status'
import createError from 'http-errors'

const login = async (req : express.Request, res : express.Response, next : express.NextFunction) => {
  try {
    return res.json({})
  } catch (e) {
    next(e)
  }
}

export {
  login
}
