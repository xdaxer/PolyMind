import React, { useContext } from "react";
import SidebarButton from "./button/sidebarButton";
import { Link } from "react-router-dom";
import { PolyMindContext } from "../../context/context";

function Sidebar({ isOpen, setIsOpen }) {
  const { user, chats, newChat, logout } = useContext(PolyMindContext);

  return (
    <div
      className={`fixed inset-0 bg-[#121212] z-50 md:static md:bg-transparent transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } md:opacity-100 md:pointer-events-auto`}
      onClick={() => setIsOpen(false)}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`py-4 flex flex-col bg-[#1818B] h-full border-r border-[#ffffff10] w-full md:w-72 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="top w-full flex flex-col gap-y-5 px-2">
          <div className="flex justify-between items-center ml-[15%]">
            <img src="/logo.svg" alt="" className="w-30 text-primary" />
            <button className="md:hidden" onClick={() => setIsOpen(false)}>
              <span class="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/">
              <SidebarButton onClick={newChat}>
                <span class="material-symbols-outlined text-xl">add</span>
                <span>Yeni Sohbet</span>
              </SidebarButton>
            </Link>

            <Link to="/image">
              <SidebarButton>
                <span class="material-symbols-outlined text-xl">
                  add_photo_alternate
                </span>
                <span>Görsel Oluştur</span>
              </SidebarButton>
            </Link>
            <Link to="/video">
              <SidebarButton>
                <span class="material-symbols-outlined text-xl">
                  video_camera_back_add
                </span>{" "}
                <span>Video Oluştur</span>
              </SidebarButton>
            </Link>
            <Link to="/music">
              <SidebarButton>
                <span class="material-symbols-outlined text-xl">
                  music_note
                </span>{" "}
                <span>Müzik Oluştur</span>
              </SidebarButton>
            </Link>
            <SidebarButton>
              <span class="material-symbols-outlined text-xl">settings</span>
              <span>Ayarlar</span>
            </SidebarButton>
          </div>
        </div>
        <span className="text-center my-5">Geçmiş Sohbetler</span>
        <div className="overflow-y-auto flex-1 flex flex-col gap-y-2 gap-4">
          {chats &&
            chats.map((chat) => {
              return (
                <Link to={`/chat/${chat.chatID}`} key={chat.chatID}>
                  <SidebarButton>
                    <span>{chat.title}</span>
                  </SidebarButton>
                </Link>
              );
            })}
        </div>
        {user && (
          <div className="p-[10px] border-t border-[#ffffff10]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                  className="w-10 h-10 rounded-full bg-gray-500"
                />
                <div className="flex flex-col">
                  <span className="text-white font-semibold">
                    {user.username}
                  </span>
                  <span className="text-gray-400 text-sm">{user.email}</span>
                </div>
              </div>
              <button onClick={logout} className="text-white cursor-pointer">
                <span class="material-symbols-outlined">logout</span>
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

export default Sidebar;
