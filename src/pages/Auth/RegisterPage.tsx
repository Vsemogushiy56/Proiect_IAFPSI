import { Button, Form, Input } from "antd";
import { authApi } from "../../API/api.ts";
import { useNavigate } from "react-router-dom";
import "./style123.css";
export type FieldType = {
  id: number;
  username?: string;
  password?: string;
  email?: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const onFinish = async (e: HTMLFormElement) => {
    const { email, password, username } = e;
    try {
      const response = await authApi.register({ email, password, username });
      if (response.status > 200 && response.status < 300) {
        navigate("/login");
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="container">
  <div className="image-container"></div>
    
        <div className="form-container">
        <h1 style={{marginLeft:"40px"}}>Register</h1>
        <div className="email-form">
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          colon={false}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div className="button-container">
              <Button className = "button" type="primary" htmlType="submit">
                Submit
              </Button>
              <Button className= "existing-button" type="text" onClick={() => navigate("/login")}>
                Already Exists
              </Button>
            </div>
            </div>
          </Form.Item>
        </Form>
        </div>
      </div>
    </div>
  
    </div>
    </div>
    
  );
};


export default RegisterPage;
