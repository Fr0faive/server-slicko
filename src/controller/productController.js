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

export default { createProduct };
