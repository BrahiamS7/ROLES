export default function LargeCard({ titulo, data }) {
  console.log(data);
  if (!data || data.length === 0) {
    return (
      <div className="bg-white flex flex-col justify-center items-center h-full w-full rounded-3xl px-4">
        <p>No hay informacion disponibles</p>
      </div>
    );
  }
  return (
    <div className="bg-white flex flex-col justify-baseline h-full w-full rounded-3xl px-4">
      <div className="flex justify-between p-4 sm:p-2 t-3xl">
        <h3>{titulo}</h3>
      </div>
      {data[0].titulo ? (
        <div className="pl-3">
          {data.slice(0, 2).map((proy) => {
            console.log("Imagen proyecto:", proy.imagen);
            return (
              <div key={proy.id} className="flex flex-row mb-2">
                <div className="flex items-center justify-center mr-4">
                  <img
                    src={proy.imagen}
                    alt={proy.titulo}
                    className="w-6 h-6 object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <h1>{proy.titulo}</h1>
                  <p className="text-xs text-gray-400">{proy.descripcion}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="pl-3">
          {data.slice(0, 2).map((user) => {
            return (
              <div key={user.id} className="flex flex-row mb-2">
                <div className="flex items-center justify-center mr-4">
                  <img
                    src={user.imagen? user.imagen : "http://localhost:3001/uploads/defaultUser.png"}
                    alt={user.nombre}
                    className="w-6 h-6 object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <h1>{user.nombre}</h1>
                  <p className="text-xs text-gray-400">{user.rol}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-xs pl-3 mb-2 mt-auto">Ver mas...</p>
    </div>
  );
}
