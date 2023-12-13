import productService from "../service/productService.js";

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock } = req.body;
    const imagePath =
      "https://" + req.get("host") + "/" + req.file.path.replace("\\", "/");
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
    const productData = {
      name,
      description,
      price,
      stock,
    };
    const result = await productService.updateProduct(
      req.params.productId,
      productData
    );
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const delProduct = async (req, res, next) => {
  try {
    const result = await productService.delProduct(req.params.productId);
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
  delProduct,
};
