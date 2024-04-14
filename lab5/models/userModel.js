import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  age: { type: Number, min: [10, "Must be at least 10, got {VALUE}"] },
  address: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
