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
      setTimeout(() => setMsg(""), 5000);

      if (status !== 200) {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2 text-center">
          Inicia sesión
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contra}
            onChange={(e) => setContra(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Enviar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Registrarse
          </a>
        </p>

        {msg && (
          <div className="mt-4 text-center text-sm text-red-500 font-medium">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
