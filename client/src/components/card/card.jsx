import React, { useState } from "react";

function Card({ from, message, onClick, isDimmed, isSelected }) {
  const isLoading = message === "loading";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (message && !isLoading) {
      navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    }
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-md bg-[#27272A] flex-1 mx-2 flex flex-col min-h-[150px] justify-between`}
    >
      <div
        className={`transition-opacity duration-300 ${
          isDimmed ? "opacity-50" : ""
        }`}
      >
        <div className="flex items-center mb-2">
          <img src={`/${from}.png`} alt={from} className="w-7 h-7 mr-2" />
          <b className="capitalize text-primary">{from}</b>
        </div>
        {isLoading ? (
          <div className="space-y-2">
            <div className="w-full h-4 bg-gray-500 rounded animate-pulse"></div>
            <div className="w-5/6 h-4 bg-gray-500 rounded animate-pulse"></div>
            <div className="w-3/4 h-4 bg-gray-500 rounded animate-pulse"></div>
          </div>
        ) : (
          <p className="">{message}</p>
        )}
      </div>
      <div className="flex mt-4">
        <button
          className="m-2 bg-[#3B82F6] flex-1 cursor-pointer rounded-md p-2 text-white disabled:opacity-50"
          disabled={isLoading || isDimmed || isSelected}
          onClick={onClick}
        >
          {isSelected ? "Seçildi" : "Cevabı Seç"}
        </button>
        <button
          className="m-2 bg-[#3B82F6] cursor-pointer rounded-md p-2 text-white disabled:opacity-50"
          disabled={isLoading}
          onClick={handleCopy}
        >
          {copied ? "Kopyalandı!" : "Kopyala"}
        </button>
      </div>
    </div>
  );
}

export default Card;
