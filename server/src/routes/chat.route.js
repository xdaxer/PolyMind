import express from "express";
import checkToken from "../middlewares/checkToken.js";
import checkSubscriptionDate from "../middlewares/checkSubscriptionDate.js";
import messageController from "../controllers/chat/message.controller.js";
import selectMessageController from "../controllers/chat/selectMessage.controller.js";
import listChatsController from "../controllers/chat/listChats.controller.js";
import getChatHistoryController from "../controllers/chat/getChatHistory.controller.js";
import deleteChatController from "../controllers/chat/deleteChat.controller.js";
import generateImageController from "../controllers/chat/generateImage.controller.js";
import generateVideoController from "../controllers/chat/generateVideo.controller.js";
import promptWizardController from "../controllers/chat/promptWizard.controller.js";
import generateMusicController from "../controllers/chat/generateMusic.controller.js";
import getMusicController from "../controllers/chat/getMusic.controller.js";
import musicCallbackController from "../controllers/chat/musicCallback.controller.js";
const router = express.Router();

router.get("/", checkToken, listChatsController);
router.get("/:chatID", checkToken, getChatHistoryController);
router.post("/message", checkToken, checkSubscriptionDate, messageController);
router.post("/select", checkToken, checkSubscriptionDate, selectMessageController);
router.post("/prompt", checkToken, checkSubscriptionDate, promptWizardController);
router.delete("/delete/:chatID", checkToken, deleteChatController);
router.post(
  "/generate-image",
  checkToken,
  checkSubscriptionDate,
  generateImageController
);
router.post(
  "/generate-video",
  checkToken,
  checkSubscriptionDate,
  generateVideoController
);

router.post(
  "/music",
  checkToken,
  checkSubscriptionDate,
  generateMusicController
);
router.get("/music/:taskId", checkToken, getMusicController);
router.post("/music/callback", musicCallbackController);

export default router;