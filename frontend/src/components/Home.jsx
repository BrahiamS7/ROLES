import { useEffect, useState, useMemo } from "react";
import { getProyects, addProyect } from "../api/proyectos";

import Card from "./Card";
import LargeCard from "./LargeCard";

export default function Home({ id,usuarios }) {
  const [proyectos, setProyectos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descrip, setDescrip] = useState("");
  const [estado, setEstado] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProyectos = async () => {
      const data = await getProyects();
      setProyectos(data.body.proyectos);
    };

    fetchProyectos();
  }, []);

  const { enProgreso, finalizados, pendientes } = useMemo(() => {
    return proyectos.reduce(
      (acc, proy) => {
        if (proy.estado === "Finalizado") acc.finalizados++;
        if (proy.estado === "Pendiente") acc.pendientes++;
        if (proy.estado === "En Progreso") acc.enProgreso++;
        return acc;
      },
      { enProgreso: 0, finalizados: 0, pendientes: 0 }
    );
  }, [proyectos]);

  const agregarProyecto = async (e) => {
    e.preventDefault();
    await addProyect({ id, titulo, descrip, file });
    setTitulo("");
    setDescrip("");
    document.getElementById("my_modal_1").close();
    const data = await getProyects();
    setProyectos(data.body.proyectos);
  };

  return (
    <div className="flex-1 h-screen flex flex-col p-4 overflow-hidden">
      <div
        className="bg-[#F2F2F2] flex flex-col mr-2 ml-2 mb-10 p-3 rounded-xl shadow 
        h-screen max-h-screen overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6 px-2">
          <div>
            <h1 className="text-4xl mt-4">Dashboard</h1>
            <p className="text-gray-400">
              Planea, prioriza y termina tus proyectos!
            </p>
          </div>
          <div>
            {/* MODAL PARA AÑADIR PROYECTO */}
            <button
              className="border-1 bg-gradient-to-bl from-indigo-900 to-indigo-600 rounded-3xl p-3 text-white cursor-pointer"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Añadir Proyecto
            </button>

            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <form onSubmit={agregarProyecto} method="dialog">
                  <h3>Crear nuevo proyecto</h3>
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
                  <label className="floating-label">
                    <span>Imagen</span>
                    <input
                      type="file"
                      placeholder="Imagen"
                      className="file-input input-md m-3"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                  <input
                    type="submit"
                    value="Enviar"
                    className="btn bg-[#0511F2] text-white m-3"
                  />
                </form>
              </div>
            </dialog>
            <button className="border-1 rounded-3xl p-3 ml-4">
              Importar Data
            </button>
          </div>
        </div>
        <div className="h-full grid lg:grid-cols-4 lg:grid-rows-3 lg:gap-4 md:grid-cols-2 md:grid-rows-4 gap-4">
          {/* PROYECTOS */}
          <div className="flex">
            <Card
              titulo={"Proyectos Totales"}
              contenido={proyectos.length}
              classN={
                "bg-gradient-to-bl from-indigo-900 to-indigo-600 flex flex-col justify-between h-full w-full rounded-3xl p-6"
              }
              textColor={"text-white"}
            />
          </div>
          <div className="flex">
            <Card titulo={"Proyectos Terminados"} contenido={finalizados} />
          </div>
          <div className="flex">
            <Card titulo={"Proyectos Corriendo"} contenido={enProgreso} />
          </div>
          <div className="flex">
            <Card titulo={"Proyectos Pendientes"} contenido={pendientes} />
          </div>

          {/* LISTA DE PROYECTOS */}
          <div className="lg:col-span-4 md:col-span-2">
            <LargeCard
              titulo={"Lista de proyectos"}
              data={proyectos}
              classN={
                "bg-amber-200 flex flex-col justify-center items-center w-full"
              }
            />
          </div>

          {/* INFORMACION DEL EQUIPO */}
          <div className="lg:col-span-3">
            <LargeCard 
            titulo={"Lista de equipo"}
            data={usuarios}  
            />
          </div>
          <div className="lg:col-span-1">
            <Card titulo={"Porcentaje de proyectos"} contenido={"%80"} />
          </div>
        </div>
      </div>
    </div>
  );
}
