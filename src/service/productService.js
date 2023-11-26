import { createProductValidation } from "../validation/productValidation.js";
import { validation } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";

const create = async (request) => {
  const product = validation(createProductValidation, request);

  const createProduct = await prismaClient.products.create({
    data: product,
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      image: true,
      stock: true,
    },
  });
  return createProduct;
};

export default { create };
