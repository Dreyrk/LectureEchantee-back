import mongoose from "mongoose";
import { manhwaSchema } from "./manhwa.js";

const userSchema = mongoose.Schema({
  pseudo: { type: String },
  email: { type: String },
  password: { type: String },
  isAdmin: { type: Boolean },
  avatar: { type: String },
  library: {
    manhwa: [manhwaSchema],
  },
});

const Users = mongoose.model("Users", userSchema) || mongoose.models.users;

export default Users;
