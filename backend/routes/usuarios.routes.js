import express from "express";
import db from "../db.js";

const router = express.Router();
//RUTAS GET
router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM usuarios");
  const data = result.rows;
  res.json(data);
});

//RUTAS POST


export default router;
