import { Router } from "express";
import * as itemsController from "../controllers/itemsControllers.js";

const router = Router();

router.get("/", itemsController.getItems);
router.post("/", itemsController.createItem);
router.get("/:id", itemsController.getItem);
router.put("/:id", itemsController.updateItem);
router.delete("/:id", itemsController.deleteItem);

export default router;
