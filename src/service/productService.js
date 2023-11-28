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

const updateProduct = async (id, product) => {
  const idInt = parseInt(id);
  const updateProduct = await prismaClient.products.update({
    where: {
      product_id: idInt,
    },
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
  return updateProduct;
};

const deleteProduct = async (id) => {
  const idInt = parseInt(id);
  const deleteProduct = await prismaClient.products.delete({
    where: {
      product_id: idInt,
    },
  });
  return deleteProduct;
};

export default {
  create,
  getProductById,
  getProductAll,
  getProductByName,
  updateProduct,
};
