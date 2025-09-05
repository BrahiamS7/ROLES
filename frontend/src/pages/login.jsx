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
      setTimeout(() => {
        setMsg("");
      }, 5000);
      if (status != 200) {
        navigate("/login");
        return;
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center w-screen h-screen">
        <div className="w-80 h-80 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-lg flex flex-col justify-center items-center">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <label class="floating-label">
              <span>Nombre</span>
              <input
                type="text"
                placeholder="Nombre"
                class="input input-md m-3"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
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
              />
            </label>
            <button type="submit" className="btn bg-indigo-400 m-3">
              Enviar
            </button>
          </form>
          <a href="/register" className="font-medium text-indigo-400 dark:text-indigo-400 hover:underline">Registrarse</a>
          <p>{msg}</p>
        </div>
      </div>
    </div>
  );
}
