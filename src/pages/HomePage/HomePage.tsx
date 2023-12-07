import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./style1234.css"

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
      
        <div className="welcome-button">
          Wrybill Chat-Explorer of Connections. 
        </div>
        
        
        <Button className="bn54 button-start" type="default" onClick={() => navigate("/u/chat")}>
  <span className="bn54span">Start</span>
</Button>

        
</div>

        </div>
      
    
  );
};

export default HomePage;
