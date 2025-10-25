import UserModel from "../../Models/schemas/user.schema.js";
import bcrypt from "bcrypt";
import isValidEmail from "../../utils/isValidEmail.js";
import generateToken from "../../utils/generateToken.js";

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Kullanıcı adı, e-posta ve şifre zorunludur." });
  }

  if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({ message: "Geçerli bir e-posta adresi giriniz." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Şifre en az 6 karakter olmalıdır." });
  }

  const existingUser = await UserModel.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    return res
      .status(409)
      .json({ message: "Bu kullanıcı adı veya e-posta zaten kayıtlı." });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new UserModel({
    username: username,
    email: email,
    password: hashedPassword,
    lastLoginDate: new Date(),
    isAdmin: false,
  });

  await user.save();

  const token = await generateToken(user);

  return res.status(201).json({
    message: "Kayıt başarılı.",
    token: token,
    username: user.username,
    email: user.email,
  });
};

export default registerController;
