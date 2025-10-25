import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Models/db.js";
import authRouter from "./routes/auth.route.js";
import paymentRouter from "./routes/payment.route.js";

dotenv.config();
await connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.set("trust proxy", true);

app.use("/auth", authRouter);
app.use("/payment", paymentRouter);

app.listen(PORT, () => {
  console.log(`Server is Runing http://localhost:${PORT}`);
});
