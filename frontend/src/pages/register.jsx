import { useState } from "react";
import { agregarUsuario } from "../api/usuarios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [contra, setContra] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data=await agregarUsuario({ nombre, contra });
      setNombre("");
      setContra("");
      console.log(data);
      
      if(data.status===200){
        navigate("/home")
      } else {
          navigate("/register")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
        <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contra}
          onChange={(e) => setContra(e.target.value)}
        />
        <button type="submit">Envair</button>
      </form>
      <a href="/login">Log In</a>
    </div>
  );
}
