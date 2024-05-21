import express from "express";
import MessageController from "../controller/message-controller";
import protectRoute from "../middleware/protect-route-middleware";

const router = express.Router();

router.get("/conversations/:token", protectRoute, MessageController.getConversations);
router.get("/message/:token", protectRoute, MessageController.getMessage);
router.post("/send/:token", protectRoute, MessageController.sendMessage);

export default router;
