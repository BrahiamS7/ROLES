const url = import.meta.env.VITE_API_URL;

export async function addProyect({ id, titulo, descrip, file }) {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("titulo", titulo);
  formData.append("descrip", descrip);
  if (file) formData.append("imagen", file);

  const res = await fetch(`${url}/api/proyectos/add`, {
    method: "POST",
    body: formData,
  });

  const status = res.status;
  const body = await res.json();
  return { status, body };
}

export async function actualizarProyect({ id, titulo, descrip, file, estado }) {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("titulo", titulo);
  formData.append("descrip", descrip);
  formData.append("estado", estado);
  if (file) formData.append("imagen", file);
  const res = await fetch(`${url}/api/proyectos/act`, {
    method: "PUT",
    body: formData,
  });
  const status = res.status;
  const body = await res.json();
  return { status, body };
}

export async function getProyects(data) {
  const res = await fetch(`${url}/api/proyectos/get`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const status = res.status;
  const body = await res.json();
  return { status, body };
}
export async function getProyectInfo(data) {
  const res = await fetch(`${url}/api/proyectos/getP`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const status = res.status;
  const body = await res.json();
  return { status, body };
}

export async function deleteProyect(data) {
  const res = await fetch(`${url}/api/proyectos/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const status = res.status;
  const body = await res.json();
  return { status, body };
}

export async function getProyUsers(data) {
  const res = await fetch(`${url}/api/proyectos/getProyUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const status = res.status;
  const body = await res.json();
  return { status, body };
}

export async function addProyUser(data) {
  const res = await fetch(`${url}/api/proyectos/addProyUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const status = res.status;
  const body = await res.json();
  return { status, body };
}

export async function deleteProyUser(data) {
  const res = await fetch(`${url}/api/proyectos/deleteProyUser`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const status = res.status;
  const body = await res.json();
  return { status, body };
}

export async function getSubtareas(data) {
  const res = await fetch(`${url}/api/subtareas/get`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const status = res.status;
  const body = await res.json();
  return { status, body };
}

export async function addSubtarea(data) {
  const res = await fetch(`${url}/api/subtareas/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const status = res.status;
  const body = await res.json();
  return { status, body };
}
