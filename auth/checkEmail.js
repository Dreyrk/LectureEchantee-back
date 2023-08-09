import Users from "../models/users.js";

const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const isUserFind = Boolean(await Users.findOne({ email: email }));
  if (!isUserFind || !req.body.password) {
    res.status(BAD_REQUEST).send({ error: "Bad email or empty password" });
  } else {
    req.user = await Users.findOne({ email: email });
    next();
  }
};

export default checkEmail;
