import { createProductValidation } from "../validation/productValidation.js";
import { validation } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";

const create = async (request) => {
  const product = validation(createProductValidation, request);

  const createProduct = await prismaClient.products.create({
    data: product,
    select: {
      product_id: true,
      name: true,
      price: true,
      description: true,
      image: true,
      stock: true,
    },
  });
  return createProduct;
};

const getProductById = async (id) => {
  const idInt = parseInt(id);
  const product = await prismaClient.products.findUnique({
    where: {
      product_id: idInt,
    },
    select: {
      product_id: true,
      name: true,
      price: true,
      description: true,
      image: true,
      stock: true,
    },
  });
  return product;
};

const getProductAll = async () => {
  const products = await prismaClient.products.findMany({
    select: {
      product_id: true,
      name: true,
      price: true,
      description: true,
      image: true,
      stock: true,
    },
  });
  return products;
};

const getProductByName = async (name) => {
  const products = await prismaClient.products.findMany({
    where: {
      name: {
        contains: name,
      },
    },
    select: {
      product_id: true,
      name: true,
      price: true,
      description: true,
      image: true,
      stock: true,
    },
  });
  return products;
};

export default { create, getProductById, getProductAll, getProductByName };
