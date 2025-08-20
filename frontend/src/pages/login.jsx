import { useState } from "react";
import { loginU,getPerfil } from "../api/usuarios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [contra, setContra] = useState("");
  const [msg, setMsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginU({ nombre, contra });
      const data = response.body;
      setNombre("");
      setContra("");
      setMsg(data.msg);

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login exitoso");
        navigate("/home");
      } else {
        navigate("/login");
        alert("Error en el login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Login</h1>
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
      <a href="/register">Registrarse</a>
      <p>{msg}</p>
    </div>
  );
}
