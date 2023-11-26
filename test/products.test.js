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
