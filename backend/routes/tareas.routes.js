import express from "express";
import db from "../db.js";

const router = express.Router();
//RUTAS
router.post("/add", async (req, res) => {
  try {
    const { titulo, descrip, id } = req.body;
    console.log(titulo, descrip, id);

    await db.query(
      "INSERT INTO tareas_personales (titulo,descripcion,estado,usuario_id) VALUES ($1,$2,'Pendiente',$3)",
      [titulo, descrip, id]
    );
    res.status(200).json({ msg: "Tarea agregada correctamente" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/getTareas", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await db.query("SELECT * FROM tareas_personales WHERE usuario_id=$1", [
      id,
    ]);
    const tareas = result.rows;

    res.status(200).json({ msg: "Tareas cargadas correctamente", tareas });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const id = req.body.id;
    await db.query("DELETE FROM tareas_personales * WHERE id=$1", [id]);
    res.status(200).json({ msg: "Tarea eliminada correctamente" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/act", async (req, res) => {
  const { id, titulo, descrip, estado } = req.body;
  try {
    await db.query(
      "UPDATE tareas_personales SET titulo=$1, descripcion=$2, estado=$3 WHERE id=$4",
      [titulo, descrip, estado, id]
    );
    res.status(200).json({ msg: "Tarea actualizada correctamente" });
  } catch (error) {
    console.log(error);
  }
});
router.put("/actEst/:id", async (req, res) => {
  const {id} = req.params;
  const { estado } = req.body;
  console.log(id, estado);

  try {
    await db.query("UPDATE tareas_personales SET estado=$1 WHERE id=$2", [estado, id]);
    res.status(200).json({ msg: "Tarea actualizada correctamente" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
