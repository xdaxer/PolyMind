import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Models/db.js";
import authRouter from "./routes/auth.route.js";
import paymentRouter from "./routes/payment.route.js";
import chatRouter from "./routes/chat.route.js";
import path from "path";
import { fileURLToPath } from "url";
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
await connectDB();

 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.set("trust proxy", true);
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(
  "/videos",
  express.static(path.join(__dirname, "public/videos"), {
    setHeaders: (res, filePath) => {
      const fileExt = path.extname(filePath);
      if (fileExt === ".mp4") {
        res.setHeader("Content-Type", "video/mp4");
      }
      res.setHeader("Content-Disposition", "inline");
    },
  })
);
app.use("/auth", authRouter);
app.use("/payment", paymentRouter);
app.use("/chat", chatRouter);

app.listen(PORT, () => {
  console.log(`Server is Runing http://localhost:${PORT}`);
});

