import createArticleValidation from "../validation/articleValidation.js";
import { validation } from "../validation/validation.js";

const create = async (request) => {
  const article = validation(createArticleValidation, request);

  const createArticle = await prismaClient.article.create({
    data: article,
    select: {
      id: true,
      title: true,
      content: true,
      description: true,
      category: true,
    },
  });
  return createArticle;
};

export default { create };
