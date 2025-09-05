import { useEffect, useState } from "react";
import { getPerfil, cargarUsuarios } from "../api/usuarios";
import {
  addTarea,
  getTareas,
  deleteTarea,
  actualizarTarea,
} from "../api/tareas";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [perfil, setPerfil] = useState({});
  const [estado, setEstado] = useState("");
  const [tareas, setTareas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [msg, setMsg] = useState("");
  const [id, setId] = useState("");
  const [descrip, setDescrip] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const logOut = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const setTarea = async (titulo, descr, id, estado) => {
    setShow(true);
    setTitulo(titulo);
    setDescrip(descr);
    setId(id);
    setEstado(estado);
  };
  const actTarea = async () => {
    const data = await actualizarTarea({ titulo, descrip, id, estado });
    setMsg(data.body.msg);
    setTimeout(() => {
      setMsg("");
    }, 3000);
  };

  const borrarTarea = async (id) => {
    await deleteTarea({ id });
    const dataTareas = await getTareas({ id: perfil?.id });
    console.log("info:" + dataTareas);
    setTareas(dataTareas.body.tareas);
  };

  const agregarNota = async (e) => {
    e.preventDefault();
    const response = await addTarea({ titulo, descrip, id: perfil?.id });
    const data = response.body;
    setTitulo("");
    setDescrip("");
    setMsg(data.msg);
    setTimeout(() => {
      setMsg("");
    }, 3000);
    const dataTareas = await getTareas({ id: perfil?.id });
    console.log("info:" + dataTareas);
    setTareas(dataTareas.body.tareas);
  };

  const cancelarAct = () => {
    setDescrip("");
    setTitulo("");
    setShow(false);
  };

  useEffect(() => {
    const fetchPerfilYTareas = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Usuario no verificado");
        navigate("/login");
        return;
      }
      try {
        const dataPerfil = await getPerfil(token);
        setPerfil(dataPerfil.user);
        console.log(dataPerfil.user);

        if (dataPerfil.user.rol != "admin") {
          alert("Rol no permitido");
          navigate("/user");
          return;
        }

        const dataTareas = await getTareas({ id: dataPerfil?.user.id });
        setTareas(dataTareas.body.tareas);

        const dataUsuarios = await cargarUsuarios();
        console.log(dataUsuarios);
        setUsuarios(dataUsuarios);
      } catch (error) {
        alert("ERROR POR PARTE DEL SERVIDOR");
        console.error(error);
        navigate("/login");
      }
    };
    fetchPerfilYTareas();
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col">
      <div class="navbar bg-base-100 shadow-sm">
        <div class="flex-1">
          <a class="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div class="flex-none">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
              <div class="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />{" "}
                </svg>
                <span class="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div
              tabindex="0"
              class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
            >
              <div class="card-body">
                <span class="text-lg font-bold">8 Items</span>
                <span class="text-info">Subtotal: $999</span>
                <div class="card-actions">
                  <button class="btn btn-primary btn-block">View cart</button>
                </div>
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
      <div className="bg-base-200 h-full w-full flex-1 overflow-y-auto">
        <h2 className="text-xl m-3">Agregar Tarea</h2>
        <form onSubmit={agregarNota}>
          <label class="floating-label">
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
          <label class="floating-label">
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
            className="btn bg-indigo-400 m-3"
          />
        </form>
        {tareas.length > 0 ? (
          <div>
            {tareas.map((t, i) => (
              <div key={i}>
                <div
                  className={`card card-border w-96 mt-3 mb-3 ml-3 ${
                    t.estado === "Pendiente"
                      ? "bg-yellow-200"
                      : t.estado === "En progreso"
                      ? "bg-blue-200"
                      : "bg-green-200"
                  }`}
                >
                  <div class="card-body">
                    <h2 class="card-title">{t.titulo}</h2>
                    <p>{t.descripcion}</p>
                    <p>{t.estado}</p>
                    <div class="card-actions justify-end">
                      <button
                        className="btn btn-error"
                        onClick={() => {
                          borrarTarea(t.id);
                        }}
                      >
                        Borrar Tarea
                      </button>
                      <button
                        className="btn bg-indigo-400"
                        onClick={() => {
                          setTarea(t.titulo, t.descripcion, t.id, t.estado);
                        }}
                      >
                        Actualizar Tarea
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay tareas disponibles...</p>
        )}
        <p>{msg}</p>

        {/* MOSTRAR USUARIOS */}
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
                        <span class="badge badge-ghost badge-sm">Operario</span>
                      </td>
                      <th>
                        <button class="btn btn-ghost btn-xs">
                          <a href={`/user/${u.nombre}`}>Detalles</a>
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

        {/* MODAL */}
        {show && (
          <div>
            <h2>Actualizar Tarea</h2>
            <form onSubmit={actTarea}>
              <input
                type="text"
                placeholder="Titulo de la tarea"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Descripcion"
                value={descrip}
                onChange={(e) => setDescrip(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="ID"
                value={id}
                readOnly
                hidden
              />
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="Completado">Completado</option>
              </select>
              <p>Estado: {estado}</p>
              <input type="submit" value="Actualizar" />
              <input
                type="button"
                value="Cancelar"
                onClick={() => cancelarAct()}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
