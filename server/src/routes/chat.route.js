import express from "express";
import checkToken from "../middlewares/checkToken.js";
import checkSubscriptionDate from "../middlewares/checkSubscriptionDate.js";
import sendMessageController from "../controllers/chat/sendMessage.controller.js";
import selectMessageController from "../controllers/chat/selectMessage.controller.js";
import createChatController from "../controllers/chat/createChat.controller.js";
const router = express.Router();

router.post("/send", checkToken, sendMessageController);
router.post("/select", checkToken, selectMessageController);
router.post("/create", checkToken, createChatController);
export default router;
