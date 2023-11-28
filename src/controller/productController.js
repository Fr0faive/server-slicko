import productService from "../service/productService.js";

const createProduct = async (req, res, next) => {
  try {
    const result = await productService.create(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const result = await productService.getProductById(req.params.id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getProductAll = async (req, res, next) => {
  try {
    const result = await productService.getProductAll();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getProductByName = async (req, res, next) => {
  try {
    const result = await productService.getProductByName(req.params.name);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const result = await productService.update(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const result = await productService.delete(req.params.id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  createProduct,
  getProductById,
  getProductAll,
  getProductByName,
  updateProduct,
  deleteProduct,
};
