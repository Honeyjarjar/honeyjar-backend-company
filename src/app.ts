require('dotenv').config();

import createHttpError from "http-errors"
import cookieParser from "cookie-parser";
import logger from "morgan";
import express, {Express, Response, Request, NextFunction} from "express"
import path from "path"

import v1Route from "./routes/v1";

import {ExtendedError} from "./types/error";
import response from "./utils/response";
import jwtMiddleware from "./middlewares/jwt.middleware";

const app : Express = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

// Middlewares
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended : false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.use(jwtMiddleware)

// Routing
app.use('/v1', v1Route)

app.use((req : Request, res : Response, next : NextFunction) => {
  next(createHttpError(404))
})

app.use((err : ExtendedError, req : Request, res : Response, next : NextFunction ) => {

  let apiError : ExtendedError = err;

  if (!err.status) {
    apiError = createHttpError(err)
  }

  res.locals.message = apiError.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? apiError : {}
  return response(res, {
    message : apiError.message
  }, apiError.status)
})

export default app
