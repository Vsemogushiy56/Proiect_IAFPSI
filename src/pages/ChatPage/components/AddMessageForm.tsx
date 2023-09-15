import { Button, Form, FormInstance, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useContext } from "react";
import { UserContext } from "../../Auth/AuthLayout.tsx";
import { SocketProvider } from "../ChatPage.tsx";
export const AddMessageForm: React.FC<{
  roomId: number;
  form: FormInstance;
}> = (props) => {
  const user = useContext(UserContext);
  const socket = useContext(SocketProvider);

  const handleSubmit = (e: { message: string }) => {
    socket?.emit("sendMessage", {
      text: e.message,
      userId: user.id,
      roomId: props.roomId,
    });
    props.form.resetFields();
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <Form form={props.form} onFinish={handleSubmit}>
        <FormItem name="message">
          <Input />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Send message
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};
