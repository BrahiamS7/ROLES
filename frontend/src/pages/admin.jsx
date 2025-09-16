import { useEffect, useState } from "react";
import { getPerfil, cargarUsuarios } from "../api/usuarios";
import TaskCard from "../components/TaskCard";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Usuarios from "../components/Usuarios";
import {
  addTarea,
  getTareas,
  deleteTarea,
  actualizarTarea,
} from "../api/tareas";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [perfil, setPerfil] = useState({});
  const [estado, setEstado] = useState("");
  const [tareas, setTareas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [titulo, setTitulo] = useState("");
  const [msg, setMsg] = useState("");
  const [id, setId] = useState("");
  const [descrip, setDescrip] = useState("");
  const navigate = useNavigate();

  const logOut = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const setTarea = (titulo, descr, id, estado) => {
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
    // Refresca tareas después de actualizar
    const dataTareas = await getTareas({ id: perfil?.id });
    setTareas(dataTareas.body.tareas);
    setTitulo("");
    setDescrip("");
    setId("");
    setEstado("");
  };

  const borrarTarea = async (id) => {
    await deleteTarea({ id });
    const dataTareas = await getTareas({ id: perfil?.id });
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
    setTareas(dataTareas.body.tareas);
  };

  const cancelarAct = () => {
    setDescrip("");
    setTitulo("");
    setId("");
    setEstado("");
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

        if (dataPerfil.user.rol !== "admin") {
          alert("Rol no permitido");
          navigate("/user");
          return;
        }

        const dataTareas = await getTareas({ id: dataPerfil?.user.id });
        setTareas(dataTareas.body.tareas);

        const dataUsuarios = await cargarUsuarios();
        setUsuarios(dataUsuarios);
      } catch (error) {
        alert("ERROR POR PARTE DEL SERVIDOR");
        console.log(error);

        navigate("/login");
      }
    };
    fetchPerfilYTareas();
  }, [navigate]);

  return (
    <div className="h-screen bg-gradient-to-b from-[#eef0f1] via-[#E6ECF5] to-[#DCE3F0] flex">
      {/* SIDEBAR */}
      <aside className="w-20 sm:w-32 md:w-48 lg:w-64 h-full bg-white shadow-lg p-2 sm:p-4 md:p-6 flex flex-col gap-4 transition-all duration-300">
        <div className="font-bold text-base sm:text-lg md:text-xl mb-4 md:mb-6 text-center">
          Panel
        </div>
        <nav className="flex flex-col gap-2">
          <a
            href="#"
            className="hover:bg-blue-100 rounded px-2 py-1 text-xs sm:text-sm md:text-base"
            onClick={() => setActiveTab("home")}
          >
            Inicio
          </a>
          <a
            href="#"
            className="hover:bg-blue-100 rounded px-2 py-1 text-xs sm:text-sm md:text-base"
            onClick={() => setActiveTab("tareas")}
          >
            Tareas
          </a>
          <a
            href="#"
            className="hover:bg-blue-100 rounded px-2 py-1 text-xs sm:text-sm md:text-base"
            onClick={() => setActiveTab("usuarios")}
          >
            Usuarios
          </a>
        </nav>
      </aside>
      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Navbar perfil={perfil} logOut={logOut} />
        {activeTab === "home" && <Home />}
        {activeTab === "usuarios" && <Usuarios usuarios={usuarios} />}
        {activeTab === "tareas" && (
          <div className="bg-[#F1F3F9] mr-8 ml-8 p-3 rounded-xl shadow">
            <h2 className="text-xl m-3">Agregar Tarea</h2>
            <form onSubmit={agregarNota}>
              <label className="floating-label">
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
              <label className="floating-label">
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
            <div className="grid grid-cols-1 mb-5 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {["Pendiente", "En progreso", "Completado"].map((estadoCol) => (
                <div key={estadoCol} className="text-center">
                  <h1 className="font-bold text-lg mb-3">{estadoCol}</h1>
                  <div className="flex flex-col items-center gap-3">
                    {tareas
                      .filter((t) => t.estado === estadoCol)
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
        )}
      </div>
    </div>
  );
}

export default Admin;
