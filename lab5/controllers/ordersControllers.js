import orderModel from "../models/orderModel.js";
import validate from "../util/ordersValidation.js";

let order_id = 0;

export async function getOrders(req, res) {
  try {
    const orders = await orderModel.find();
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

export async function getOrder(req, res) {
  try {
    const order = await orderModel.findOne({ id: req.params.id });
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

export async function createOrder(req, res) {
  try {
    req.body.id = order_id;
    const valid = validate(req.body);
    if (!valid) return res.status(400).json(validate.errors);

    await orderModel.create(req.body);

    ++order_id;

    return res.status(200).send(`order is created successfully`);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

export async function deleteOrder(req, res) {
  try {
    await orderModel.findOneAndDelete({ id: req.params.id });
    return res.status(200).send("Order deleted successfully");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

export async function updateOrder(req, res) {
  req.body.id = +req.params.id;
  const valid = validate(req.body);
  if (!valid) return res.status(400).json(validate.errors);
  try {
    await orderModel.findOneAndUpdate({ id: req.params.id }, req.body);
    return res.status(200).send("Order updated successfully");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}
