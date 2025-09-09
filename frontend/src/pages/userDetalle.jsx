import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import TaskCard from "../components/TaskCard";
import Navbar from "../components/Navbar";
import { cargarUsuario, getPerfil } from "../api/usuarios";
import {
  getTareas,
  addTarea,
  actualizarTarea,
  deleteTarea,
} from "../api/tareas";

export default function UserDetalle() {
  //USES
  const { nombre } = useParams();
  const [perfil, setPerfil] = useState({});
  const [user, setUser] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descrip, setDescrip] = useState("");
  const [estado, setEstado] = useState("");
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // FUNCIONES
  const actTarea = async () => {
    const data = await actualizarTarea({ titulo, descrip, id, estado });
    setMsg(data.body.msg);
    setTimeout(() => {
      setMsg("");
    }, 3000);
  };

  const borrarTarea = async (id) => {
    await deleteTarea({ id });
    const dataTareas = await getTareas({ id: user[0]?.id });
    console.log("info:" + dataTareas);
    setTareas(dataTareas.body.tareas);
  };

  const cancelarAct = () => {
    setDescrip("");
    setTitulo("");
  };

  const setTarea = async (titulo, descr, id, estado) => {
    setTitulo(titulo);
    setDescrip(descr);
    setId(id);
    setEstado(estado);
  };

  const agregarNota = async (e) => {
    e.preventDefault();

    const response = await addTarea({ titulo, descrip, id: user[0]?.id });
    const data = response.body;
    setTitulo("");
    setDescrip("");
    setMsg(data.msg);
    setTimeout(() => {
      setMsg("");
    }, 3000);
    const dataTareas = await getTareas({ id: user[0]?.id });
    console.log("info:" + dataTareas);
    setTareas(dataTareas.body.tareas);
  };
  const logOut = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  //USE EFFECT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuario no verificado");
      navigate("/login");
      return;
    }
    const getUsers = async () => {
      const data = await cargarUsuario(nombre);
      setUser(data);
    };

    const getTareasU = async () => {
      const data = await cargarUsuario(nombre);
      const id = data[0].id;
      const dataT = await getTareas({ id });
      setTareas(dataT.body.tareas);
    };
    const dataPerfil = async () => {
      const data = await getPerfil(token);

      setPerfil(data.user);
    };

    dataPerfil();
    getUsers();
    getTareasU();
  }, []);

  return (
    <div>
      <div className="h-screen bg-gradient-to-b from-[#eef0f1] via-[#E6ECF5] to-[#DCE3F0] flex flex-col">
        <Navbar
                perfil={perfil}
                logOut={logOut}
              />
        <div className="full w-full flex-1 overflow-y-auto">
          <a href="/home" className="btn bg-[#0511F2] ml-15 mt-4 text-amber-50 w-26">
          Volver
        </a>
          <div className="bg-[#F1F3F9] m-15 p-10 rounded-xl shadow">
            <h2 className="mb-6 text-[#6B7280]">Trabajor</h2>
            <div className="flex justify-between">
              <div className="flex">
                <div
                  tabindex="0"
                  role="button"
                  class="btn btn-ghost btn-circle avatar w-20 h-20"
                >
                  <div class="rounded-full ">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h2 className="ml-7 text-[#6B7280]">Operario</h2>
                  <h2 className="ml-7">{user[0]?.nombre}</h2>
                </div>
              </div>
              <div class="fab self-end">
                <button class="btn btn-lg btn-circle text-white bg-[#0511F2]">+</button>
              </div>
            </div>
          </div>
          <div className="bg-[#F1F3F9] m-15 p-10 rounded-xl shadow">
            <h2 className="text-xl m-3">Agregar Tarea a {user[0]?.nombre}:</h2>
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
                className="btn bg-[#0511F2] text-white m-3"
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

            <p>{msg}</p>
          </div>
        </div>
      </div>

      <p>{msg}</p>
    </div>
  );
}
