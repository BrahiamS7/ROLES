import { useEffect, useState } from "react";
import { cargarUsuarios, getPerfil } from "../api/usuarios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [perfil, setPerfil] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  const getUsuario = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const data = await cargarUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };
  const logOut = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const fetchPerfil = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuario no verificado");
      navigate("/login");
      return;
    }
    try {
      const data = await getPerfil(token);
      setPerfil(data.user);
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    getUsuario();
    fetchPerfil();
  }, []);
  return (
    <>
      {perfil ? (
        <div>
          <h2>Bienvenido {perfil.nombre}</h2>
          <p>Rol: {perfil.rol}</p>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
      {usuarios.map((usuario, i) => (
        <p key={i}>{usuario.nombre}</p>
      ))}
      <a href="/register">Registrar</a>
      <button onClick={logOut}>Cerrar Sesion</button>
    </>
  );
}

export default Home;
