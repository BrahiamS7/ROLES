import { useEffect, useState } from "react";
import { getPerfil } from "../api/usuarios";
import TaskCard from "../components/TaskCard";
import Navbar from "../components/Navbar";
import {
  addTarea,
  getTareas,
  deleteTarea,
  actualizarTarea,
} from "../api/tareas";
import { useNavigate } from "react-router-dom";

function User() {
  const [perfil, setPerfil] = useState(null);
  const [estado, setEstado] = useState("");
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [msg, setMsg] = useState("");
  const [id, setId] = useState("");
  const [descrip, setDescrip] = useState("");
  const navigate = useNavigate();

  const logOut = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const setTarea = async (titulo, descr, id, estado) => {
    setTitulo(titulo);
    setDescrip(descr);
    setId(id);
    setEstado(estado);
  };
  const actTarea = async () => {
    const data = await actualizarTarea({ titulo, descrip, id, estado });
    setMsg(data.body.msg);
    setTimeout(() => {
      setMsg("");
    }, 3000);
  };

  const borrarTarea = async (id) => {
    await deleteTarea({ id });
    const dataTareas = await getTareas({ id: perfil?.id });
    console.log("info:" + dataTareas);
    setTareas(dataTareas.body.tareas);
  };

  const agregarNota = async (e) => {
    e.preventDefault();
    const response = await addTarea({ titulo, descrip, id: perfil?.id });
    const data = response.body;
    setTitulo("");
    setDescrip("");
    setMsg(data.msg);
    setTimeout(() => {
      setMsg("");
    }, 3000);
    const dataTareas = await getTareas({ id: perfil?.id });
    console.log("info:" + dataTareas);
    setTareas(dataTareas.body.tareas);
  };

  const cancelarAct = () => {
    setDescrip("");
    setTitulo("");
  };

  useEffect(() => {
    const fetchPerfilYTareas = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Usuario no verificado");
        navigate("/login");
        return;
      }
      try {
        const dataPerfil = await getPerfil(token);
        setPerfil(dataPerfil.user);
        if (dataPerfil.user.rol != "usuario") {
          navigate("/admin");
          return;
        }

        const dataTareas = await getTareas({ id: dataPerfil?.user.id });
        setTareas(dataTareas.body.tareas);
      } catch (error) {
        alert("ERROR POR PARTE DEL SERVIDOR");
        console.error(error);
        navigate("/login");
      }
    };
    fetchPerfilYTareas();
  }, [navigate]);

  return (
    <div className="h-screen bg-gradient-to-b from-[#eef0f1] via-[#E6ECF5] to-[#DCE3F0] flex flex-col">
      <Navbar
              perfil={perfil}
              logOut={logOut}
            />
      <div className="full w-full flex-1 overflow-y-auto">
        <div className="bg-[#F1F3F9] m-15 p-10 rounded-xl shadow">
          <h2 className="text-xl m-3">Agregar Tarea</h2>
          <form onSubmit={agregarNota}>
            <label class="floating-label">
              <span>Titulo</span>
              <input
                type="text"
                placeholder="Titulo"
                className="input input-md m-3"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </label>
            <label class="floating-label">
              <span>Descripcion</span>
              <input
                type="text"
                placeholder="Descripcion"
                className="input input-md m-3"
                value={descrip}
                onChange={(e) => setDescrip(e.target.value)}
                required
              />
            </label>
            <input
              type="submit"
              value="Enviar"
              className="btn bg-indigo-400 m-3"
            />
          </form>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {["Pendiente", "En progreso", "Completado"].map((estado) => (
              <div key={estado} className="text-center">
                <h1 className="font-bold text-lg mb-3">{estado}</h1>
                <div className="flex flex-col items-center gap-3">
                  {tareas
                    .filter((t) => t.estado === estado)
                    .map((t) => (
                      <TaskCard
                        key={t.id}
                        tarea={t}
                        titulo={titulo}
                        setTitulo={setTitulo}
                        descrip={descrip}
                        setDescrip={setDescrip}
                        estado={estado}
                        setEstado={setEstado}
                        setTarea={setTarea}
                        borrarTarea={borrarTarea}
                        actTarea={actTarea}
                        cancelarAct={cancelarAct}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-500">{msg}</p>
        </div>
      </div>
    </div>
  );
}

export default User;
