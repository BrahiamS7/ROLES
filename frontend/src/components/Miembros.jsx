import { useEffect, useState } from "react";
import { cargarUsuariosDisp } from "../api/usuarios";
import { getProyUsers, addProyUser, deleteProyUser } from "../api/proyectos";

export default function Miembros({ id }) {
  const [usuarios, setUsuarios] = useState([]);
  const [proyU, setProyU] = useState([]);

  useEffect(() => {
    getInfo();
    getUsers();
  }, []);

  const getInfo = async () => {
    const data = await cargarUsuariosDisp();
    setUsuarios(data.body);
  };
  const getUsers = async () => {
    const data = await getProyUsers(id);
    const users = data.body.data;
    setProyU(users);
  };

  const addUserP = async (idU, idP) => {
    await addProyUser({ idU, idP });
    document.getElementById("my_modal_1").closeModal();
  };
  const deleteUserP = async (idU) => {
    console.log(idU);
    await deleteProyUser({ idU });
    getProyUsers();
  };

  return (
    <div className="bg-[#F2F2F2] mx-7 my-10 p-10 rounded-xl shadow">
      <div className="flex items-center justify-between">
        <h2 className="mb-6 text-[#6B7280]">Miembros:</h2>
        <button
          className="mb-6 btn"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Añadir miembros
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Lista de miembros disponibles</h3>
            <p className="py-4">
              {usuarios?.map((u, i) => (
                <div className="flex flex-col gap-6 my-3" key={i}>
                  <div className="flex items-center">
                    <div
                      tabindex="0"
                      role="button"
                      class="btn btn-ghost btn-circle avatar w-20 h-20"
                    >
                      <div class="rounded-full ">
                        <img
                          alt="Tailwind CSS Navbar component"
                          src={
                            u?.imagen
                              ? u.imagen
                              : "http://localhost:3001/uploads/defaultUser.png"
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="ml-7 text-indigo-900">{u.nombre}</h2>
                      <h2 className="ml-7">{u.id}</h2>
                    </div>
                    <div className="">
                      <button
                        className="btn mx-10"
                        onClick={() => addUserP(u.id, id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Cerrar</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {proyU.length > 0 ? (
        <div className="flex flex-col gap-6">
          {proyU.map((u, i) => (
            <div className="flex" key={i}>
              <div
                tabindex="0"
                role="button"
                class="btn btn-ghost btn-circle avatar w-20 h-20"
              >
                <div class="rounded-full ">
                  <img
                    alt="UsuarioImg"
                    src={
                      u?.imagen
                        ? u.imagen
                        : "http://localhost:3001/uploads/defaultUser.png"
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="ml-7 text-indigo-900">{u.nombre}</h2>
                <h2 className="ml-7">{u.id}</h2>
              </div>
              <div className=" flex ml-5 justify-between max-w-2xs flex-1">
                <div>
                  <h2 className="font-bold flex text-start">
                    Trabajando en:{" "}
                    <span className="font-normal">Hacer x cosa</span>
                  </h2>
                  <h2 className="ml-10 font-bold">
                    Estado: <span className="font-normal">Pendiente</span>
                  </h2>
                </div>
                <div className="dropdown dropdown-top">
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
                      <a onClick={() => deleteUserP(u.id)}>
                        Eliminar del proyecto
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2>No hay miembros asignados al proyecto...</h2>
      )}
    </div>
  );
}
