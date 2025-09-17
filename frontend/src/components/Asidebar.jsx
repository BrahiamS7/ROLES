export default function Asidebar({setActiveTab}) {
  return (
    <aside className="w-20 sm:w-32 md:w-48 lg:w-45 h-full bg-white shadow-lg p-2 sm:p-4 md:p-6 flex flex-col gap-4 transition-all duration-300">
      <div className="font-bold text-base sm:text-lg md:text-xl mb-4 md:mb-6 text-center">
        Panel
      </div>
      <nav className="flex flex-col gap-2">
        <a
          href="#"
          className="hover:bg-blue-100 rounded px-2 py-1 text-xs sm:text-sm md:text-base"
          onClick={() => setActiveTab("home")}
        >
          Inicio
        </a>
        <a
          href="#"
          className="hover:bg-blue-100 rounded px-2 py-1 text-xs sm:text-sm md:text-base"
          onClick={() => setActiveTab("tareas")}
        >
          Tareas
        </a>
        <a
          href="#"
          className="hover:bg-blue-100 rounded px-2 py-1 text-xs sm:text-sm md:text-base"
          onClick={() => setActiveTab("usuarios")}
        >
          Usuarios
        </a>
      </nav>
    </aside>
  );
}
