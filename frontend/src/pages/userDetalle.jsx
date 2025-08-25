import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { cargarUsuario } from "../api/usuarios";
import { getTareas } from "../api/tareas";

export default function UserDetalle() {
  const { nombre } = useParams();
  const [user, setUser] = useState([]);
  const [tareas, setTareas] = useState([])
  const navigate=useNavigate();
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
    const getTareasU=async()=>{
        const data = await cargarUsuario(nombre);
        const id=data[0].id
        const dataT=await getTareas({id});
        setTareas(dataT.body.tareas)
    }
    
    getUsers();
    getTareasU();
  }, []);
  return (
    <div>
      <h3>Usuario:</h3>
      {user.length>0?(
        user.map((u,i)=>(
        <div key={i}>
            <h2>Nombre:</h2>
            <p>{u.nombre}</p>
        </div>
      ))
      ):(
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
                  
                >
                  Borrar Tarea
                </button>
                <button
                  
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
    </div>
  );
}
