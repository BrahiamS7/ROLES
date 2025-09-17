import TaskCard from "./TaskCard";

export default function Tareas({
  tareas,
  agregarNota,
  msg,
  titulo,
  setTitulo,
  descrip,
  setDescrip,
  estado,
  setEstado,
  setTarea,
  borrarTarea,
  actTarea,
  cancelarAct,
}) {
  return (
    <div className="flex-1 h-screen flex flex-col p-4 overflow-hidden">
      <div
        className="bg-[#F2F2F2] flex flex-col mr-2 mb-10 ml-2 p-4 rounded-xl shadow 
        h-screen max-h-screen overflow-y-auto"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl m-3">Tareas</h2>
          {/* BOTON MODAL FORM */}
          <button
            className="mr-5 border-1 bg-gradient-to-bl from-indigo-900 to-indigo-600 rounded-3xl p-3 text-white"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Añadir tarea
          </button>

          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Agregar Tarea</h3>
              <form onSubmit={agregarNota}>
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
                <input
                  type="submit"
                  value="Enviar"
                  className="btn bg-[#0511F2] text-white m-3"
                  onClick={() => {
                    document.getElementById("my_modal_3").close();
                  }}
                />
              </form>
            </div>
          </dialog>
        </div>

        <div className="grid grid-cols-1 mb-5 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {["Pendiente", "En progreso", "Completado"].map((estadoCol) => (
            <div key={estadoCol} className="bg-white p-4 rounded-3xl shadow">
              <h1 className="font-bold text-lg mb-3">
                {estadoCol === "Pendiente" ? (
                  <div className="flex items-center gap-2">
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
                        d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                      />
                    </svg>
                    <h1>Pendiente</h1>
                  </div>
                ) : estadoCol === "En progreso" ? (
                  <div className="flex items-center gap-2">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h1>En progreso</h1>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
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
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h1>Completado</h1>
                  </div>
                )}
              </h1>
              <div className="flex flex-col justify-self-start gap-3 w-full">
                {tareas
                  .filter((t) => t.estado === estadoCol)
                  .map((t) => (
                    <TaskCard
                      key={t.id}
                      tarea={t}
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
                  ))}
              </div>
            </div>
          ))}
        </div>
        <p>{msg}</p>
      </div>
    </div>
  );
}
