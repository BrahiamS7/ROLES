import { useState } from "react";
import { agregarUsuario, agregarAdmin } from "../api/usuarios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [contra, setContra] = useState("");
  const [token, setToken] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(token.length);
      if (token.length === 0) {
        const response = await agregarUsuario({ nombre, contra });
        const data = response.body;
        const status = response.status;
        setNombre("");
        setContra("");
        setMsg(data.msg);
        setTimeout(() => {
          setMsg("");
        }, 5000);
        if (status != 200) {
          navigate("/register");
          return;
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
          alert("registrado exitosamente");
          navigate("/home");
        } else {
          alert("Error registrando");
          navigate("/register");
        }
      } else {
        const response = await agregarAdmin({ nombre, contra, key: token });
        const data = response.body;
        const status = response.status;
        setNombre("");
        setContra("");
        setToken("");
        setMsg(data.msg);
        setTimeout(() => {
          setMsg("");
        }, 5000);
        if (status != 200) {
          navigate("/register");
          return;
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
          alert("registrado exitosamente");
          navigate("/home");
        } else {
          alert("Error registrando");
          navigate("/register");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label class="floating-label">
          <span>Nombre</span>
          <input
            type="text"
            placeholder="Nombre"
            class="input input-md m-3"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>

        <label class="floating-label">
          <span>Contraseña</span>
          <input
            type="password"
            placeholder="Contraseña"
            class="input input-md m-3"
            value={contra}
            onChange={(e) => setContra(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn bg-indigo-400 m-3" >Enviar</button>
        <button type="button" className="btn bg-indigo-400 m-3"  onClick={() => setShow(true)}>
          Admin
        </button>
      </form>
      <a href="/login">Log In</a>
      <p>{msg}</p>

      {/* MODAL */}
      {show && (
        <div>
          <h3>Ingrese su token: </h3>
          <input
            type="text"
            value={token}
            placeholder="Token"
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
