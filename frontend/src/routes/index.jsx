import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home.jsx";
import Register from "../pages/register.jsx";
import Login from "../pages/login.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
