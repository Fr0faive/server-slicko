import { prismaClient } from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    return res.status(401).json({
      errors: "Unauthorized 1",
    });
  } else {
    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
    });
    if (!user) {
      return res.status(401).json({
        errors: "Unauthorized 2",
      });
    } else {
      req.user = user;
      next();
    }
  }
};
