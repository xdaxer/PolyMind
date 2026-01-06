import UserModel from "../../Models/schemas/user.schema.js";

const meController = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userID).select(
      "username email subscription isAdmin isBanned registrationDate lastLoginDate"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  } 
};

export default meController;
