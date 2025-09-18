import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import TaskCard from "../components/TaskCard";
import Navbar from "../components/Navbar";
import Asidebar from "../components/Asidebar";
import Profile from "../components/profile";
import { cargarUsuario, getPerfil } from "../api/usuarios";
import {
  getTareas,
  addTarea,
  actualizarTarea,
  deleteTarea,
} from "../api/tareas";
import Tareas from "../components/Tareas";

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
    <div className="">
      <div className="h-screen bg-[white] flex flex-col">
        <Navbar perfil={perfil} logOut={logOut} />
        <div className="full w-full flex-1">
          <a
            href="/home"
            className="btn mx-8 mt-4 rounded-2xl text-[#023059] w-26"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </a>
          <Profile user={user} />
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
        </div>
      </div>

      <p>{msg}</p>
    </div>
  );
}
