import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import getUri from "./utils/getUri.js";

const uri = getUri();

async function main() {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default main;
