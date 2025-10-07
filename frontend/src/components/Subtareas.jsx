import { useEffect } from "react";
import { getSubtareas, addSubtarea } from "../api/proyectos";
import { useState } from "react";

export default function Subtareas({ idP }) {
  const [subtareas, setSubtareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descrip, setDescrip] = useState("");
  const [prior, setPrior] = useState("");

  const addSubtareas = async () => {
    setTitulo("");
    setDescrip("");
    setPrior("");

    await addSubtarea({ titulo, descrip, prior, id: idP });
  };

  useEffect(() => {
    const getSubtarea = async () => {
      const data = await getSubtareas(idP);
      setSubtareas(data.body);
    };
    getSubtarea();
  }, []);

  return (
    <div className="bg-[#F2F2F2] mx-7 my-10 p-10 rounded-xl shadow">
      <div className="flex items-center justify-between">
        <h2 className="mb-6 text-[#6B7280]">Tareas del Proyecto:</h2>
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          Añadir tarea
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form onSubmit={addSubtareas} method="dialog">
              <h3>Añadir Tarea</h3>
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
              <label className="floating-label m-3">
                <select
                  defaultValue="Escoger prioridad"
                  onChange={(e) => setPrior(e.target.value)}
                  className="select"
                >
                  <option disabled={true}>Escoger prioridad</option>
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Poca">Poca</option>
                </select>
              </label>
              <input
                type="submit"
                value="Enviar"
                className="btn bg-[#0511F2] text-white m-3"
              />
            </form>
          </div>
        </dialog>
      </div>
      <div className="flex flex-col gap-6">
        {subtareas.length > 0 ? (
          subtareas.map((t, i) => (
            <div className="flex" key={i}>
              <div className="flex flex-col">
                <h2 className="ml-7 text-indigo-900">{t.titulo}</h2>
                <h2 className="ml-7">{t.descripcion}</h2>
              </div>
              <div className="items-center flex ml-10 flex-1">
                <div className="flex">
                  <h2 className="font-bold">
                    Asignado a:{" "}
                    <span className="font-normal">{t.usuario_id}</span>
                  </h2>
                  <h2 className="ml-10 font-bold flex text-start">
                    Estado: <span className="font-normal">{t.estado}</span>
                  </h2>
                </div>
                <div className="dropdown dropdown-top ml-5">
                  <div tabIndex={0} role="button" className="btn m-1">
                    ⬆️
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                  >
                    <li>
                      <a>Editiar tarea</a>
                    </li>
                    <li>
                      <a>Eliminar del proyecto</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay tareas que mostrar...</p>
        )}
      </div>
    </div>
  );
}
