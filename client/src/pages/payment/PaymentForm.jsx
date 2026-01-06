import React, { useState, useContext } from "react";
import { PolyMindContext } from "../../context/context";
import axios from "axios";

function PaymentForm() {
  const { token } = useContext(PolyMindContext);
  const [card, setCard] = useState({
    cardHolderName: "",
    cardNumber: "",
    expireYear: "",
    expireMonth: "",
    cvc: "",
  });
  const [address, setAddress] = useState({
    city: "",
    name: "",
    surname: "",
    gsmNumber: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCardChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        "https://api.daxer.dev/polymind/payment",
        {
          paymentCard: card,
          ...address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        setSuccess(true);
      } else {
        setError(response.data.errorMessage);
      }
    } catch (err) {
      setError("Ödeme sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-500">Ödeme Başarılı!</h2>
        <p>Aboneliğiniz başarıyla yenilendi.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-[70%] flex flex-col mt-8"
    >
      <div>
        <h3 className="text-lg font-medium">Kart Bilgileri</h3>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <input
            type="text"
            name="cardHolderName"
            placeholder="Kart Sahibi"
            onChange={handleCardChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="cardNumber"
            placeholder="Kart Numarası"
            onChange={handleCardChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="expireYear"
            placeholder="Yıl"
            onChange={handleCardChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="expireMonth"
            placeholder="Ay"
            onChange={handleCardChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            onChange={handleCardChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Adres Bilgileri</h3>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <input
            type="text"
            name="name"
            placeholder="Ad"
            onChange={handleAddressChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="surname"
            placeholder="Soyad"
            onChange={handleAddressChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="gsmNumber"
            placeholder="Telefon Numarası"
            onChange={handleAddressChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="Şehir"
            onChange={handleAddressChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <textarea
            name="address"
            placeholder="Adres"
            onChange={handleAddressChange}
            className="w-full col-span-2 px-3 py-2 border rounded-md"
            required
          />
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Ödeniyor..." : "Ödeme Yap"}
      </button>
    </form>
  );
}

export default PaymentForm;
