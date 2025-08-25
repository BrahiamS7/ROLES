import React, { useEffect } from "react";
import { getPerfil } from "../api/usuarios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
      if (!token) {
        alert("Usuario no verificado");
        navigate("/login");
        return;
      }
    const conseguirPerfil = async () => {
      const data = await getPerfil(token);
      console.log(data);
      if (data.user.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    };
    conseguirPerfil();
  }, []);

  return <div>Home</div>;
}
