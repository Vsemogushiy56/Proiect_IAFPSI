import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Welcome to the best online chat</h1>
        <Button type="default" onClick={() => navigate("/u/chat")}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
