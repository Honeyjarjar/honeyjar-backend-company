import randomString from 'random-string'

describe("Login Test", () => {
  let userData;
  beforeAll(async () => {
    userData = {
      email : randomString() + '@test.com',
      password : randomString()
    }
  })
})
