import articleService from "../service/articleService.js";

const create = async (req, res, next) => {
  try {
    const result = await articleService.create(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default { create };
