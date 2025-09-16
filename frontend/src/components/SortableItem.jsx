import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ id, title }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "1rem 1.5rem",
    margin: "0.5rem 0",
    backgroundColor: isDragging ? "#e3f2fd" : "#fff",
    borderRadius: "8px",
    boxShadow: isDragging
      ? "0 4px 16px rgba(33,150,243,0.15)"
      : "0 1px 3px rgba(0,0,0,0.08)",
    cursor: isDragging ? "grabbing" : "grab",
    userSelect: "none",
    touchAction: "none",
    outline: "none",
    border: isDragging ? "2px solid #2196f3" : "1px solid #e0e0e0",
    fontWeight: 500,
    fontSize: "1.05rem",
    color: "#222",
    transitionProperty: "background, box-shadow, border, transform",
    transitionDuration: "0.2s",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      tabIndex={0}
      aria-label={title}
      {...attributes}
      {...listeners}
    >
      {title}
    </div>
  );
}