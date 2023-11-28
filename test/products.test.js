import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import {
  createTestProduct,
  createTestUser,
  removeTestUser,
  removeTestProduct,
} from "./test-utils";
import bcrypt from "bcrypt";

describe("POST /api/products", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestProduct();
    await removeTestUser();
  });

  it("should can create product", async () => {
    const result = await supertest(web)
      .post("/api/products")
      .set("Authorization", "test")
      .send({
        name: "test",
        price: 1000,
        description: "test",
        image: "test",
        stock: 10,
      });
    console.log(result.error);
    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.price).toBe(1000);
    expect(result.body.data.description).toBe("test");
    expect(result.body.data.stock).toBe(10);
    expect(result.body.data.image).toBe("test");
  });
});

describe("GET /api/products", function () {
  beforeAll(async () => {
    await createTestUser();
    await createTestProduct();
  });

  afterAll(async () => {
    await removeTestProduct();
    await removeTestUser();
  });

  it("should can get product", async () => {
    const result = await supertest(web)
      .get("/api/products")
      .set("Authorization", "test");
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data[0].name).toBe("test");
    expect(result.body.data[0].price).toBe(1000);
    expect(result.body.data[0].description).toBe("test");
    expect(result.body.data[0].stock).toBe(10);
    expect(result.body.data[0].image).toBe("test");
  });

  it.skip("should can get product by id", async () => {
    const result = await supertest(web)
      .get("/api/products/18")
      .set("Authorization", "test");
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.price).toBe(1000);
    expect(result.body.data.description).toBe("test");
    expect(result.body.data.stock).toBe(10);
    expect(result.body.data.image).toBe("test");
  });

  it("should can get product by name", async () => {
    const result = await supertest(web)
      .get("/api/products?name=test")
      .set("Authorization", "test");
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data[0].name).toBe("test");
    expect(result.body.data[0].price).toBe(1000);
    expect(result.body.data[0].description).toBe("test");
    expect(result.body.data[0].stock).toBe(10);
    expect(result.body.data[0].image).toBe("test");
  });

  it("should reject if token is wrong", async () => {
    const result = await supertest(web)
      .get("/api/products")
      .set("Authorization", "salah");
    console.log(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
