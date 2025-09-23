import { useEffect,useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { getPerfil } from "../api/usuarios";
import Navbar from "./Navbar";
import Proyecto from "./Proyecto";

export default function ProyectoDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [perfil, setPerfil] = useState([]);

  const logOut = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuario no verificado");
      navigate("/login");
      return;
    }
    const dataPerfil = async () => {
      const data = await getPerfil(token);

      setPerfil(data.user);
    };

    dataPerfil();
  },[]);

  return (
    <div className="">
      <div className="h-screen bg-[white] flex flex-col">
        <Navbar perfil={perfil} logOut={logOut} />
        <div className="full w-full flex-1">
          <a
            href="/home"
            className="btn mx-8 mt-4 rounded-2xl text-[#023059] w-26"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </a>
          <Proyecto id={id}/>
        </div>
      </div>
    </div>
  );
}
