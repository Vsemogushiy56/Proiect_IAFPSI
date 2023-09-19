import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import { Button, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { userApi } from "../../API/api.ts";

const user = async () => {
  const token = localStorage.getItem("token");
  return await userApi.getUser(token);
};

export interface IUser {
  id: number;
  username: string;
  email: string;
}

export const UserContext = React.createContext({} as IUser);

const AuthLayout = () => {
  const [userProfile, setUser] = useState<IUser>({
    username: "",
    id: 0,
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await user();
        setUser(res.data);
          console.log(res.data)
      } catch (e) {
        navigate("/login");
      }
    };
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={userProfile}>
      <Header
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
        }}
      >
        <div>{userProfile.email}</div>
        <div>
          <Button type="text" onClick={() => navigate("/u/chat")}>
            Chat
          </Button>
          <Button
            type="primary"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            style={{ marginLeft: "20px" }}
          >
            Logout
          </Button>
        </div>
      </Header>
      <div style={{ margin: 0 }}>
        <Divider style={{ margin: "0 0 20px 0" }} />
      </div>
      <div style={{ padding: "0 50px" }}>
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

export default AuthLayout;
