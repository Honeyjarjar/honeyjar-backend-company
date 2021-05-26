import {JWTUser} from "../user";
import 'express';

declare module 'express' {
  export interface Request {
    user?: JWTUser;
  }
}
