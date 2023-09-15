import { Chat } from "./components/Chat.tsx";
import * as io from "socket.io-client";
import { createContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export const SocketProvider = createContext({} as Socket | undefined);

const ChatPage = () => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const TOKEN: string | null = localStorage.getItem("token");
    const socketChannel: Socket = io.connect("http://localhost:3000", {
      extraHeaders: {
        authorization: TOKEN || "",
      },
    });
    setSocket(socketChannel);
  }, []);

  return (
    <SocketProvider.Provider value={socket}>
      <Chat />
    </SocketProvider.Provider>
  );
};

export default ChatPage;
