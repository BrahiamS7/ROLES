import { useEffect } from "react";
import { getSubtareas, addSubtarea, actSubtarea } from "../api/proyectos";
import { useState } from "react";
import { getProyUsers } from "../api/proyectos";

export default function Subtareas({ idP }) {
  const [subtareas, setSubtareas] = useState([]);
  const [proyU, setProyU] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descrip, setDescrip] = useState("");
  const [prior, setPrior] = useState("");
  const [userId, setUserId] = useState("");

  const addSubtareas = async () => {
    setTitulo("");
    setDescrip("");
    setPrior("");

    await addSubtarea({ titulo, descrip, prior, id: idP });t
  };

  useEffect(() => {
    const getSubtarea = async () => {
      const data = await getSubtareas(idP);
      setSubtareas(data.body);
    };
    const getUsers = async () => {
      const data = await getProyUsers(idP);
      const users = data.body.data;
      setProyU(users);
    };

    getUsers();
    getSubtarea();
  }, []);
  const unAct = async () => {
    setTitulo("");
    setDescrip("");
    setPrior("");
    setUserId("");
  };
  const setAct = async () => {
    document.getElementById("my_modal_3").showModal();
  };
   const actSubT = async (idT) => {
    console.log(titulo,descrip,prior,userId,idT);
    await actSubtarea(titulo,descrip,prior,userId,idT)
  };
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
            <h3 className="font-bold text-lg">Añadir Tarea</h3>
            <form onSubmit={addSubtareas} method="dialog">
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
                      <a onClick={() => setAct()}>Editar tarea</a>
                    </li>
                    <li>
                      <a>Eliminar del proyecto</a>
                    </li>
                  </ul>
                </div>
                {/* MODAL PARA EDITAR SUBTAREA */}
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Editar tarea</h3>
                    <form onSubmit={()=>actSubT(t.id)} method="dialog">
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
                      <label className="floating-label m-3">
                        <select
                          defaultValue="Asignar a"
                          onChange={(e) => setUserId(e.target.value)}
                          className="select"
                        >
                          <option disabled={true}>Asignar a</option>
                          {proyU.map((u, i) => (
                            <div key={i}>
                              <option value={u.id}> {u.nombre} </option>
                            </div>
                          ))}
                        </select>
                      </label>
                      <input
                        type="submit"
                        value="Enviar"
                        className="btn bg-[#0511F2] text-white m-3"
                      />
                    </form>
                    <div className="modal-action">
                      <form method="dialog">
                        <button className="btn" onClick={() => unAct()}>
                          Close
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
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
