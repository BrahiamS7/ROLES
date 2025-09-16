export default function Home() {
  return (
    <main className="flex-1 min-h-0 flex flex-col overflow-y-auto">
      <div className="bg-[#F1F3F9] mr-2 ml-2 mb-5 p-3 rounded-xl shadow h-full flex-1 min-h-0 flex flex-col">
        <div className="grid lg:grid-cols-4 lg:grid-rows-3 lg:gap-4 md:grid-cols-2 md:grid-rows-4 gap-4 h-full flex-1 min-h-0">
          <div className="bg-amber-200 flex items-center justify-center h-full w-full">
            <div className="flex flex-col items-center">
              <h3>Total Proyectos:</h3>
              <p>Flecha aqui!</p>
            </div>
            <div>
              <h1>25</h1>
            </div>
            <div>
              <p>Aumento del ultimo mes</p>
            </div>
          </div>
          <div className="bg-amber-200 flex items-center justify-center h-full w-full">
            2
          </div>
          <div className="bg-amber-200 flex items-center justify-center h-full w-full">
            3
          </div>
          <div className="bg-amber-200 flex items-center justify-center h-full w-full">
            4
          </div>
          <div className="bg-amber-200 flex items-center justify-center h-full w-full lg:grid-start-1 lg:col-span-4 md:grid-start-1 md:col-span-2 ">
            5
          </div>
          <div className="bg-amber-200 flex items-center justify-center h-full w-full lg:grid-start-1 lg:col-span-2">
            6
          </div>
          <div className="bg-amber-200 flex items-center justify-center h-full w-full lg:col-span-2">
            7
          </div>
        </div>
      </div>
    </main>
  );
}
