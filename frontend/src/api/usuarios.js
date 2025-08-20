const url = import.meta.env.VITE_API_URL;

export async function cargarUsuarios() {
  const response = await fetch(`${url}/api/usuarios/`);
  if (!response.ok) throw new Error("Error en la funcion");
  return response.json();
}

export async function getPerfil(token) {
  const response=await fetch(`${url}/auth/profile`,{
    headers:{
        Authorization:`Bearer ${token}`
    }
  });
  if(!response.ok) throw new Error("Error en la funcion");
  return response.json();
}

export async function agregarUsuario(data) {
  const res = await fetch(`${url}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error en la funcion");

  const status = res.status;
  const body = await res.json();
  return { status, body };
}
export async function loginU(data) {
  const res = await fetch(`${url}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error en la funcion");

  const status = res.status;
  const body = await res.json();
  return { status, body };
}
