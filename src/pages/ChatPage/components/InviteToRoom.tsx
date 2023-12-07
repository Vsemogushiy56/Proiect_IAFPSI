import { Form, Modal, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import FormItem from "antd/es/form/FormItem";
import { userApi } from "../../../API/api.ts";
import { FieldType } from "../../Auth/RegisterPage.tsx";
import { SocketProvider } from "../ChatPage.tsx";
import { useForm } from "antd/es/form/Form";


export const InviteToRoom: React.FC<{
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  roomId: number;
}> = ({ isOpen, setIsOpen, roomId }) => {
  const socket = useContext(SocketProvider);
  const [users, setUsers] = useState<FieldType[]>([]);
  const [form] = useForm();
  useEffect(() => {
    const getUsers = async () => {
      const response = await userApi.getAll();
      setUsers(response.data?.data);
    };
    getUsers();
  }, []);

  const handleCreate = () => {
    form.submit();
    setIsOpen(false);
  };
  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      width={600}
      title={`Add user to room: ${roomId}`}
      onOk={handleCreate}
    >
      <div style={{ height: "50px", padding: "40px" }}>
        <Form
          colon={false}
          form={form}
          onFinish={(e) => {
            socket?.emit("addToRoom", {
              roomId: roomId,
              userId: users.filter((user) => e.user === user.id)[0].id,
            });
          }}
        >
          <FormItem label="Select users" name="user">
            <Select
              options={users.map((el: FieldType) => {
                return { label: el.username, value: el.id };
              })}
            />
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};
