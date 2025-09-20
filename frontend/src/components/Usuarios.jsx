export default function Usuarios({ usuarios }) {
  return (
    <div className="flex-1 h-screen flex flex-col p-4 overflow-hidden">
      <div
        className="bg-[#F2F2F2] flex flex-col mr-2 ml-2 mb-5 p-3 rounded-xl shadow 
                  h-screen max-h-screen overflow-y-auto"
      >
        <h2 className="text-xl m-3">Usuarios a cargo:</h2>
        <div>
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Proyecto</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length > 0 ? (
                  usuarios.map((u, i) => (
                      <tr key={i} className="bg-white rounded-2xl">
                        <td>
                          <div class="flex items-center gap-3 ">
                            <div class="avatar">
                              <div class="mask mask-squircle h-12 w-12">
                                <img
                                  src={u.imagen? u.imagen : "http://localhost:3001/uploads/defaultUser.png"}
                                  alt="userImg"
                                />
                              </div>
                            </div>
                            <div>
                              <div class="font-bold">{u.nombre}</div>
                              <div class="text-sm opacity-50">Colombia</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          Proyecto actual
                          <br />
                          <span class="badge badge-ghost badge-sm text-white bg-gray-400">
                            Disponible
                          </span>
                        </td>
                        <th>
                          <button class="btn btn-ghost btn-xs">
                            <a
                              className="text-[#0511F2]"
                              href={`/user/${u.nombre}`}
                            >
                              Detalles
                            </a>
                          </button>
                        </th>
                      </tr>
                  ))
                ) : (
                  <h2>No hay usuarios a cargo...</h2>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
