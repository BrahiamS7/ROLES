import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { getProyects } from "../api/proyectos";
import { useNavigate } from "react-router-dom";

export default function InfoProyectos() {
  const [proyectos, setProyectos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProyectos = async () => {
      const data = await getProyects();
      setProyectos(data.body.proyectos);
    };
    fetchProyectos();
  }, []);
  return (
    <div className="flex-1 h-screen flex flex-col p-4 overflow-hidden">
      <div
        className="bg-[#F2F2F2] flex flex-col mr-2 mb-10 ml-2 p-4 rounded-xl shadow 
        h-screen max-h-screen overflow-y-auto"
      >
        <div className="w-full">
          {/* Header */}
          <div className="grid grid-cols-5 gap-4 text-gray-500 text-sm font-semibold px-4 py-2 border-b">
            <div>Name</div>
            <div>Status</div>
            <div>Summary</div>
            <div>Members</div>
            <div>Progress</div>
          </div>

          {/* Rows */}
          {proyectos.map((proy) => (
            <div
              onClick={() => navigate(`/proyecto/${proy.id}`)}
              key={proy.id}
              className="grid grid-cols-6 gap-4 proys-center px-4 py-3 border-b hover:bg-gray-50"
            >
              {/* Name */}
              <div className="flex proys-center space-x-2">
                <img
                  className="w-6 h-6 rounded-full"
                  src={proy.imagen}
                  alt={proy.titulo}
                />
                <div>
                  <p className="font-medium">{proy.titulo}</p>
                </div>
              </div>

              {/* Status */}
              <div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    proy.estado === "Finalizado"
                      ? "bg-green-100 text-green-600"
                      : proy.estado === "En Progreso"
                      ? "bg-yellow-100 text-yellow-600"
                      : proy.estado === "Pendiente"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {proy.estado}
                </span>
              </div>

              {/* Summary */}
              <div>
                <p className="text-sm font-medium">{proy.descripcion}</p>
              </div>
              {/* 
             
              <div className="flex -space-x-2">
                {proy.members.map((m, i) => (
                  <img
                    key={i}
                    src={m.avatar}
                    alt={m.name}
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                ))}
              </div> */}

              {/* Progress
              <div className="flex proys-center space-x-2">
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${proy.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{proy.progress}%</span>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
