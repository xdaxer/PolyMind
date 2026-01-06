import React, { useContext, useState } from "react";
import { PolyMindContext } from "../../context/context";

function InputBox() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [title, setTitle] = useState("");
  const [customMode, setCustomMode] = useState(false);
  const [instrumental, setInstrumental] = useState(false);
  const [mv, setMv] = useState("V5");

  const { generateMusic, generatePrompt } = useContext(PolyMindContext);

  const handleGeneratePrompt = async () => {
    if (prompt.trim() === "") return;
    const newPrompt = await generatePrompt({ prompt });
    setPrompt(newPrompt);
  };

  const handleSend = () => {
    if (prompt.trim() === "") return;
    generateMusic({
      prompt,
      style,
      title,
      custom_mode: customMode,
      instrumental,
      mv,
    });
  };

  return (
    <div className="mt-10 w-full gap-4 p-10 flex flex-col items-center justify-center border-t border-t-[#1313ec50]">
      <div className="w-[70%] flex gap-4">
        <input
          type="text"
          className="w-full bg-[#18181B] rounded-xl p-4 px-3 border border-[#ffffff10] text-white focus:outline-none"
          placeholder="Bir müzik oluşturmak için bir şeyler yazın..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
         <button
          onClick={handleGeneratePrompt}
          className="bg-[#1313ec] text-white justify-center flex items-center p-3 cursor-pointer rounded-full hover:opacity-80 transition-all duration-300"
        >
          <span className="material-symbols-outlined">wand_stars</span>
        </button>
        <button
          onClick={handleSend}
          className="bg-[#1313ec] text-white justify-center flex items-center p-3 cursor-pointer rounded-full"
        >
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  );
}

export default InputBox;
