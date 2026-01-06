import React from "react";

function MessageBox({ message }) {
  return (
    <>
      <div className="bg-[#1313ec] rounded-xl px-4 py-2  text-white self-end rounded-br-none w-max max-w-[80%] ml-auto mr-5 my-3">
        <p>{message}</p>
      </div>
    </>
  );
}

export default MessageBox;
