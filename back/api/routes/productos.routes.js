import { Router } from "express"; // Importamos el modulo Router
import { getProductos, createProducto, updateProducto } from "../controllers/productos.controller.js";
import { validarConsultaProductos } from "../middlewares/validaciones.js";

// Inicializamos el modulo router
const router = Router();


router.get("/", validarConsultaProductos, getProductos);

router.post("/", createProducto);

router.put("/", updateProducto);

router.put("/enabled/", updateProducto);


export default router;