import {uuid} from "../../utils/uuid";
import { PrismaClient } from "@prisma/client";
import randomString from "random-string";

const UUIDVersion4Regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
const prisma = new PrismaClient();

test('ordered UUID 가 출력되어야 합니다.', () => {
  const orderedUuid = uuid()
  expect(orderedUuid).toMatch(/\b4[0-9A-Fa-f]{31}\b/g)
})

test('사용자를 생성하면 uuid 가 정상 생성되어야 합니다', async () => {
  afterAll(async () => await prisma.$disconnect() );

  const user = await prisma.user.create({
    data : {
      email: `${randomString()}@test.com`,
      password: randomString()
    }
  })

  expect(user.uuid)
    .toMatch(UUIDVersion4Regex)
})
