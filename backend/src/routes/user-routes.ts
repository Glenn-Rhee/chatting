import express from "express";
import protectRoute from "../middleware/protect-route-middleware";
import UserController from "../controller/user-controller";

const router = express.Router();

router.get("/:token", protectRoute, UserController.getUsers)
router.get("/user/:token", protectRoute, UserController.getUser)

export default router