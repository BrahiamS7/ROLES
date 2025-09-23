export default function Asidebar({ activeTab, setActiveTab, rol }) {
  return (
    <aside className="w-20 sm:w-32 md:w-48 lg:w-45 h-full shadow-lg p-3 flex flex-col gap-4 transition-all duration-300">
      <div className="bg-[#F2F2F2] rounded-2xl h-full p-3">
        <div className="font-bold text-base sm:text-lg md:text-xl mb-4 md:mb-6 text-center">
          Panel
        </div>
        <nav className="flex flex-col gap-2">
          <a
            href="#"
            className={`transition duration-300 ease-in-out hover:bg-blue-100 rounded px-2 py-1 text-xs sm:text-sm md:text-base
            ${
              activeTab === "home"
                ? "bg-gradient-to-bl from-indigo-900 to-indigo-600  text-white"
                : ""
            }  
              `}
            onClick={() => setActiveTab("home")}
          >
            Inicio
          </a>
          <a
            href="#"
            className={`transition duration-300 ease-in-out hover:bg-blue-100 rounded px-2 py-1 text-xs sm:text-sm md:text-base
            ${
              activeTab === "tareas"
                ? "bg-gradient-to-bl from-indigo-900 to-indigo-600  text-white"
                : ""
            }  
              `}
            onClick={() => setActiveTab("tareas")}
          >
            Tareas
          </a>
          {/* Solo para admin */}
          {rol === "admin" && (
            <a
              href="#"
              className={`transition duration-300 ease-in-out hover:bg-blue-100 rounded px-2 py-1 text-xs sm:text-sm md:text-base
            ${
              activeTab === "usuarios"
                ? "bg-gradient-to-bl from-indigo-900 to-indigo-600  text-white"
                : ""
            }  
              `}
              onClick={() => setActiveTab("usuarios")}
            >
              Usuarios
            </a>
          )}
          {rol === "admin" && (
            <a
              href="#"
              className={`transition duration-300 ease-in-out hover:bg-blue-100 rounded px-2 py-1 text-xs sm:text-sm md:text-base
            ${
              activeTab === "proyectos"
                ? "bg-gradient-to-bl from-indigo-900 to-indigo-600  text-white"
                : ""
            }  
              `}
              onClick={() => setActiveTab("proyectos")}
            >
              Proyectos
            </a>
          )}
        </nav>
      </div>
    </aside>
  );
}
