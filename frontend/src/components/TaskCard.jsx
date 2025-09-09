export default function TaskCard({
  tarea,
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
    <div
      className={`shadow-md card card-border 
  w-50 sm:w-[16rem] md:w-[14rem] lg:w-[20rem] 
  mt-3 mb-3 mx-auto h-80 rounded-4xl
  ${
    tarea.estado === "Pendiente"
      ? "bg-[#FFFF99]"
      : tarea.estado === "En progreso"
      ? "bg-[#87CEEB]"
      : "bg-[#98FB98]"
  }`}
    >
      <div className="card-body">
        <h2 className="card-title break-words">{tarea.titulo}</h2>
        <p className="text-left break-words">{tarea.descripcion}</p>

        <div className="card-actions justify-end mt-7 flex flex-wrap gap-2">

          <button
            className="btn"
            onClick={() => {
              document.getElementById(`modal_update_${tarea.id}`).showModal();
              setTarea(tarea.titulo, tarea.descripcion, tarea.id, tarea.estado);
            }}
          >
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
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>

          <button
            className="btn btn-error"
            onClick={() =>
              document.getElementById(`modal_borrar_${tarea.id}`).showModal()
            }
          >
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
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>

          <dialog id={`modal_borrar_${tarea.id}`} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">¿Estás seguro?</h3>
              <p className="py-4">¿Deseas eliminar esta tarea?</p>
              <div className="modal-action flex gap-2">
                <form method="dialog">
                  <button className="btn mr-3">Cancelar</button>
                  <button
                    className="btn btn-error"
                    onClick={() => borrarTarea(tarea.id)}
                  >
                    Borrar Tarea
                  </button>
                </form>
              </div>
            </div>
          </dialog>

          <dialog id={`modal_update_${tarea.id}`} className="modal">
            <div className="modal-box w-full max-w-lg">
              <h3 className="font-bold text-lg">Actualizar Tarea</h3>
              <form onSubmit={actTarea} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Título"
                  className="input input-md"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Descripción"
                  className="input input-md"
                  value={descrip}
                  onChange={(e) => setDescrip(e.target.value)}
                  required
                />
                <select
                  className="select"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En progreso">En progreso</option>
                  <option value="Completado">Completado</option>
                </select>
                <div className="modal-action flex gap-2">
                  <input
                    type="submit"
                    value="Actualizar"
                    className="btn bg-indigo-400"
                  />
                  <input
                    type="button"
                    value="Cancelar"
                    className="btn btn-error"
                    onClick={() => {
                      document
                        .getElementById(`modal_update_${tarea.id}`)
                        .close();
                      cancelarAct();
                    }}
                  />
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}
