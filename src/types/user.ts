import {Post} from "./post";
import {Profile} from "./profile";

export interface User {
  id : number;
  name : string;
  email : string;
  uuid : string;
  password : string;
  posts : Post[];
  profile : Profile
}

