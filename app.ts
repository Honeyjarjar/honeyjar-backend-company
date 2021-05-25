import createError from "http-errors"
import cookieParser from "cookie-parser";
import logger from "morgan";
import express from "express"
import path from "path"

import users from "./routes/users";
import company from "./routes/company";
import index from "./routes/index";

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
app.use('/', index)
app.use('/users', users)
app.use('/company', company)

app.use((err : Error , req : express.Request, res : express.Response, next : express.NextFunction) => {
  next(createError(404))
})

export default app
