//#region imports
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import itemsRouter from "./routers/itemsRouters.js";
import ordersRouter from "./routers/ordersRouters.js";
import usersRouter from "./routers/usersRouters.js";

//#endregion

const app = express();
const PORT = process.env.PORT || 8080;
mongoose.connect("mongodb://localhost:27017/lab5");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//#region routes
app.use("/api/items", itemsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/users", usersRouter);
//#endregion

app.listen(PORT, () => {
  console.log(`Server is  running on port: ${PORT}`);
});
