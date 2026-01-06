import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PolyMindContext } from "../../context/context";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useContext(PolyMindContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Şifreler uyuşmuyor.");
      return;
    }
    try {
      const response = await axios.post(
        "https://api.daxer.dev/polymind/auth/register",
        {
          username,
          email,
          password,
        }
      );
      setToken(response.data.token);
      navigate("/");
    } catch (err) {
      setError("Kayıt başarısız oldu. Lütfen tekrar deneyin.");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex justify-center items-center flex-col"
    >
      <div className="w-full  items-center flex flex-col gap-y-4">
        <div className="flex flex-col  w-full ">
          <label
            htmlFor="username"
            className="text-sm text-neutral-400 font-bold"
          >
            Kullanıcı Adı
          </label>
          <input
            type="text"
            id="username"
            placeholder="Kullanıcı adınızı girin"
            className="border-white border-b p-3 text-white w-[100%] bg-transparent"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col  w-full ">
          <label htmlFor="email" className="text-sm text-neutral-400 font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email adresinizi girin"
            className="border-white border-b p-3 text-white w-[100%] bg-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col  w-full ">
          <label
            htmlFor="password"
            className="text-sm text-neutral-400 font-bold"
          >
            Şifre
          </label>
          <input
            type="password"
            id="password"
            placeholder="Şifrenizi girin"
            className="border-white border-b p-3 text-white w-[100%] bg-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col  w-full ">
          <label
            htmlFor="confirmPassword"
            className="text-sm text-neutral-400 font-bold"
          >
            Şifreyi Onayla
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Şifrenizi tekrar girin"
            className="border-white border-b p-3 text-white w-[100%] bg-transparent"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <button className="bg-[#1313ec] text-white px-4 py-2 rounded-md mt-8 w-full cursor-pointer">
        Kayıt Ol
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="text-sm mt-4">
        Hesabınız var mı?{" "}
        <a href="/login" className="text-[#1313ec]">
          Giriş Yap
        </a>
      </p>
    </form>
  );
}

export default RegisterForm;
