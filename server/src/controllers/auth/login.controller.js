import UserModel from "../../Models/schemas/user.schema.js";
import bcrypt from "bcrypt";
import generateToken from "../../utils/generateToken.js";

const loginController = async (req, res) => {
  const { username, password, email } = req.body;

  if ((!username || !email) && !password) {
    return res
      .status(400)
      .json({ message: "Kullanıcı adı ve şifre zorunludur." });
  }

  const user = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res
      .status(401)
      .json({ message: "Kullanıcı adı veya şifre hatalı." });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res
      .status(401)
      .json({ message: "Kullanıcı adı veya şifre hatalı." });
  }

  const token = await generateToken(user);

  user.lastLoginDate = new Date();
  await user.save();

  res.json({
    message: "Giriş başarılı.",
    token,
    username: user.username,
    email: user.email,
  });
};

export default loginController;
