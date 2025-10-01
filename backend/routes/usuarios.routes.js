import express from "express";
import db from "../db.js";

const router = express.Router();
//RUTAS GET
router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM usuarios WHERE rol='usuario'");
  const data = result.rows;
  res.json(data);
});

router.post("/usersDisp",async(req, res)=>{
  try {
    const result=await db.query("SELECT u.id, u.nombre FROM usuarios u LEFT JOIN proyecto_usuarios pu ON u.id = pu.usuario_id WHERE pu.usuario_id IS NULL;")
    const data=result.rows;
    res.status(200).json(data)
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:'Error por parte del servidor'});
  }
})

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
