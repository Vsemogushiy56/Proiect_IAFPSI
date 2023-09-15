import { useContext, useEffect, useState } from "react";
import { Col, FloatButton, Row } from "antd";
import { Cards } from "./Cards.tsx";
import { Messages } from "./Messages.tsx";
import { AddMessageForm } from "./AddMessageForm.tsx";
import { PlusOutlined, WechatOutlined } from "@ant-design/icons";
import { CreateRoom } from "./CreateRoom.tsx";
import { SocketProvider } from "../ChatPage.tsx";
import { useForm } from "antd/es/form/Form";
import { InviteToRoom } from "./InviteToRoom.tsx";
import style from "./style.module.css";

export interface RoomsType {
  id: number;
  name: string;
  createAt: string;
  updatedAt: string;
}

export const Chat = () => {
  const socket = useContext(SocketProvider);
  const [rooms, setRooms] = useState<RoomsType[]>([]);
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState<boolean>(false);
  const [isAddToRoomOpen, setIsAddToRoomOpen] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<number>();
  const [form] = useForm();

  useEffect(() => {
    socket?.on("rooms", (data) => {
      if (Array.isArray(data)) {
        setRooms((prev) => [...data.reverse(), ...prev.reverse()]);
      } else {
        setRooms((prev) => [data, ...prev]);
      }
    });
  }, [socket]);

  return (
    <div>
      <Row>
        <Col span={6}>
          <div>
            <h1>Rooms</h1>
          </div>
          <div className={style.cards_container} style={{ height: "70vh" }}>
            <Cards rooms={rooms} setRoomId={setRoomId} />
          </div>
        </Col>
        <Col span={16} style={{ marginLeft: "40px" }}>
          <h1>Messages</h1>
          {roomId && (
            <>
              <Messages roomId={roomId} />
              <AddMessageForm roomId={roomId} form={form} />
            </>
          )}
        </Col>
      </Row>
      <FloatButton
        style={{ right: 50, height: "40px" }}
        icon={<WechatOutlined />}
        onClick={() => setIsCreateRoomOpen(true)}
      />
      <CreateRoom isOpen={isCreateRoomOpen} setIsOpen={setIsCreateRoomOpen} />{" "}
      {roomId && (
        <>
          <FloatButton
            style={{ right: 50, bottom: 100, height: "40px" }}
            icon={<PlusOutlined />}
            onClick={() => setIsAddToRoomOpen(true)}
          />
          <InviteToRoom
            isOpen={isAddToRoomOpen}
            setIsOpen={setIsAddToRoomOpen}
            roomId={roomId}
          />
        </>
      )}
    </div>
  );
};
