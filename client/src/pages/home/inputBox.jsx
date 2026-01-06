import React, { useState, useContext } from "react";
import { PolyMindContext } from "../../context/context";
import Loading from "../../components/loading/loading";

function InputBox() {
  const [prompt, setPrompt] = useState("");
  const { sendMessage, activeChatId, loading, generatePrompt } =
    useContext(PolyMindContext);

  const handleSend = () => {
    if (prompt.trim() === "") return;
    sendMessage({ prompt, chatId: activeChatId });
    setPrompt("");
  };

  const handleGeneratePrompt = async () => {
    console.log("generatePrompt")
    const generatedPrompt = await generatePrompt({ prompt });
    setPrompt(generatedPrompt);
  };

  return (
    <div className="mt-10 w-full h-20 gap-4 p-10  flex items-center justify-center border-t border-t-[#1313ec50]">
      <input
        type="text"
        className="w-[70%] bg-[#18181B] rounded-xl  p-4 px-3 border border-[#ffffff10] text-white focus:outline-none"
        placeholder="PolyMind'a bir soru sorun..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={loading}
      />

      <button
        disabled={loading}
        onClick={handleGeneratePrompt}
        className="bg-[#1313ec] text-white justify-center flex items-center p-3 cursor-pointer rounded-full hover:opacity-80 transition-all duration-300"
      >
        {loading ? (
          <Loading />
        ) : (
          <span class="material-symbols-outlined">wand_stars</span>
        )}
      </button>

      <button
        onClick={handleSend}
        className="bg-[#1313ec] text-white justify-center flex items-center p-3 cursor-pointer rounded-full  hover:opacity-80 transition-all duration-300"
        disabled={loading}
      >
        {loading ? (
          <Loading />
        ) : (
          <span className="material-symbols-outlined">send</span>
        )}
      </button>
    </div>
  );
}

export default InputBox;
