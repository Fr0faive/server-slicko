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

const createTestProduct = async () => {
  await prismaClient.products.create({
    data: {
      name: "test",
      price: 1000,
      description: "test",
      stock: 10,
      image: "test",
    },
  });
};

const removeTestProduct = async () => {
  await prismaClient.products.deleteMany({
    where: {
      name: "test",
    },
  });
};

export {
  removeTestUser,
  createTestUser,
  getTestUser,
  createTestProduct,
  removeTestProduct,
};
