import { useState } from "react";
import { agregarUsuario } from "../api/usuarios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [contra, setContra] = useState("");
  const [msg, setMsg] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await agregarUsuario({ nombre, contra });
      const data=response.body
      const status=response.status
      setNombre("");
      setContra("");
      setMsg(data.msg)
      setTimeout(()=>{
        setMsg("")
      },5000)
      if(status!=200){
        navigate("/register")
        return
      }
      if (data.token) {
        localStorage.setItem("token",data.token)
        alert("registrado exitosamente");
        navigate("/home");
      } else {
        alert("Error registrando");
        navigate("/register");
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
        <button type="submit">Enviar</button>
      </form>
      <a href="/login">Log In</a>
      <p>
        {msg}
      </p>
    </div>
  );
}
