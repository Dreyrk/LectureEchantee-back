import Manhwa from "../models/manhwa.js";
import isValid from "../utils/isValid.js";

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

    if (!isValid(id)) {
      res.status(400).send({ error: "Bad or fake mongo id" });
      return;
    }

    try {
      const data = await Manhwa.findById(id);
      if (!data._id && isValid(id)) {
        res.status(404).send({ error: "Manhwa not found" });
      } else {
        res.status(200).send({ data });
      }
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
  getRandom: async (req, res) => {
    try {
      const count = await Manhwa.countDocuments();
      const randomIndex = Math.floor(Math.random() * count);

      const data = await Manhwa.findOne().skip(randomIndex);

      res.status(200).send({ data });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
  getByRating: async (req, res) => {
    try {
      const data = await Manhwa.find().sort({ rating: -1 }).limit(10);

      if (!data) {
        res.status(404).send({ error: "Manhwa not found" });
      } else {
        res.status(200).send({ data });
      }
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
  getByTitle: async (req, res) => {
    try {
      const data = await Manhwa.find().sort({ title: 1 }).limit(10);

      if (!data) {
        res.status(404).send({ error: "Manhwa not found" });
      } else {
        res.status(200).send({ data });
      }
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
  getOngoing: async (req, res) => {
    try {
      const data = await Manhwa.find({ status: "Ongoing" }).sort({
        rating: -1,
      });

      if (!data) {
        res.status(404).send({ error: "Manhwa not found" });
      } else {
        res.status(200).send({ data });
      }
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
  getCompleted: async (req, res) => {
    try {
      const data = await Manhwa.find({ status: "Completed" }).sort({
        rating: -1,
      });

      if (!data) {
        res.status(404).send({ error: "Manhwa not found" });
      } else {
        res.status(200).send({ data });
      }
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
  getByFilters: async (req, res) => {
    let query = {};
    if (!req.query.order) {
      query = { ...req.query };
    } else if (req.query.status) {
      query = { ...query, status: req.query.status };
    } else if (req.query.genre) {
      query = { ...query, genre: req.query.genre };
    }
    try {
      const data = await Manhwa.find(query).sort({});
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
  create: async (req, res) => {
    const { newManhwa } = req.body;
    try {
      if (
        !newManhwa.title ||
        !newManhwa.status ||
        !newManhwa.synopsis ||
        !newManhwa.author ||
        !newManhwa.genre ||
        !newManhwa.chapters[0] ||
        !newManhwa.cover
      ) {
        res.status(400).send({ error: "Missing informations" });
      } else {
        await Manhwa.create(newManhwa);
        res.status(201).send({ message: "Created" });
      }
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
};

export default manwhaControllers;
