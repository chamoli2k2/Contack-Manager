import { Router } from "express";
import { registerUser, currentUser, loginUser } from "../controllers/user.controller.js";
import validateToken from "../middleware/validateToken.middleware.js";

const router = Router();

router.post("/register",registerUser)

router.post("/login",loginUser)

router.get("/current",validateToken,currentUser)

export default router;