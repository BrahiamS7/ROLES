import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { cargarUsuario } from "../api/usuarios";
import {
  getTareas,
  addTarea,
  actualizarTarea,
  deleteTarea,
} from "../api/tareas";

export default function UserDetalle() {
  //USES
  const { nombre } = useParams();
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

    getUsers();
    getTareasU();
  }, []);

  return (
    <div>
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
