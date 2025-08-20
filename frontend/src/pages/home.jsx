import { useEffect, useState } from "react";
import { cargarUsuarios } from "../api/usuarios";

function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const getUsuario = async () => {
    try {
      const data = await cargarUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsuario();
  },[]);
  return (
    <>
      {usuarios.map((usuario, i) => (
        <p key={i}>{usuario.nombre}</p>
      ))}
      <a href="/register">Registrar</a>
    </>
  );
}

export default Home;
