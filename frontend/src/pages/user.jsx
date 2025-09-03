import { useEffect, useState } from "react";
import { getPerfil } from "../api/usuarios";
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
    <>
      <h1>INTERFAZ DE USUARIO</h1>
      <button className="btn" onClick={logOut}>
        Cerrar Sesion
      </button>
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
        <label class="floating-label">
          <span>Titulo</span>
          <input
            type="text"
            placeholder="Titulo"
            value={titulo}
            class="input input-md"
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>
        <label class="floating-label">
          <span>Descripcion</span>
          <input
            type="text"
            placeholder="Descripcion"
            value={descrip}
            class="input input-md"
            onChange={(e) => setDescrip(e.target.value)}
            required
          />
        </label>

        <input type="submit" value="Enviar" className="btn"/>
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

export default User;
