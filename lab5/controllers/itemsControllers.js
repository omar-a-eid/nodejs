import itemModel from "../models/itemModel.js";
import validate from "../util/itemsValidation.js";

let item_id = 0;

export async function getItems(req, res) {
  try {
    const items = await itemModel.find();
    return res.status(200).send(items);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

export async function getItem(req, res) {
  try {
    const item = await itemModel.findOne({ id: req.params.id });
    return res.status(200).send(item);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

export async function createItem(req, res) {
  try {
    // add the id field
    req.body.id = item_id;
    //validate the data
    const valid = validate(req.body);
    if (!valid) return res.status(400).json(validate.errors);

    // check if the item is already there
    const found = await itemModel.findOne({
      name: req.body.name.toLowerCase(),
    });
    if (found) return res.status(400).send("An item  with the same name exist");

    // save()
    const newItem = await itemModel.create(req.body);
    ++item_id;
    // return a response
    return res
      .status(200)
      .send(`Item: ${newItem.name} is created successfully`);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

export async function deleteItem(req, res) {
  try {
    await itemModel.findOneAndDelete({ id: req.params.id });
    return res.status(200).send("Item deleted successfully");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

export async function updateItem(req, res) {
  req.body.id = +req.params.id;
  const valid = validate(req.body);
  if (!valid) return res.status(400).json(validate.errors);
  try {
    await itemModel.findOneAndUpdate({ id: req.params.id }, req.body);
    return res.status(200).send("Item updated successfully");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}
