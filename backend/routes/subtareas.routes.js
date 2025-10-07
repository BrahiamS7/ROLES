import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/get", async (req, res) => {
  try {
    const idP=req.body.id
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
    const idP=req.body.id.id
    console.log(idP);
    await db.query(
      "INSERT INTO subtareas (titulo,descripcion,estado,prioridad,proyecto_id) VALUES ($1,$2,'Pendiente',$3,$4)",
      [titulo, descrip, prior, idP]
    );
    res.status(200).json({msg:"Agregado correctamente!"})
  } catch (error) {
    console.log(error);
    
  }
});

export default router;
