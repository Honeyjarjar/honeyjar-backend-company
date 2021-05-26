import { PrismaClient } from "@prisma/client"
import {User} from "../types/user";
const prisma = new PrismaClient();

const canShowUser = {
  name : true,
  email : true,
  uuid : true,
  createdAt : true,
  updatedAt : true
}

export default {
  // Create
  store : async (data : User) => await prisma.user.create({
    data
  }),

  // Read
  all : async () => await prisma.user.findMany({
    select : {
      ...canShowUser
    }
  }),
  find : async (uuid : string) => await prisma.user.findUnique({
    where : {
      uuid
    },
    select : {
      ...canShowUser
    }
  }),
  findById : async (id : number) => await prisma.user.findUnique({
    where : {
      id
    }
  }),
  findByEmail : async (email : string) => await prisma.user.findUnique({
    where : {
      email
    }
  })
}
