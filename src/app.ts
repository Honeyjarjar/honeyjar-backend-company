import createError from "http-errors"
import cookieParser from "cookie-parser";
import logger from "morgan";
import express from "express"
import path from "path"

import v1Route from "./routes/v1";

import {ExtendedError} from "./types/error";

const app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

// Middlewares
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended : false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

// Routing
app.use('/v1', v1Route)

app.use((err : Error , req : express.Request, res : express.Response, next : express.NextFunction) => {
  next(createError(404))
})

app.use((err : ExtendedError, req : express.Request, res : express.Response, next : express.NextFunction ) => {

  let apiError : ExtendedError = err;

  if (!err.status) {
    apiError = createError(err)
  }

  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {}
  return res.status(err.status || 500)
    .json(res.locals.error);
})

export default app
