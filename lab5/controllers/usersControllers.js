import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import validate from "../util/userValidations.js";

let user_id = 0;

export async function getUsers(req, res) {
  try {
    const users = await userModel.find();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

export async function getUser(req, res) {
  try {
    const user = await userModel.findOne({ id: req.params.id });
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

export async function signup(req, res) {
  try {
    req.body.id = user_id;
    const email = req.body.email.toLowerCase();
    const valid = validate(req.body);
    if (!valid) return res.status(400).json(validate.errors);

    const found = await userModel.findOne({
      email: email,
    });

    if (found) return res.status(400).send("A user  with the same email exist");

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    req.body.password = hashedPassword;
    req.body.email = email;

    await userModel.create(req.body);

    ++user_id;

    return res.status(200).send(`user is created successfully`);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

export async function login(req, res) {
  try {
    const email = req.body.email.toLowerCase();

    const found = await userModel.findOne({
      email: email,
    });
    if (!found) return res.status(400).send("Can't find the user");

    const matchedPassword = await bcrypt.compare(
      req.body.password,
      found.password
    );

    if (!matchedPassword)
      return res.status(400).send("Please Check Your Credentials");

    return res.status(200).send("Logged in successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
}

export async function deleteUser(req, res) {
  try {
    await userModel.findOneAndDelete({ id: req.params.id });
    return res.status(200).send("user deleted successfully");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

export async function updateUser(req, res) {
  req.body.id = +req.params.id;
  const valid = validate(req.body);
  if (!valid) return res.status(400).json(validate.errors);
  try {
    await userModel.findOneAndUpdate({ id: req.params.id }, req.body);
    return res.status(200).send("user updated successfully");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}
