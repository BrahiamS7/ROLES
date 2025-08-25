import { useEffect, useState } from "react";
import { getPerfil } from "../api/usuarios";
import {
  addTarea,
  getTareas,
  deleteTarea,
  actualizarTarea,
} from "../api/tareas";
import { useNavigate } from "react-router-dom";

function Home() {
  const [perfil, setPerfil] = useState(null);
  const [tareas, setTareas] = useState([]);
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [msg, setMsg] = useState("");
  const [id, setId] = useState("");
  const [descrip, setDescrip] = useState("");
  const [show, setShow] = useState(false);

  const logOut = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const setTarea = async (titulo, descr, id) => {
    setShow(true);
    setTitulo(titulo);
    setDescrip(descr);
    setId(id)
  };
  const actTarea=async()=>{
    const data= await actualizarTarea({titulo,descrip,id})
    setMsg(data.body.msg)
    setTimeout(()=>{
      setMsg("")
    },3000)
  }

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
            <div className="pendiente" key={i}>
              <h3 >TAREA: {t.titulo}</h3>
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
                    setTarea(t.titulo, t.descripcion, t.id);
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
            <input
              type="number"
              placeholder="ID"
              value={id}
              readOnly
            />
            <input type="submit" value="Actualizar" />
          </form>
        </div>
      )}
    </>
  );
}

export default Home;
