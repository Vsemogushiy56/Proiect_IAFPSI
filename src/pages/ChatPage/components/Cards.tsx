import { Card, Tag } from "antd";
import { RoomsType } from "./Chat.tsx";
import React, { useState } from "react";

export const Cards: React.FC<{
  rooms: RoomsType[];
  setRoomId: (id: number) => void;
}> = ({ rooms, setRoomId }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null,
  );

  const handleCardClick = (index: number) => {
    setSelectedCardIndex(index);
    setRoomId(rooms[index].id);
  };
  return rooms.map((room, index) => {
    const isSelected = selectedCardIndex === index;

    return (
      <Card
        style={{ margin: "20px 20px 20px 10px" }}
        hoverable
        onClick={() => {
          handleCardClick(index);
          setRoomId(room.id);
        }}
        key={index}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {room.id} {room.name}
          </div>
          {isSelected && <Tag color="green">Active</Tag>}
        </div>
      </Card>
    );
  });
};
