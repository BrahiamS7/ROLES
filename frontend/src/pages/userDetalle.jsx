import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { cargarUsuario,getPerfil} from "../api/usuarios";
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
  const [user, setUser] = useState({});
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descrip, setDescrip] = useState("");
  const [estado, setEstado] = useState("");
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
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
    setShow(false);
  };

  const setTarea = async (titulo, descr, id, estado) => {
    setShow(true);
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
      <div class="navbar bg-base-100 shadow-sm">
        <div class="flex-1">
          <a class="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div class="flex-none">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
              <div class="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />{" "}
                </svg>
                <span class="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div
              tabindex="0"
              class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
            >
              <div class="card-body">
                <span class="text-lg font-bold">8 Items</span>
                <span class="text-info">Subtotal: $999</span>
                <div class="card-actions">
                  <button class="btn btn-primary btn-block">View cart</button>
                </div>
              </div>
            </div>
          </div>
          <div class="dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="btn btn-ghost btn-circle avatar"
            >
              <div class="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a class="justify-between">
                  Perfil
                  <span class="badge">New</span>
                </a>
              </li>
              <li>
                <a>Configuracion</a>
              </li>
              <li>
                <button>Cerrar Sesion</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="dropdown dropdown-end ml-2">
          <div tabindex="0" class="flex flex-col">
            <p className="text-base">{perfil?.nombre}</p>
            <p className="text-xs text-gray-400">ID:{perfil?.id}</p>
          </div>
        </div>
      </div>
      <a href="/home">Volver</a>
      <h2>Agregar tarea a usuario: </h2>
      <form onSubmit={agregarNota}>
        <input
          type="text"
          placeholder="Titulo de la tarea"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripcion"
          value={descrip}
          onChange={(e) => setDescrip(e.target.value)}
          required
        />
        <input type="submit" value="Enviar" />
      </form>
      {user.length > 0 ? (
        user.map((u, i) => (
          <div key={i}>
            <h2>Usuario:</h2>
            <p>{u.nombre}</p>
            <p>{u.id}</p>
          </div>
        ))
      ) : (
        <p>No hay informacion dispónible .-.</p>
      )}

      {/* TAREAS */}
      {tareas.length > 0 ? (
        <p>
          {tareas.map((t, i) => (
            <div
              className={
                t.estado === "Pendiente"
                  ? "pendiente"
                  : t.estado === "Completado"
                  ? "completada"
                  : "progreso"
              }
              key={i}
            >
              <h3>TAREA: {t.titulo}</h3>
              <p>DESCRIPCION: {t.descripcion}</p>
              <p>ESTADO: {t.estado}</p>
              <div>
                <button
                  onClick={() => {
                    borrarTarea(t.id);
                  }}
                >
                  Borrar Tarea
                </button>
                <button
                  onClick={() => {
                    setTarea(t.titulo, t.descripcion, t.id, t.estado);
                  }}
                >
                  Actualizar Tarea
                </button>
              </div>
            </div>
          ))}
        </p>
      ) : (
        <p>No hay tareas disponibles...</p>
      )}
      {/* MODAL */}
      {show && (
        <div>
          <h2>Actualizar Tarea</h2>
          <form onSubmit={actTarea}>
            <input
              type="text"
              placeholder="Titulo de la tarea"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Descripcion"
              value={descrip}
              onChange={(e) => setDescrip(e.target.value)}
              required
            />
            <input type="number" placeholder="ID" value={id} readOnly hidden />
            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="Pendiente">Pendiente</option>
              <option value="En progreso">En progreso</option>
              <option value="Completado">Completado</option>
            </select>
            <input type="submit" value="Actualizar" />
            <input
              type="button"
              value="Cancelar"
              onClick={() => cancelarAct()}
            />
          </form>
        </div>
      )}
      <p>{msg}</p>
    </div>
  );
}
