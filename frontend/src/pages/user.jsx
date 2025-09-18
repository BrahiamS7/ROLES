import { useEffect, useState } from "react";
import { getPerfil } from "../api/usuarios";
import TaskCard from "../components/TaskCard";
import Home from "../components/Home";
import Asidebar from "../components/Asidebar";
import Tareas from "../components/Tareas";
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
  const [activeTab, setActiveTab] = useState("home");

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
    <div className="h-screen bg-white flex">
      {/* SIDEBAR */}
      <Asidebar rol={perfil} setActiveTab={setActiveTab} />

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Navbar perfil={perfil} logOut={logOut} />
        {activeTab === "home" && <Home />}

        {activeTab === "tareas" && (
          <Tareas
            tareas={tareas}
            agregarNota={agregarNota}
            msg={msg}
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
        )}
      </div>
    </div>
  );
}

export default User;
