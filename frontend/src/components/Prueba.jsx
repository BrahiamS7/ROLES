import { useEffect, useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import {
  addTarea,
  getTareas,
  deleteTarea,
  actualizarTarea,
} from "../api/tareas";

const initialColumns = {
  pendiente: [
    { id: "1", title: "Terminar orden de tareas" },
    { id: "2", title: "Holi" },
  ],
  enProgreso: [{ id: "3", title: "Organizar x elemento" }],
  completado: [
    { id: "4", title: "Terminar roles y demás" },
    { id: "5", title: "Ol" },
  ],
};

function DraggableCard({ task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    padding: "1rem",
    background: "white",
    margin: "0.5rem",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {task.title}
    </div>
  );
}

function DroppableColumn({ id, tasks, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        background: isOver ? "#dbeafe" : "#f3f4f6",
        padding: "1rem",
        borderRadius: "10px",
        minHeight: "300px",
        flex: 1,
      }}
    >
      <h3>{id}</h3>
      {children}
    </div>
  );
}

export default function Board() {
  const [columns, setColumns] = useState(initialColumns);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (!over) return;

    const sourceColumn = Object.keys(columns).find((key) =>
      columns[key].some((t) => t.id === active.id)
    );
    const task = columns[sourceColumn].find((t) => t.id === active.id);

    if (sourceColumn !== over.id) {
      setColumns((prev) => {
        const newSource = prev[sourceColumn].filter((t) => t.id !== active.id);
        const newDest = [...prev[over.id], task];
        return { ...prev, [sourceColumn]: newSource, [over.id]: newDest };
      });
    }
  };


  const [tareas, setTareas] = useState([])
  useEffect(() => {
    const getTareasData=async()=>{
        const dataTareas=await getTareas()
        setTareas(dataTareas.body.tareas)
    }
    getTareasData();
  });
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "1rem" }}>
        {Object.entries(columns).map(([key, tasks]) => (
          <DroppableColumn key={key} id={key} tasks={tasks}>
            {tasks.map((task) => (
              <DraggableCard key={task.id} task={task} />
            ))}
          </DroppableColumn>
        ))}
      </div>
    </DndContext>
  );
}
