import User from "../Models/schemas/user.schema.js";

const checkSubscriptionDate = async (req, res, next) => {
  try {
     const userId = req.user.userID;
    if (!userId) {
      return res.status(401).json({ message: "Yetkilendirme başarısız." });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    req.fullUser = user;

    if (user.isAdmin) {
      return next();
    }

    if (user.subscription && user.subscription.status === "active") {
      const endDate = new Date(user.subscription.endDate);
      const now = new Date();

      if (now > endDate) {
        user.subscription.status = "inactive";
        await user.save();
        return res
          .status(403)
          .json({ message: "Aboneliğinizin süresi dolmuştur." });
      }
      return next(); // Abonelik aktif, devam et
    } else {
      // Aktif abonelik yoksa, bazı yollara yine de izin verilebilir.
      // Bu kontrolü rotanın kendisine bırakmak daha esnek olabilir.
      // Şimdilik, aktif abonelik gerektiren tüm yolları engelliyoruz.
      return res
        .status(403)
        .json({ message: "Bu işlem için aktif bir abonelik gereklidir." });
    }
  } catch (error) {
    console.error("Subscription check error:", error);
    return res
      .status(500)
      .json({ message: "Sunucu hatası. Lütfen tekrar deneyin." });
  }
};

export default checkSubscriptionDate;
