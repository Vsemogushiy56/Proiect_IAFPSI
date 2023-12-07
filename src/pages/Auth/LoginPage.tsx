import { authApi } from "../../API/api.ts";
import { Button, Form, Input } from "antd";
import { FieldType } from "./RegisterPage.tsx";
import { useNavigate } from "react-router-dom";
import "./style123.css";


const LoginPage = () => {
  const navigate = useNavigate();
  const onFinish = async (e: HTMLFormElement) => {
    const { email, password } = e;
    try {
      const response = await authApi.login({ email, password });
      localStorage.setItem("token", response.data);
      navigate("/u/home");
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
        minHeight: "80vh",
        
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
      <div className="login-form">
        <h1 style={{marginLeft:"8px",}}>Login</h1>
        </div>
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
              <Button  className ="button" type="primary" htmlType="submit" >
                
                Submit
              </Button>
              <Button   className="register-button"type="text" onClick={() => navigate("/register")}>
                Register
              </Button>

            </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
    
    </div>
  
    </div>
   
  );
  
};

export default LoginPage;
