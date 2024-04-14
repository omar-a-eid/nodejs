import mongoose from "mongoose";
const { Schema } = mongoose;

const itemSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String },
});

export default mongoose.model("Item", itemSchema);
