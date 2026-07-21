import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Home (ruta raíz)
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/home.html"));
});

// Formulario
router.get("/formulario", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/formulario.html"));
});

// Crear producto
router.get("/crearproducto", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/crearproducto.html"));
});

router.get("/producto",(req,res)=>{

    res.sendFile(
        path.join(__dirname,"../views/producto.html")
    );

});

// Navbar (si querés verla sola)
router.get("/narbar", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/narbar.html"));
});


export default router;