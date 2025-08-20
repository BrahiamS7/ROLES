import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";
import env from "dotenv";
env.config();

const router = express.Router();
const SECRET = process.env.SECRET_WORD;

//RUTAS GET

// RUTAS POST
router.post("/register", async (req, res) => {
  try {
    const { nombre, contra } = req.body;
    const hashedContra = await bcrypt.hash(contra, 10);
    await db.query(
      "INSERT INTO usuarios (nombre,contra,rol) VALUES ($1,$2,'usuario')",
      [nombre, hashedContra]
    );
    res.status(200).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error registrando usuario" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { nombre, contra } = req.body;
    const result = await db.query("SELECT * FROM usuarios WHERE nombre=$1", [
      nombre,
    ]);
    const user = result.rows[0];
    if (!user) return res.status(400).json({ msg: "Usuario no encontrado" });
    const validContra = await bcrypt.compare(contra, user.contra);
    if (!validContra)
      return res
        .status(400)
        .json({ msg: "Usuario y/o contraseña incorrectos" });
    const token = jwt.sign({ id: user.id, nombre: user.nombre }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el login" });
  }
});
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
router.get("/profile",verifyToken,async(req,res)=>{
    try {
        const result=await db.query("SELECT id,nombre FROM usuario WHERE id=$1",[req.user.id]);
        res.json({msg:"Perfil cargado",user:result.rows[0]})
    } catch (error) {
        res.status(500).json({msg:"Error en el servidor"})
    }
})

export default router;
