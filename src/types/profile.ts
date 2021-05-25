import {User} from "./user";

export interface Profile {
  id : number;
  bio? : string;
  userId : number;
  user : User;
}

