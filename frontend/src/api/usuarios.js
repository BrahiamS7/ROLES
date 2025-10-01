const url = import.meta.env.VITE_API_URL;

export async function cargarUsuarios() {
  const response = await fetch(`${url}/api/usuarios/`);
  if (!response.ok) throw new Error("Error en la funcion");
  return response.json();
}

export async function cargarUsuario(nombre) {
  const response = await fetch(`${url}/api/usuarios/info/${nombre}`);
  if (!response.ok) throw new Error("Error en la funcion");
  return response.json();
}

export async function getPerfil(token) {
  const response = await fetch(`${url}/api/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Error en la funcion");
  const data = await response.json();
  console.log(data);

  console.log(`Usuario actual: ${data.user}`);
  return data;
}

export async function cargarUsuariosDisp() {
  const res = await fetch(`${url}/api/usuarios/usersDisp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const status = res.status;
  const body = await res.json();
  return { status, body };
}

export async function agregarUsuario(data) {
  const res = await fetch(`${url}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const status = res.status;
  const body = await res.json();
  return { status, body };
}

export async function agregarAdmin(data) {
  const res = await fetch(`${url}/api/auth/registerAd`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
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
  const status = res.status;
  const body = await res.json();
  return { status, body };
}
