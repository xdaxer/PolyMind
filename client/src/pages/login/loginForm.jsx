import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PolyMindContext } from "../../context/context";

function LoginForm() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useContext(PolyMindContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.daxer.dev/polymind/auth/login",
        {
          email: emailOrUsername,
          username: emailOrUsername,
          password,
        }
      );
      setToken(response.data.token);
      navigate("/");
    } catch (err) {
      setError("Giriş bilgileri hatalı.");
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
            htmlFor="emailOrUsername"
            className="text-sm text-neutral-400 font-bold"
          >
            Email veya Kullanıcı Adı
          </label>
          <input
            type="text"
            id="emailOrUsername"
            placeholder="Email yada kullanıcı adınızı girin"
            className="border-white border-b p-3 text-white w-[100%] bg-transparent"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
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
      </div>

      <button className="bg-[#1313ec] text-white px-4 py-2 rounded-md mt-8 w-full cursor-pointer">
        Giriş Yap
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="text-sm mt-4">
        Hesabınız yok mu?{" "}
        <a href="/register" className="text-[#1313ec]">
          Kayıt Ol
        </a>
      </p>
    </form>
  );
}

export default LoginForm;
