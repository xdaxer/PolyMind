import Iyzipay from "iyzipay";
import dotenv from "dotenv";
import UserModel from "../../Models/schemas/user.schema.js";
import formatDate from "../../utils/fotmatDate.js";
dotenv.config();

const IYZIPAY_API_KEY = process.env.IYZIPAY_API_KEY;
const SECRET_KEY = process.env.SECRET_KEY;
const IYZIPAY_API_URI = process.env.IYZIPAY_API_URI;

if (!IYZIPAY_API_KEY) {
  throw new Error("IYZIPAY_API_KEY environment variable is not set!");
}

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY environment variable is not set!");
}

if (!IYZIPAY_API_URI) {
  throw new Error("IYZIPAY_API_URI environment variable is not set!");
}

const iyzipay = new Iyzipay({
  apiKey: IYZIPAY_API_KEY,
  secretKey: SECRET_KEY,
  uri: IYZIPAY_API_URI,
});

const paymentController = async (req, res) => {
  const { paymentCard, city, name, surname, gsmNumber, address } = req.body;

  const userID = req.user.userID;

  const user = await UserModel.findOne({ _id: userID });

  const userAddress = {
    contactName: name,
    country: "Turkey",
    city: city,
    address: address,
    zipCode: "10000",
  };

  const request = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: "123456789",
    price: "400",
    paidPrice: "400",
    currency: Iyzipay.CURRENCY.TRY,
    installment: "1",
    basketId: "1",
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: paymentCard,
    buyer: {
      id: user._id,
      name: name,
      surname: surname,
      gsmNumber: gsmNumber,
      email: user.email,
      identityNumber: "11111111111",
      lastLoginDate: formatDate(user.lastLoginDate),
      registrationDate: formatDate(user.registrationDate),
      registrationAddress: address,
      ip: req.ip,
      city: city,
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: userAddress,
    billingAddress: userAddress,
    basketItems: [
      {
        id: "1",
        name: "Polymind Chatbot",
        category1: "Üyelik",
        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
        price: "400",
      },
    ],
  };

  iyzipay.payment.create(request, async(err, result) => {
    if (err) {
      return res.json(err);
    }
    if (result.status === "success") {
      user.subscription.plan = "premium";
      user.subscription.startDate = new Date();
      user.subscription.endDate = new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      );
      user.subscription.status = "active";

      await user.save();
    } else {
 
    }
    return res.json(result);
  });
};

export default paymentController;
