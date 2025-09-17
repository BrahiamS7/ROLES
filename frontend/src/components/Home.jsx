import Card from "./Card";
import LargeCard from "./LargeCard";

export default function Home() {
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
            <button className="border-1 bg-gradient-to-bl from-indigo-900 to-indigo-600 rounded-3xl p-3 text-white">
              Añadir Proyecto
            </button>
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
              contenido={7}
              classN={
                "bg-gradient-to-bl from-indigo-900 to-indigo-600 flex flex-col justify-between h-full w-full rounded-3xl p-6"
              }
              textColor={"text-white"}
            />
          </div>
          <div className="flex">
            <Card titulo={"Proyectos Terminados"} contenido={5} />
          </div>
          <div className="flex">
            <Card titulo={"Proyectos Corriendo"} contenido={2} />
          </div>
          <div className="flex">
            <Card titulo={"Proyectos Pendientes"} contenido={1} />
          </div>

          {/* LISTA DE PROYECTOS */}
          <div className="lg:col-span-4 md:col-span-2">
            <LargeCard
              titulo={"Proyectos del mes"}
              contenido={7}
              classN={
                "bg-amber-200 flex flex-col justify-center items-center w-full"
              }
            />
          </div>

          {/* INFORMACION DEL EQUIPO */}
          <div className="lg:col-span-3">
            <LargeCard titulo={"Lista del equipo"} contenido={1} />
          </div>
          <div className="lg:col-span-1">
            <Card titulo={"Porcentaje de proyectos"} contenido={"%80"} />
          </div>
        </div>
      </div>
    </div>
  );
}
