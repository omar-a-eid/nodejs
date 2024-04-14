import { Router } from "express";
import * as usersControllers from "../controllers/usersControllers.js";

const router = Router();

router.get("/", usersControllers.getUsers);
router.get("/:id", usersControllers.getUser);
router.put("/:id", usersControllers.updateUser);
router.delete("/:id", usersControllers.deleteUser);
router.post("/login", usersControllers.login);
router.post("/signup", usersControllers.signup);

export default router;
