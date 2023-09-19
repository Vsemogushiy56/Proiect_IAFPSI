import { Chat } from "./components/Chat.tsx";
import * as io from "socket.io-client";
import { createContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export const SocketProvider = createContext({} as Socket | undefined);

const ChatPage = () => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const TOKEN: string | null = localStorage.getItem("token");
    const socketChannel: Socket = io.connect("https://8ba1-89-28-84-178.ngrok-free.app", {
      extraHeaders: {
        "ngrok-skip-browser-warning": "69420",
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
