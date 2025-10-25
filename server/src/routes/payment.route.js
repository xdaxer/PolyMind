import express from "express";
import paymentController from "../controllers/payment/payment.controller.js";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.post("/", checkToken, paymentController);

export default router;
