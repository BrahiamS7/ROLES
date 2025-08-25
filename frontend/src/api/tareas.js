const url = import.meta.env.VITE_API_URL;

export async function addTarea(data) {
  const res = await fetch(`${url}/api/notas/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const status = res.status;
  const body = await res.json();
  return { status, body };
}

export async function actualizarTarea(data) {
  const res = await fetch(`${url}/api/notas/act`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const status = res.status;
  const body = await res.json();
  return { status, body };
}

export async function deleteTarea(data) {
  const res = await fetch(`${url}/api/notas/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  console.log(data);
  const status = res.status;
  const body = await res.json();
  return { status, body };
}

export async function getTareas(data) {
  const res = await fetch(`${url}/api/notas/getTareas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const status = res.status;
  const body = await res.json();
  return { status, body };
}
