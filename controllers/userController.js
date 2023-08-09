import Users from "../models/users.js";

const userControllers = {
  create: async (req, res) => {
    const { pseudo, email, password } = req.body;
    try {
      if (!pseudo && !email && !password) {
        res.status(400).send({ error: "Missing informations to create user" });
      } else {
        await Users.create({
          pseudo,
          email,
          password,
        });
      }
      res.status(201).send({ success: true });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = Users.findById(id).select("pseudo email isAdmin library");

      if (!user) {
        res.status(404).send({ error: "User not found" });
      } else {
        res.status(200).send(user);
      }
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
};

export default userControllers;
