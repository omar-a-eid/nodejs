import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  id: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  items: [{ type: Number, required: true }],
});

export default mongoose.model("Order", orderSchema);
