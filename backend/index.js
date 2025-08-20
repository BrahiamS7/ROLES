// IMPORTACIONES
import express from "express";
import env from "dotenv";
import cors from "cors";
import usuariosRoutes from "./routes/usuarios.routes.js";
import authRoutes from "./routes/auth.routes.js"

env.config();

//CONSTANTES
const app = express();
const port = process.env.PORT;

//UTILIDADES
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//RUTAS GET
app.get("/", (req, res) => {
  res.send("API FUNCIONANDO CORRECTAMENTE!");
});

//RUTAS
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/auth",authRoutes);

//RUTA LISTEN
app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
