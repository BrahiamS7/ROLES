export default function Usuarios({usuarios}){
    return(
        <div className="bg-[#F1F3F9] m-15 p-10 rounded-xl shadow">
          <h2 className="text-xl m-3">Usuarios a cargo:</h2>
          <div>
            <div class="overflow-x-auto">
              <table class="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cargo</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.length > 0 ? (
                    usuarios.map((u, i) => (
                      <tr key={i}>
                        <td>
                          <div class="flex items-center gap-3">
                            <div class="avatar">
                              <div class="mask mask-squircle h-12 w-12">
                                <img
                                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                  alt="Avatar Tailwind CSS Component"
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
                          Guadalajara de Buga
                          <br />
                          <span class="badge badge-ghost badge-sm text-white bg-gray-400">
                            Operario
                          </span>
                        </td>
                        <th>
                          <button class="btn btn-ghost btn-xs">
                            <a className="text-[#0511F2]" href={`/user/${u.nombre}`}>Detalles</a>
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
    )
}