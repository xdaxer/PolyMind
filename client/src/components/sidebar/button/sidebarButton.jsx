import React from "react";
import { Children } from "react";

function SidebarButton({ children }) {
  return (
    <button className=" flex gap-2 w-full rounded-lg items-center py-2 px-2 hover:bg-[#3B82F650] duration-300 cursor-pointer">
      {children}
    </button>
  );
}

export default SidebarButton;
