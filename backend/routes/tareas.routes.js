import express from "express";
import db from "../db.js";

const router = express.Router();
//RUTAS GET

//RUTAS POST
router.post("/add", async (req, res) => {
  try {
    const { titulo, descrip, id } = req.body;
    console.log(titulo, descrip, id);

    await db.query(
      "INSERT INTO tareas (titulo,descripcion,estado,usuario_id) VALUES ($1,$2,'Pendiente',$3)",
      [titulo, descrip, id]
    );
    res.status(200).json({ msg: "Tarea agregada correctamente" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/getTareas", async (req, res) => {
  try {
    const id = req.body.id;
    const result = await db.query("SELECT * FROM tareas WHERE usuario_id=$1", [
      id,
    ]);
    const tareas = result.rows;
    res.status(200).json({ msg: "Tareas cargadas correctamente", tareas });
  } catch (error) {
    console.log(error);
  }
});
router.post("/delete", async (req, res) => {
  try {
    const id = req.body.id;
    await db.query("DELETE FROM tareas * WHERE id=$1", [id]);
    res.status(200).json({ msg: "Tarea eliminada correctamente" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
