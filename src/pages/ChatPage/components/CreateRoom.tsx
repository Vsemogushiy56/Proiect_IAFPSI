import { Form, Input, Modal } from "antd";
import React, { useContext } from "react";
import FormItem from "antd/es/form/FormItem";

import { SocketProvider } from "../ChatPage.tsx";
import { useForm } from "antd/es/form/Form";

export const CreateRoom: React.FC<{
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}> = ({ isOpen, setIsOpen }) => {
  const socket = useContext(SocketProvider);
  const [form] = useForm();

  const handleCreate = () => {
    form.submit();
    setIsOpen(false);
  };
  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      width={600}
      title="Create new room"
      onOk={handleCreate}
    >
      <div style={{ height: "50px", padding: "40px" }}>
        <Form
          colon={false}
          form={form}
          onFinish={(e) => {
            socket?.emit("createRoom", e.name);
          }}
        >
          <FormItem label="Room name" name="name">
            <Input />
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};
