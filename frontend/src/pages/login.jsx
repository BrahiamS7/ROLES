import { useState } from "react";
import { loginU } from "../api/usuarios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [contra, setContra] = useState("");
  const [msg, setMsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginU({ nombre, contra });
      const data = response.body;
      const status = response.status;
      setNombre("");
      setContra("");
      setMsg(data.msg);
      
      if (status != 200) {
        alert(data.msg);
        navigate("/login");
        return;
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login exitoso");
        navigate("/home");
      } else {
        alert("Error en el login");
        navigate("/login");
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
        <button type="submit">Enviar</button>
      </form>
      <a href="/register">Registrarse</a>
      <p>{msg}</p>
    </div>
  );
}
