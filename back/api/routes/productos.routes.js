import { Router } from "express"; // Importamos el modulo Router
import { getProductos, createProducto, updateProducto, changeEstadoProducto, deleteProducto } from "../controllers/productos.controller.js";
import { validarConsultaProductos } from "../middlewares/validaciones.js";

// Inicializamos el modulo router
const router = Router();


router.get("/", validarConsultaProductos, getProductos);

router.post("/", createProducto);

router.put("/", updateProducto);

router.put("/changeEstado/", changeEstadoProducto);

router.delete("/", deleteProducto);

export default router;