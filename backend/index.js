import express from "express";
import env from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import usuariosRoutes from "./routes/usuarios.routes.js";
import authRoutes from "./routes/auth.routes.js";
import tareasRoutes from "./routes/tareas.routes.js";
import proyectosRoutes from "./routes/proyectos.routes.js";
import subtareasRoutes from "./routes/subtareas.routes.js";

env.config();

// CONSTANTES
const app = express();
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir carpeta uploads en /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// RUTAS GET
app.get("/", (req, res) => {
  res.send("API FUNCIONANDO CORRECTAMENTE!");
});

// RUTAS
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notas", tareasRoutes);
app.use("/api/proyectos", proyectosRoutes);
app.use("/api/subtareas", subtareasRoutes);

// RUTA LISTEN
app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
