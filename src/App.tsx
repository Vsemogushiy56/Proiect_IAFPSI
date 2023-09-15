import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/Auth/RegisterPage.tsx";
import LoginPage from "./pages/Auth/LoginPage.tsx";
import AuthLayout from "./pages/Auth/AuthLayout.tsx";
import HomePage from "./pages/HomePage/HomePage.tsx";
import ChatPage from "./pages/ChatPage/ChatPage.tsx";

const Redirect = () => {
  return <Navigate to={"/u/home"} />;
};
const App = () => {
  return (
    <Routes>
      <Route index element={<Redirect />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/u" element={<AuthLayout />}>
        <Route path="/u/home" element={<HomePage />} />
        <Route path="/u/chat" element={<ChatPage />} />
      </Route>
    </Routes>
  );
};

export default App;
