import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Access denied. Invalid token format." });
    }

    const token = authHeader.substring(7); // Remove "Bearer " from the beginning

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.isAdmin) {
      req.admin = true;
      next();
    } else if (!decoded.isAdmin && decoded._id) {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: `Invalid token: ${error.message}` });
  }
};

export default verifyToken;
