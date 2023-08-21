import mongoose from "mongoose";

function isValid(id) {
  if (!id) {
    return false;
  } else {
    return (
      mongoose.isValidObjectId(id) &&
      new mongoose.Types.ObjectId(id).toHexString() === id
    );
  }
}

export default isValid;
