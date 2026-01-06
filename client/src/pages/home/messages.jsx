import React, { useContext } from "react";
import Card from "../../components/card/card";
import MessageBox from "./messageBox";
import { PolyMindContext } from "../../context/context";
 
function Messages() {
  const { messages, selectMessage, activeChatId, loading, chats } =
    useContext(PolyMindContext);

  const activeChat = chats.find((chat) => chat.chatID === activeChatId);
  const title = activeChat ? activeChat.title : "Yeni Sohbet";

  return (
    <>
      <div className="w-full p-4 overflow-auto">
        <h1 className="text-2xl font-bold">{title}</h1>
        {messages.map((turn, index) => {
          const isAnySelected = turn.responses.some((r) => r.isSelected);

          return (
            <div key={index} className="mb-8">
              <MessageBox message={turn.user} />

              <div className="flex justify-center items-start mt-4">
                {turn.responses
                  .filter((response) => !response.isDeleted)
                  .map((response, responseIndex) => {
                    return (
                      <Card
                        key={responseIndex}
                        from={response.llm}
                        message={response.response}
                        onClick={() =>
                          selectMessage({
                            chatID: activeChatId,
                            messageID: response._id,
                          })
                        }
                        isDimmed={isAnySelected && !response.isSelected}
                        isSelected={response.isSelected}
                      />
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Messages;
