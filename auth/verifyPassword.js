import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import Users from "../models/users.js";

const verifyPassword = async (req, res) => {
  try {
    const { password, email } = req.body;
    const hashedPassword = req.user.password;

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
      const loggedUser = await Users.findOne({ email }).select("-password");
      const payload = {
        id: req.user._id,
        email: req.user.email,
        pseudo: req.user.pseudo,
        isAdmin: req.user.isAdmin,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "12h",
        algorithm: "HS256",
      });
      if (!token) {
        res.status(500).send({ error: "Failed to sign jwt" });
      } else {
        res.status(200).send({ user: loggedUser, token });
      }
    } else {
      res.status(401).send({ error: "Invalid password" });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

export default verifyPassword;
