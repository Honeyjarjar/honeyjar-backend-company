import {User} from "./user";

export interface Post {
  id : number;
  title : string;
  createdAt : Date;
  content? : string;
  published : boolean;
  authorId : number;
  user : User
}

