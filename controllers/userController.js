import Users from "../models/users.js";

const userControllers = {
  getAll: async (req, res) => {
    const data = await Users.find({});

    res.status(200).send({ data });
  },
  create: async (req, res) => {
    const user = req.body;
    try {
      if (!user.pseudo && !user.email && !user.password) {
        res.status(400).send({ error: "Missing informations to create user" });
      } else {
        await Users.create(user);
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
  bookmark: async (req, res) => {
    const { id } = req.params;
    const manhwaBookmarked = req.body;
    try {
      const userToUpdate = await Users.findById(id);

      if (
        userToUpdate.library.manhwa.some(
          (el) => el.title === manhwaBookmarked.title
        )
      ) {
        userToUpdate.library.manhwa.filter(
          (el) => el.title !== manhwaBookmarked.title
        );
      } else {
        await userToUpdate.library.manhwa.push(manhwaBookmarked);
      }

      await userToUpdate.save();

      res.status(200).send({ success: true });
    } catch (e) {
      res.status(500).send({ error: e.message, success: false });
    }
  },
  passToAdmin: async (req, res) => {
    const isAdmin = req.admin;
    const { id } = req.params;
    try {
      if (isAdmin) {
        const userToUpdate = await Users.findById(id);
        userToUpdate.isAdmin = true;
        await userToUpdate.save();
        res.send(200).send({ success: true });
      } else if (!isAdmin) {
        res.status(401).send({
          error: "Unauthaurized. Only admin can access to this feature",
        });
      }
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
};

export default userControllers;
