import jwt from 'jsonwebtoken'
import request from "supertest";
import app from "../../../app";
import {JWTLoginUserPayload, User} from "../../../types/user";
import userRepo from "../../../repositiories/user.repository"

describe("Login Test", () => {

  let token: string | null = null;

  it("실제 로그인 테스트 | 200", async () => {
    let response = await request(app)
      .post('/v1/auth/login')
      .send({
        email : "sjly3k@cau.ac.kr",
        password : "8703142337a!"
      })

    expect(response.statusCode).toBe(200);
    expect(response.body.data.token).toBeTruthy();

    token = response.body.data.token;
    // @ts-ignore
    const payload : JWTLoginUserPayload = jwt.verify(response.body.data.token, process.env.JWT_SECRET)
    expect("sjly3k@cau.ac.kr").toBe(payload.email)

    const findUser : User = await userRepo.find(payload.uuid)
    expect("sjly3k@cau.ac.kr").toBe(findUser.email)
  })

  it ("없는 사용자 테스트 | 404", async () => {
    let response = await request(app)
      .post('/v1/auth/login')
      .send({
        email : "notFound@cau.ac.kr",
        password : "somePassword"
      })

    expect(response.statusCode).toBe(404);
    expect(response.body.data.message).toBe('사용자를 찾을 수 없습니다.')
  })

  it ("잘못된 비밀번호 테스트 | 422", async () => {
    let response = await request(app)
      .post('/v1/auth/login')
      .send({
        email : "sjly3k@cau.ac.kr",
        password : "somePassword"
      })

    expect(response.statusCode).toBe(422);
    expect(response.body.data.message).toBe('비밀번호를 확인해주세요.')
  })

  it('token 으로 사용자 조회. | 200', async () => {
    console.log(token)
    let response = await request(app)
      .get('/v1/auth/tokenTest')
      .set('Authorization', `Bearer ${token}`)

    expect(response.body.data.email).toBe("sjly3k@cau.ac.kr")

    console.log(response.body.data)
  })
})
