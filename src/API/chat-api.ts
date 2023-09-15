import * as io from "socket.io-client";
import { Socket } from "socket.io-client";

const rooms = [] as RoomsType[];

let ws: Socket;

const TOKEN: string | null = localStorage.getItem("token");
const closeHandler = () => {
  setTimeout(createChannel, 3000);
};

function createChannel() {
  ws?.off("close", closeHandler);
  ws?.close();
  ws = io.connect("http://localhost:3000", {
    extraHeaders: {
      authorization: TOKEN || "",
    },
  });
  ws.on("close", closeHandler);
}
export const chatApi = {
  subscribeRoom(callback: RoomsType) {
    rooms.push(callback);
  },
};

interface IRooms {
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
}

type RoomsType = (rooms: IRooms[]) => void;
