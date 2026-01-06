import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import InputBox from "./inputBox";
import Messages from "./messages";
import { PolyMindContext } from "../../context/context";
import { useParams } from "react-router-dom";

function Home() {
  const { loadChat, newChat } = useContext(PolyMindContext);
  const { chatID } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (chatID) {
      loadChat(chatID);
    } else {
      newChat();
    }
  }, [chatID]);


   
  return (
    <main className="flex h-screen bg-[#1c1c1c] text-white">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <section className="flex w-full h-full flex-col">
        <div className="md:hidden p-2 flex justify-between items-center border-b border-[#ffffff10]">
          <img src="/logo.svg" alt="" className="w-24" />
          <button onClick={() => setIsSidebarOpen(true)}>
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
         
          <div className="flex-grow overflow-auto">
            <Messages />
          </div>
       

        <InputBox />
      </section>
    </main>
  );
}

export default Home;
