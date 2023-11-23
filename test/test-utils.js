import bcrypt from "bcrypt";
import { prismaClient } from "../src/application/database";
const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("test", 10),
      email: "test@test.com",
      token: "test",
      roles: "user",
    },
  });
};

const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

const createTestArticle = async () => {
  await prismaClient.article.create({
    data: {
      title: "test",
      content: "test",
      description: "test",
      category: "test",
      create_at: new Date(),
      modified_at: new Date(),
      author_id: 1,
      token: "test",
    },
  });
};

const removeTestArticle = async () => {
  await prismaClient.article.deleteMany({
    where: {
      title: "test",
    },
  });
};

export { removeTestUser, createTestUser, getTestUser, createTestArticle };
