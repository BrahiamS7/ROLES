import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home.jsx";
import Register from "../pages/register.jsx";
import Login from "../pages/login.jsx";
import Admin from "../pages/admin.jsx";
import User from "../pages/user.jsx";
import UserDetalle from "../pages/userDetalle.jsx";
import Pruebas from "../pages/prueba.jsx";
import InfoProyectos from "../components/InfoProyectos.jsx";
import ProyectoDetail from "../components/ProyectoDetail.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/user" element={<User />} />
      <Route path="/user/:nombre" element={<UserDetalle />} />
      <Route path="/proyecto/:id" element={<ProyectoDetail />} />
      <Route path="/prueba" element={<Pruebas/>}/>
    </Routes>
  );
}
