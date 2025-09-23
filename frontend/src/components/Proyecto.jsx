import { useEffect, useState } from "react";
import {
  getProyectInfo,
  addProyect,
  deleteProyect,
  actualizarProyect,
} from "../api/proyectos";
import { useNavigate } from "react-router-dom";

export default function Proyecto(id) {
  const [proyecto, setProyecto] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descrip, setDescrip] = useState("");
  const [estado, setEstado] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const agregarProyecto = async (e) => {
    e.preventDefault();
    await addProyect({ id, titulo, descrip, file });
    setTitulo("");
    setDescrip("");
    document.getElementById("my_modal_1").close();
    const data = await getProyectInfo(id);
    setProyecto(data.body.proyectos);
  };

  const borrarProy = async (id) => {
    await deleteProyect({ id });
    navigate("/home");
  };

  const setProy = (titulo, descrip, estado) => {
    setTitulo(titulo);
    setDescrip(descrip);
    setEstado(estado);
  };

  const actProy = async () => {
    
    const data = await actualizarProyect({ titulo, descrip, id:id.id, estado, file });

    const dataProy = await getProyectInfo({ id });
    setProyecto(data.body.proyectos);
    setTitulo("");
    setDescrip("");
    setFile(null);
    setEstado("");
    setProyecto(dataProy.body.proyectos[0]);
  };

  useEffect(() => {
    const proyectoInfo = async () => {
      const data = await getProyectInfo({ id });
      setProyecto(data.body.proyectos[0]);
    };
    proyectoInfo();
  }, []);
  return (
    <div>
      <div className="bg-[#F2F2F2] mx-7 my-10 p-10 rounded-xl shadow">
        <h2 className="mb-6 text-[#6B7280]">Proyecto:</h2>
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
                  src={
                    proyecto?.imagen
                      ? proyecto.imagen
                      : "http://localhost:3001/uploads/defaultproyecto.png"
                  }
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="ml-7 text-indigo-900">{proyecto?.titulo}</h2>
              <h2 className="ml-7">{proyecto?.descripcion} </h2>
              <h2 className="ml-7">{proyecto?.estado} </h2>
            </div>
          </div>

          <div class="fab self-end">
            <div className="dropdown dropdown-top dropdown-end ">
              <div
                tabIndex={0}
                role="button "
                className="btn btn-lg btn-circle text-white bg-gradient-to-bl from-indigo-900 to-indigo-600 m-1"
              >
                +
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <a
                    className=""
                    onClick={() => {
                      document.getElementById(`modal_update_${id}`).showModal();
                      setProy(
                        proyecto?.titulo,
                        proyecto?.descripcion,
                        proyecto?.estado,
        
                        id
                      );
                    }}
                  >
                    Editar
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      document.getElementById(`modal_borrar_${id}`).showModal()
                    }
                  >
                    Eliminar
                  </a>
                </li>
              </ul>
            </div>

            {/* MODAL PARA EDITAR EL PROYECTO */}
            <dialog id={`modal_update_${id}`} className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <form onSubmit={actProy} method="dialog">
                  <h3>Actualizar proyecto</h3>
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
                  <label className="floating-label">
                    <span>Imagen</span>
                    <input
                      type="file"
                      placeholder="Imagen"
                      className="file-input input-md m-3"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                  <input
                    type="submit"
                    value="Enviar"
                    className="btn bg-[#0511F2] text-white m-3"
                  />
                </form>
              </div>
            </dialog>

            {/* MODAL PARA ELIMINAR EL PROYECTO */}
            <dialog id={`modal_borrar_${id}`} className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <form onSubmit={agregarProyecto} method="dialog">
                  <h3>Eliminar Proyecto</h3>
                  <label className="floating-label mb-10">
                    <h3>
                      ¿Estas seguro que deseas eliminar el proyecto{" "}
                      <span className="font-bold">{proyecto?.titulo}</span>?
                    </h3>
                  </label>
                  <form method="dialog">
                    <button className="btn mr-3">Cancelar</button>
                    <button
                      className="btn btn-error"
                      onClick={() => borrarProy(proyecto?.id)}
                    >
                      Eliminar
                    </button>
                  </form>
                </form>
              </div>
            </dialog>
          </div>
        </div>
      </div>

      {/* MIEMBROS */}
      <div className="bg-[#F2F2F2] mx-7 my-10 p-10 rounded-xl shadow">
        <h2 className="mb-6 text-[#6B7280]">Miembros:</h2>
        <div className="flex flex-col gap-6">
          <div className="flex">
            <div
              tabindex="0"
              role="button"
              class="btn btn-ghost btn-circle avatar w-20 h-20"
            >
              <div class="rounded-full ">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    proyecto?.imagen
                      ? proyecto.imagen
                      : "http://localhost:3001/uploads/defaultproyecto.png"
                  }
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="ml-7 text-indigo-900">Aqui va el nombre</h2>
              <h2 className="ml-7">Aqui va el cargo</h2>
            </div>
            <div className="items-center justify-center flex  flex-1">
              <h2 className="font-bold">
                Trabajando en: <span className="font-normal">Hacer x cosa</span>
              </h2>
              <h2 className="ml-10 font-bold">
                Estado: <span className="font-normal">Pendiente</span>
              </h2>
            </div>
          </div>
          <div className="flex">
            <div
              tabindex="0"
              role="button"
              class="btn btn-ghost btn-circle avatar w-20 h-20"
            >
              <div class="rounded-full ">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    proyecto?.imagen
                      ? proyecto.imagen
                      : "http://localhost:3001/uploads/defaultproyecto.png"
                  }
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="ml-7 text-indigo-900">{proyecto?.titulo}</h2>
              <h2 className="ml-7">{proyecto?.descripcion} </h2>
              <h2 className="ml-7">{proyecto?.estado} </h2>
            </div>
          </div>
        </div>
      </div>

      {/* SUBTAREAS */}
      <div className="bg-[#F2F2F2] mx-7 my-10 p-10 rounded-xl shadow">
        <h2 className="mb-6 text-[#6B7280]">Tareas del Proyecto:</h2>
        <div className="flex flex-col gap-6">
          <div className="flex">
            <div className="flex flex-col">
              <h2 className="ml-7 text-indigo-900">
                Aqui va el nombre de la tarea
              </h2>
              <h2 className="ml-7">Aqui va la descripcion</h2>
            </div>
            <div className="items-start justify-center flex  flex-1">
              <h2 className="font-bold">
                Asignado a: <span className="font-normal">Hacer x cosa</span>
              </h2>
              <h2 className="ml-10 font-bold">
                Estado: <span className="font-normal">Pendiente</span>
              </h2>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col">
              <h2 className="ml-7 text-indigo-900">
                Aqui va el nombre de la tarea
              </h2>
              <h2 className="ml-7">Aqui va la descripcion</h2>
            </div>
            <div className="items-start justify-center flex  flex-1">
              <h2 className="font-bold">
                Asignado a: <span className="font-normal">Hacer x cosa</span>
              </h2>
              <h2 className="ml-10 font-bold">
                Estado: <span className="font-normal">Pendiente</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
