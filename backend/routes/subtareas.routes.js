import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/get", async (req, res) => {
  try {
    const idP = req.body.id;
    const result = await db.query(
      "SELECT * FROM subtareas WHERE proyecto_id=$1",
      [idP]
    );
    const data = result.rows;
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const { titulo, descrip, prior } = req.body;
    const idP = req.body.id.id;
    console.log(idP);
    await db.query(
      "INSERT INTO subtareas (titulo,descripcion,estado,prioridad,proyecto_id) VALUES ($1,$2,'Pendiente',$3,$4)",
      [titulo, descrip, prior, idP]
    );
    res.status(200).json({ msg: "Agregado correctamente!" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/act", async (req, res) => {
  try {
    console.log(req.body);
    const { titulo, descrip, prior, idT } = req.body;

    if (req.body.userId) {
      const idU = req.body.userId;
      await db.query(
        "UPDATE subtareas SET titulo=$1, descripcion=$2, prioridad=$3, usuario_id=$4  WHERE id=$5",
        [titulo, descrip, prior, idU, idT]
      );
    }
    await db.query(
      "UPDATE subtareas SET titulo=$1, descripcion=$2, prioridad=$3 WHERE id=$4",
      [titulo, descrip, prior, idT]
    );
    res
      .status(200)
      .json({ msg: "Estado del proyecto actualizado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
});

router.post("/getUserSubT", async (req, res) => {
  try {
    const response = await db.query(
      "SELECT s.id, s.titulo, s.descripcion, s.estado,s.prioridad, p.titulo AS proyecto FROM subtareas s JOIN proyecto p ON s.proyecto_id = p.id WHERE s.usuario_id = $1;"
    );
    const data = response.rows;
    res.status(200).json({data,msg:"Tareas cargadas exitosamente"})
  } catch (error) {
    console.log(error );
  }
});

export default router;
