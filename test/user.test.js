import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import {
  createTestArticle,
  createTestUser,
  getTestUser,
  removeTestUser,
  removeTestArticle,
} from "./test-utils";
import bcrypt from "bcrypt";

describe("POST /api/users", function () {
  afterEach(async () => {
    await removeTestUser();
  });

  it("should create a new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test",
      email: "test@test.com",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("test@test.com");
    // expect(result.body.data.password).toBeUndefined();
  });

  it("should reject if invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      email: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if username already exists", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test",
      email: "test@test.com",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test",
      email: "test@test.com",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/users/login", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can login", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test",
    });
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");
  });

  it("should reject if invalid", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "",
      password: "",
    });
    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject login if password is wrong", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "salah",
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject login if username is wrong", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "salah",
      password: "salah",
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can get current user", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
  });

  it("should reject if token is wrong", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATCH /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can update current user", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        password: "faikar",
        email: "faikar@test.com",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.email).toBe("faikar@test.com");

    const user = await getTestUser();
    expect(user.email).toBe("faikar@test.com");
    expect(await bcrypt.compare("faikar", user.password)).toBe(true);
  });

  it("should can update current user without password", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        email: "faikar@test.com",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.email).toBe("faikar@test.com");
  });

  it("should can update current user without email", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        password: "faikar",
      });

    expect(result.status).toBe(200);
    const user = await getTestUser();
    expect(await bcrypt.compare("faikar", user.password)).toBe(true);
  });

  it("should reject if invalid", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        password: "",
        email: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if token is wrong", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "salah")
      .send({
        password: "faikar",
        email: "faikar@test.com",
      });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });
  it("should can logout", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    const user = await getTestUser();
    expect(user.token).toBe(null);
  });

  it("should reject if token is wrong", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/articles", function () {
  beforeEach(async () => {
    await createTestArticle();
  });

  afterEach(async () => {
    await removeTestArticle();
  });

  it("should can create article", async () => {
    const result = await supertest(web)
      .post("/api/articles")
      .set("Authorization", "test")
      .send({
        title: "test",
        content: "test",
        description: "test",
        category: "test",
      });
    expect(result.status).toBe(200);
    expect(result.body.data.title).toBe("test");
  });
});
