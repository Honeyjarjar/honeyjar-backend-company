import request from "supertest"
import { PrismaClient } from "@prisma/client";
import randomString from "random-string";
import app from "../../../app";
import {User} from "../../../types/user";
import { v4 as uuid4 } from 'uuid'

const prisma = new PrismaClient();

let user : User;

beforeAll(async () => {
  // 사용자 2명 생성
  await prisma.user.create({
    data : {
      email: randomString() + '@test.com',
      password: randomString()
    }
  })

  user = await prisma.user.create({
    data : {
      email: randomString() + '@test.com',
      password: randomString()
    }
  })
})

afterAll(async () => await prisma.$disconnect() );

describe('GET: /v1/users', () => {

  test('전체 사용자 조회. | 200', async () => {
    let response = await request(app)
      .get(`/v1/users`)

    expect(response.body.length)
      .toBeGreaterThan(1)
  })

  test('uuid 로 사용자 조회. | 200', async () => {
    let response = await request(app)
      .get(`/v1/users/${user.uuid}`)
    console.log(response)
    expect(response.body.email)
      .toBe(user.email)
  })

  test('잘못된 uuid 로 사용자 조회. | 404', async () => {
    let response = await request(app)
      .get(`/v1/users/${uuid4()}`)

    expect(response.statusCode)
      .toBe(404)
  })
})
