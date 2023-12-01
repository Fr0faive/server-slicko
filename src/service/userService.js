import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/responseError.js";
import {
  loginUserValidation,
  registerUserValidation,
  getUserValidation,
  updateUserValidation,
} from "../validation/userValidation.js";
// import validation from "../validation/validation.js";
import bcrypt from "bcrypt";
import { validation } from "../validation/validation.js";
import { v4 as uuid } from "uuid";

const register = async (request) => {
  const user = validation(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError("Username already exists", 400);
  }

  user.password = await bcrypt.hash(user.password, 10);

  const createUser = await prismaClient.user.create({
    data: user,
    select: {
      username: true,
      email: true,
      roles: true,
    },
  });
  return createUser;
};

const login = async (request) => {
  const loginRequest = validation(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError("User or password incorrect!", 401);
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError("User or password incorrect!", 401);
  }

  const token = uuid().toString();
  return prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      username: user.username,
    },
    select: {
      token: true,
      username: true,
      email: true,
      roles: true,
    },
  });
};

const getUser = async (username) => {
  username = validation(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
    select: {
      user_id: true,
      username: true,
      email: true,
      roles: true,
    },
  });

  if (!user) {
    throw new ResponseError("user is not found", 404);
  }

  return user;
};

const update = async (request) => {
  const user = validation(updateUserValidation, request);

  const totalUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (totalUser !== 1) {
    throw new ResponseError("user is not found", 404);
  }

  const data = {};
  if (user.email) {
    data.email = user.email;
  }
  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }
  if (user.roles) {
    data.roles = user.roles;
  }
  return prismaClient.user.update({
    data: data,
    where: {
      username: user.username,
    },
    select: {
      username: true,
      email: true,
      roles: true,
    },
  });
};

const logout = async (username) => {
  username = validation(getUserValidation, username);
  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      token: true,
    },
  });
  if (!user) {
    throw new ResponseError("user is not found", 404);
  }
  return prismaClient.user.update({
    data: {
      token: null,
    },
    where: {
      username: user.username,
    },
    select: {
      username: true,
    },
  });
};

export default { register, login, getUser, update, logout };
