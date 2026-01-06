import express from "express";
import registerController from "../controllers/auth/register.controller.js";
import loginController from "../controllers/auth/login.controller.js";
import meController from "../controllers/auth/me.controller.js";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", checkToken, meController);

export default router;
