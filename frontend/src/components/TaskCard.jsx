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
  w-90 sm:w-[20rem] md:w-[14rem] lg:w-[25rem] 
  mt-3 mb-3 mx-auto 
  ${
    tarea.estado === "Pendiente"
      ? "bg-yellow-200"
      : tarea.estado === "En progreso"
      ? "bg-blue-200"
      : "bg-green-200"
  }`}
    >
      <div className="card-body">
        <h2 className="card-title break-words">{tarea.titulo}</h2>
        <p className="break-words">{tarea.descripcion}</p>

        <div className="card-actions justify-end mt-7 flex flex-wrap gap-2">
          {/* Botón actualizar */}
          <button
            className="btn bg-indigo-400"
            onClick={() => {
              document.getElementById(`modal_update_${tarea.id}`).showModal();
              setTarea(tarea.titulo, tarea.descripcion, tarea.id, tarea.estado);
            }}
          >
            Actualizar Tarea
          </button>
          {/* Botón eliminar */}
          <button
            className="btn btn-error"
            onClick={() =>
              document.getElementById(`modal_borrar_${tarea.id}`).showModal()
            }
          >
            Borrar Tarea
          </button>

          {/* Modal eliminar */}
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

          {/* Modal actualizar */}
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
