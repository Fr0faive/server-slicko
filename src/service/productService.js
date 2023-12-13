import {
  createProductValidation,
  getProductByIdValidation,
  updateProductValidation,
} from "../validation/productValidation.js";
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
  id = validation(getProductByIdValidation, id);
  const product = await prismaClient.products.findUnique({
    where: {
      product_id: id,
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
    orderBy: {
      product_id: "asc",
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

const updateProduct = async (id, dataProduct) => {
  id = validation(getProductByIdValidation, id);
  const product = validation(updateProductValidation, dataProduct);
  const updateProduct = await prismaClient.products.update({
    where: {
      product_id: id,
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

const delProduct = async (id) => {
  id = validation(getProductByIdValidation, id);
  const product = await prismaClient.products.delete({
    where: {
      product_id: id,
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

export default {
  create,
  getProductById,
  getProductAll,
  updateProduct,
  delProduct,
};
