import {Post} from "./post";
import {Profile} from "./profile";

export interface LoginUser {
  email : string;
  password : string;
}

export interface JWTLoginUserPayload {
  email : string,
  uuid : string,
}

export interface JWTUser {
  name? : string | null,
  email : string,
  uuid : string,
  createdAt : Date,
  updatedAt : Date
}

export interface User {
  id : number;
  name? : string;
  email : string;
  uuid : string;
  password : string;
  posts? : Post[];
  profile? : Profile
}

