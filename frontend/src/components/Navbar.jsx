export default function Navbar({ perfil, logOut }) {
  return (
    <div class="navbar ">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">
          {perfil?.rol === "admin" ? <p>Admin</p> : <p>Usuario</p>}
        </a>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end mr-3">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
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
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              <span class="badge badge-sm indicator-item">0</span>
            </div>
          </div>
          <div
            tabindex="0"
            class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          >
            <div class="card-body">
              <span class="text-info">No hay mensajes</span>
            </div>
          </div>
        </div>
        <div class="dropdown dropdown-end">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle avatar"
          >
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a class="justify-between">
                Perfil
                <span class="badge">New</span>
              </a>
            </li>
            <li>
              <a>Configuracion</a>
            </li>
            <li>
              <button onClick={logOut}>Cerrar Sesion</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="dropdown dropdown-end ml-2">
        <div tabindex="0" class="flex flex-col">
          <p className="text-base">{perfil?.nombre}</p>
          <p className="text-xs text-gray-400">ID:{perfil?.id}</p>
        </div>
      </div>
    </div>
  );
}
