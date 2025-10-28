import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY environment variable is not set!");
}

const generateToken = async (user) => {
  const token = jwt.sign(
    {
      userID: user._id,
      isAdmin: user.isAdmin,
    },
    SECRET_KEY,
    { expiresIn: "72h" }
  );

  return token;
};

export default generateToken;
