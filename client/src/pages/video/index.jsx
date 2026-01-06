import React, { useContext, useState } from "react";
import Sidebar from "../../components/sidebar";
import GeneratedVideos from "./GeneratedVideos";
import { PolyMindContext } from "../../context/context";
import InputBox from "./inputBox";

function Video() {
  const { videoLoading } = useContext(PolyMindContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="flex h-screen bg-[#1c1c1c] text-white">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <section className="flex w-full h-full flex-col justify-between">
        <div className="md:hidden p-2 flex justify-between items-center border-b border-[#ffffff10]">
          <img src="/logo.svg" alt="" className="w-24" />
          <button onClick={() => setIsSidebarOpen(true)}>
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
        {videoLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white text-2xl">Video oluşturuluyor...</div>
          </div>
        ) : (
          <GeneratedVideos />
        )}
        <InputBox />
      </section>
    </main>
  );
}

export default Video;
