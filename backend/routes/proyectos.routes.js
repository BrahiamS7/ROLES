import express from "express";
import db from "../db.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

//RUTAS
router.post("/upload", upload.single("imagen"), async (req, res) => {
  const { id } = req.body;
  try {
    const imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;

    await pool.query("UPDATE proyecto SET imagen = $1 WHERE id = $2", [
      imageUrl,
      id,
    ]);

    res.json({ url: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al subir imagen");
  }
});

router.post("/get", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM proyecto");
    const proyectos = result.rows;
    res.status(200).json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
});

router.post("/getP", async (req, res) => {
  const { id } = req.body;
  try {
    const result = await db.query("SELECT * FROM proyecto WHERE id=$1", [
      id.id,
    ]);
    const proyectos = result.rows;
    res.status(200).json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
});

router.post("/add", upload.single("imagen"), async (req, res) => {
  try {
    const { id, titulo, descrip } = req.body;
    let imageUrl = null;

    if (req.file) {
      imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;
    }

    await db.query(
      "INSERT INTO proyecto(titulo, descripcion, estado, imagen, admin_id) VALUES ($1, $2, 'Pendiente', $3, $4)",
      [titulo, descrip, imageUrl, id]
    );

    res
      .status(200)
      .json({ msg: "Proyecto agregado correctamente", url: imageUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await db.query("DELETE FROM proyecto WHERE id=$1", [id]);
    res.status(200).json({ msg: "Proyecto eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
});

router.put("/act", upload.single("imagen"), async (req, res) => {
  try {
    const { id, titulo, descrip, estado } = req.body;
    console.log(id);

    let imageUrl = null;
    if (req.file) {
      imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;
    } else {
      const result = await db.query("SELECT imagen FROM proyecto WHERE id=$1", [
        id,
      ]);
      imageUrl = result.rows[0]?.imagen;
    }

    await db.query(
      "UPDATE proyecto SET titulo=$1, descripcion=$2, estado=$3, imagen=$4 WHERE id=$5",
      [titulo, descrip, estado, imageUrl, id]
    );

    res
      .status(200)
      .json({ msg: "Proyecto actualizado correctamente", url: imageUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
});

router.put("/actEst/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    await db.query("UPDATE proyecto SET estado=$1 WHERE id=$2", [estado, id]);
    res
      .status(200)
      .json({ msg: "Estado del proyecto actualizado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
});

router.post("/getProyUser",async(req,res)=>{
  try {
    const {id}=req.body
    const result=await db.query("SELECT u.id, u.nombre FROM proyecto_usuarios pu INNER JOIN usuarios u ON pu.usuario_id = u.id WHERE pu.proyecto_id =$1;",[
      id
    ])
    const data=result.rows
    console.log(data);
    
    res.status(200).json({data})
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"Error por parte del servidor"})
  }
})



router.post("/addProyUser", async (req, res) => {
  try {
    const { idU, idP } = req.body;
    const idPr=idP.id
    
    await db.query("INSERT INTO proyecto_usuarios (proyecto_id, usuario_id) VALUES ($1,$2)",[
      idPr,idU
    ])
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteProyUser",async(req,res)=>{
  try {
    const {idU}=req.body;
    console.log(req.body);
    await db.query("DELETE FROM proyecto_usuarios WHERE usuario_id = $1",
      [idU]
    )
    res.status(200).json({msg:"Usuario eliminado correctamente del proyecto"})
  } catch (error) {
    console.log(error);
  }
})

export default router;
