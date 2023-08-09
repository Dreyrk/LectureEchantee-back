import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const hashPassword = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (hashedPassword) {
      req.body.password = hashedPassword;
      next();
    } else {
      res.status(400).send({ error: "failed to hash password" });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

export default hashPassword;
