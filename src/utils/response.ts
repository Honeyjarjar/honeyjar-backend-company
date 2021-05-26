import httpStatus from "http-status";
import { Response } from "express"

export default (res : Response, data = {}, code = httpStatus.OK) => res.status(code).json({ data })
