import express from "express";
import db from "../db.js";

const router = express.Router();
//RUTAS GET
router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM usuarios WHERE rol='usuario'");
  const data = result.rows;
  res.json(data);
});
router.get("/info/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;
    const result = await db.query("SELECT * FROM usuarios WHERE nombre=$1", [
      nombre,
    ]);
    const data = result.rows;
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"error"})
    
  }
});

//RUTAS POST

export default router;
