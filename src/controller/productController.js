import productService from "../service/productService.js";

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock } = req.body;
    const imagePath = req.file.path.replace("\\", "/");
    const productData = {
      name,
      description,
      price,
      stock,
      image: imagePath,
    };

    const result = await productService.create(productData);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const result = await productService.getProductById(req.params.productId);
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

const updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock } = req.body;
    const imagePath = req.file.path.replace("\\", "/");
    const productData = {
      name,
      description,
      price,
      stock,
      image: imagePath,
    };
    const result = await productService.update(req.params.id, productData);
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
  updateProduct,
  deleteProduct,
};
