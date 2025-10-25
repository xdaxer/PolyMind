import express from "express";
import checkToken from "../middlewares/checkToken.js";
import checkSubscriptionDate from "../middlewares/checkSubscriptionDate.js";
import sendMessageController from "../controllers/chat/sendMessage.controller.js";

const router = express.Router();

router.post("/send", checkToken, checkSubscriptionDate, sendMessageController);

export default router;
