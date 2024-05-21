import express from "express";
import { AuthController } from "../controller/auth-controller";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/sign-up", AuthController.signUp);
router.post("/logout", AuthController.logout);


export default router;
