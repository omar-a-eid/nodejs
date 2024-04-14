import { Router } from "express";
import * as ordersControllers from "../controllers/ordersControllers.js";

const router = Router();

router.get("/", ordersControllers.getOrders);
router.post("/", ordersControllers.createOrder);
router.get("/:id", ordersControllers.getOrder);
router.put("/:id", ordersControllers.updateOrder);
router.delete("/:id", ordersControllers.deleteOrder);

export default router;
