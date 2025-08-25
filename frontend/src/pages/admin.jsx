import { useEffect, useState } from "react";
import { getPerfil, cargarUsuarios } from "../api/usuarios";
import {
  addTarea,
  getTareas,
  deleteTarea,
  actualizarTarea,
} from "../api/tareas";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [perfil, setPerfil] = useState(null);
  const [estado, setEstado] = useState("");
  const [tareas, setTareas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [msg, setMsg] = useState("");
  const [id, setId] = useState("");
  const [descrip, setDescrip] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const logOut = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const setTarea = async (titulo, descr, id, estado) => {
    setShow(true);
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
    setShow(false);
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
        console.log(dataPerfil.user.rol);

        if (dataPerfil.user.rol != "admin") {
          alert("Rol no permitido");
          navigate("/user");
          return;
        }

        const dataTareas = await getTareas({ id: dataPerfil?.user.id });
        setTareas(dataTareas.body.tareas);

        const dataUsuarios = await cargarUsuarios();
        console.log(dataUsuarios);
        setUsuarios(dataUsuarios);
      } catch (error) {
        alert("ERROR POR PARTE DEL SERVIDOR");
        console.error(error);
        navigate("/login");
      }
    };
    fetchPerfilYTareas();
  }, [navigate]);

  return (
    <>
      <h1>INTERFAZ DE ADMIN</h1>
      <button onClick={logOut}>Cerrar Sesion</button>
      {perfil ? (
        <div>
          <h2>Bienvenido {perfil.nombre}</h2>
          <p>Rol: {perfil.rol}</p>
          <p>ID: {perfil.id}</p>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
      <h2>Agregar Tarea</h2>
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
      <p>{msg}</p>

      {/* MOSTRAR USUARIOS */}
      <div>
        <h2>Lista de usuarios:</h2>
        {usuarios.length > 0 ? (
          usuarios.map((u,i)=>(
            <div key={i}>
                <h3>Nombre:</h3>
                <a href={`/user/${u.nombre}`}>{u.nombre}</a>
            </div>
          ))
        ) : (
          <h2>No hay usuarios a cargo...</h2>
        )}
      </div>

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
            <p>Estado: {estado}</p>
            <input type="submit" value="Actualizar" />
            <input
              type="button"
              value="Cancelar"
              onClick={() => cancelarAct()}
            />
          </form>
        </div>
      )}
    </>
  );
}

export default Admin;
