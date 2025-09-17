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
    <div className={` w-full`}>
      <div className="bg-white shadow-md rounded-xl p-4 w-full border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-gray-900 font-semibold">{tarea.titulo}</h3>
            <p className="text-sm text-gray-500">4 Dias restantes</p>
          </div>
          <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">
            High Priority
          </span>
        </div>
        <div className="border-t border-gray-300 border-dashed my-3"></div>
        {/* Description */}
        <p className="text-sm text-gray-600 mt-3">{tarea.descripcion}</p>
        <div className="border-t border-gray-300 border-dashed my-3"></div>
        {/* Footer */}
        <div className="flex flex-col justify-between w-full mt-4">
          {/* Avatars */}
          <div className="flex justify-between items-center w-full">
            <div className="flex w-full  -space-x-2">
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="user"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/women/2.jpg"
                alt="user"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/men/3.jpg"
                alt="user"
              />
            </div>
            <div className="dropdown w-full text-end dropdown-top dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1 bg-white">
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
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <a
                    onClick={() => {
                      document
                        .getElementById(`modal_update_${tarea.id}`)
                        .showModal();
                      setTarea(
                        tarea.titulo,
                        tarea.descripcion,
                        tarea.id,
                        tarea.estado
                      );
                    }}
                  >
                    Editar
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      document
                        .getElementById(`modal_borrar_${tarea.id}`)
                        .showModal()
                    }
                  >
                    Eliminar
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* MODALES */}
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
                  document.getElementById(`modal_update_${tarea.id}`).close();
                  cancelarAct();
                }}
              />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
