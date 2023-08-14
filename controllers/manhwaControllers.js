import Manhwa from "../models/manhwa.js";

const manwhaControllers = {
  getAll: async (req, res) => {
    try {
      const count = await Manhwa.count({});
      const data = await Manhwa.find({});

      if (!data[0]) {
        res.status(404).send({ error: "Data not found" });
      } else {
        res.status(200).send({ data, total: count });
      }
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Manhwa.findById(id);

      if (!data) {
        res.status(404).send({ error: "Manhwa not found" });
      } else {
        res.status(200).send({ data });
      }
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
};

export default manwhaControllers;
