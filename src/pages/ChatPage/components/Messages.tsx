import React, { useContext, useEffect, useState } from "react";
import { SocketProvider } from "../ChatPage.tsx";
import { Message } from "./Message.tsx";
import style from "./style.module.css";
export const Messages: React.FC<{ roomId: number }> = ({ roomId }) => {
  const socket = useContext(SocketProvider);

  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socket?.on("messages", (data) => {
      if (Array.isArray(data)) {
        setMessages((prev) => [...prev, ...data]);
      } else {
        setMessages((prev) => [...prev, data]);
      }
    });
  }, []);

  return (
    <div>
      <h1>Room: {roomId}</h1>
      <div className={style.cards_container}>
        <Message
          messages={messages}
          setMessages={setMessages}
          roomId={roomId}
        />
      </div>
    </div>
  );
};
