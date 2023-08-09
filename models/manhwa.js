import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  user: { pseudo: { type: String }, id: { type: String } },
  text: { type: String },
});

export const manhwaSchema = mongoose.Schema(
  {
    title: { type: String },
    synopsis: { type: String },
    author: { type: String },
    genre: { type: Array },
    cover: { type: String },
    chapters: { type: Array },
    rating: { type: Number },
    status: {
      type: String,
      enum: ["Ongoing", "Completed", "Dropped", "Coming Soon"],
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Manhwa = mongoose.model("manhwa", manhwaSchema) || mongoose.models.manhwa;

export default Manhwa;
