import React, { useContext, useEffect } from "react";
import { Divider } from "antd";
import { SocketProvider } from "../ChatPage.tsx";
import { UserContext } from "../../Auth/AuthLayout.tsx";

export const Message: React.FC<{
  messages: any[];
  setMessages: (messages: any[]) => void;
  roomId: number;
}> = (props) => {
  const socket = useContext(SocketProvider);
  const user = useContext(UserContext);
  useEffect(() => {
    socket?.emit("joinRoom", props.roomId);
    return () => {
      socket?.emit("leaveRoom", "leaved room");
      props.setMessages([]);
    };
  }, [props.roomId]);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {props.messages.map((el, index) => {
        return (
          <div key={index}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: el.user.id === user.id ? "flex-end" : "flex-start",
                margin: "0 20px",
              }}
            >
              <h3 style={{ margin: 0 }}>{el.user.email}</h3>
              <p>{el.text}</p>
              <Divider style={{ margin: "5px" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
