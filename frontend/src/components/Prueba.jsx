import { useEffect, useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import {
  getTareas,
  actualizarTarea,
  deleteTarea,
} from "../api/tareas";

// --- SortableItem: Wrapper drag & drop ---
function SortableItem({ tarea, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: tarea.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.7 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

// --- DroppableColumn ---
function DroppableColumn({ id, title, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <section
      ref={setNodeRef}
      className={`flex flex-col bg-white rounded-lg shadow min-h-[200px] p-4 transition-colors ${
        isOver ? "bg-blue-50" : "bg-gray-100"
      }`}
      aria-label={title}
    >
      <h2 className="font-bold text-lg text-center mb-3">{title}</h2>
      <div className="flex-1 flex flex-col gap-2">{children}</div>
    </section>
  );
}

// --- Tablero principal ---
export default function Tablero() {
  const [columns, setColumns] = useState({
    Pendiente: [],
    "En progreso": [],
    Completado: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = 108;

  // Cargar tareas desde la API
  useEffect(() => {
    setLoading(true);
    getTareas({ id: userId })
      .then((dataTareas) => {
        const tareas = dataTareas.body?.tareas || [];
        const nuevasColumnas = {
          Pendiente: [],
          "En progreso": [],
          Completado: [],
        };
        tareas.forEach((tarea) => {
          if (nuevasColumnas[tarea.estado]) {
            nuevasColumnas[tarea.estado].push({
              ...tarea,
              id: tarea.id.toString(),
            });
          }
        });
        setColumns(nuevasColumnas);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar tareas");
        setLoading(false);
      });
  }, [userId]);

  const sensors = useSensors(useSensor(PointerSensor));

  // Editar tarea
  const handleEdit = async (tareaEditada) => {
    try {
      await actualizarTarea({
        id: tareaEditada.id,
        titulo: tareaEditada.titulo,
        descripcion: tareaEditada.descripcion,
        estado: tareaEditada.estado,
      });
      setColumns((prev) => {
        const newCols = { ...prev };
        Object.keys(newCols).forEach((col) => {
          newCols[col] = newCols[col].filter((t) => t.id !== tareaEditada.id);
        });
        newCols[tareaEditada.estado] = [
          ...newCols[tareaEditada.estado],
          tareaEditada,
        ];
        return newCols;
      });
    } catch {
      setError("No se pudo actualizar la tarea.");
    }
  };

  // Borrar tarea
  const handleDelete = async (id) => {
    try {
      await deleteTarea({ id });
      setColumns((prev) => {
        const newCols = { ...prev };
        Object.keys(newCols).forEach((col) => {
          newCols[col] = newCols[col].filter((t) => t.id !== id);
        });
        return newCols;
      });
    } catch {
      setError("No se pudo borrar la tarea.");
    }
  };

  // Drag & drop
  const handleDragEnd = async ({ active, over }) => {
    if (!over) return;

    let sourceCol, targetCol, movingTask;
    for (const col of Object.keys(columns)) {
      const found = columns[col].find((item) => item.id === active.id);
      if (found) {
        sourceCol = col;
        movingTask = found;
      }
      if (columns[col].some((item) => item.id === over.id)) {
        targetCol = col;
      }
    }
    if (!targetCol && Object.keys(columns).includes(over.id)) {
      targetCol = over.id;
    }
    if (!movingTask || !sourceCol || !targetCol) return;

    if (sourceCol === targetCol) {
      const oldIdx = columns[sourceCol].findIndex((i) => i.id === active.id);
      const newIdx = columns[targetCol].findIndex((i) => i.id === over.id);
      if (oldIdx !== newIdx) {
        setColumns((prev) => ({
          ...prev,
          [sourceCol]: arrayMove(prev[sourceCol], oldIdx, newIdx),
        }));
      }
    } else {
      setColumns((prev) => {
        const newSource = prev[sourceCol].filter((i) => i.id !== active.id);
        const newTarget = [...prev[targetCol], movingTask];
        return {
          ...prev,
          [sourceCol]: newSource,
          [targetCol]: newTarget,
        };
      });
      try {
        await actualizarTarea({ id: active.id, estado: targetCol });
      } catch {
        setError("No se pudo actualizar la tarea en la base de datos.");
      }
    }
  };

  if (loading) return <div className="p-8 text-center">Cargando tareas...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {Object.entries(columns).map(([col, tareas]) => (
          <DroppableColumn key={col} id={col} title={col}>
            <SortableContext
              items={tareas.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {tareas.map((tarea) => (
                <SortableItem key={tarea.id} tarea={tarea}>
                  <TaskCard
                    tarea={tarea}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </SortableItem>
              ))}
            </SortableContext>
          </DroppableColumn>
        ))}
      </div>
    </DndContext>
  );
}