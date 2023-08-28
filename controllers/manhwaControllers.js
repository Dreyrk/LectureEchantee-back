import Manhwa from "../models/manhwa.js";
import generateFilters from "../utils/generateFilters.js";
import generateSort from "../utils/generateSort.js";
import isValid from "../utils/isValid.js";

const manwhaControllers = {
  getAll: async (req, res) => {
    try {
      const filters = generateFilters(req.query);
      const sort = generateSort(req.query);
      const count = await Manhwa.count(filters);
      const data = await Manhwa.find(filters).sort(sort);

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
  getPromoted: async (req, res) => {
    try {
      const data = await Manhwa.find({ promoted: true })
        .sort({ rating: -1 })
        .limit(4);

      if (!data) {
        res.status(404).send({ error: "Manhwa not found" });
      } else {
        res.status(200).send({ data });
      }
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
  promote: async (req, res) => {
    const { id } = req.params;
    try {
      if (isValid(id)) {
        const manhwaToUpdate = await Manhwa.findById(id);

        if (manhwaToUpdate.promoted) {
          manhwaToUpdate.promoted = false;
        } else {
          manhwaToUpdate.promoted = true;
        }

        await manhwaToUpdate.save();

        res.status(200).send({ success: true });
      } else {
        res.status(404).send({ error: "Manhwa not found" });
      }
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
  create: async (req, res) => {
    const newManhwa = req.body;
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
        const manhwaCreated = await Manhwa.create(newManhwa);
        res.status(201).send({ message: "Created", data: manhwaCreated });
      }
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      if (isValid(id)) {
        await Manhwa.findByIdAndRemove(id);
        res.status(204).send({ success: true });
      } else {
        res
          .status(400)
          .send({ error: "missing or incorrect id", success: false });
      }
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
  editChapters: async (req, res) => {
    const { id } = req.params;
    const newChapters = req.body.chapters;

    try {
      if (isValid(id) && newChapters) {
        const manhwaToUpdate = await Manhwa.findById(id);

        manhwaToUpdate.chapters.push(...newChapters);

        await manhwaToUpdate.save();

        res.status(200).send({ data: manhwaToUpdate });
      }
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
  editInfos: async (req, res) => {
    const { id } = req.params;
    const { status, rating, comment } = req.body;

    try {
      if (isValid(id)) {
        const manhwaToUpdate = await Manhwa.findById(id);

        if (status) {
          manhwaToUpdate.status = status;
        }
        if (rating) {
          manhwaToUpdate.rating = rating;
        }
        if (comment) {
          manhwaToUpdate.comments.push(comment);
        }

        await manhwaToUpdate.save();

        res.status(200).send({ success: true, data: manhwaToUpdate });
      } else if (!isValid(id)) {
        res.status(400).send({ error: "Invalid or missing id" });
      }
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
};

export default manwhaControllers;
