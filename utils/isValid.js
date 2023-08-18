import mongoose from "mongoose";

function isValid(id) {
  return (
    mongoose.isValidObjectId(id) &&
    new mongoose.Types.ObjectId(id).toHexString() === id
  );
}

export default isValid;
