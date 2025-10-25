const checkSubscriptionDate = (req, res, next) => {
  const user = req.user;

  if (user.subscription.status === "active") {
    const endDate = new Date(user.subscription.endDate);
    const now = new Date();

    if (now > endDate) {
      user.subscription.status = "inactive";
      user.save();
      return res
        .status(403)
        .json({ message: "Aboneliğinizin süresi dolmuştur." });
    }
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Aktif bir aboneliğiniz bulunmamaktadır." });
  }
};

export default checkSubscriptionDate;
