import { Router } from "express"; // Importamos el modulo Router
import { getProductosWhere, getProductos } from "../controllers/productos.controller.js";
import { validarConsultaProductos } from "../middlewares/validaciones.js";

// Inicializamos el modulo router
const router = Router();


router.get("/", validarConsultaProductos, getProductosWhere);

//router.get("/", getProductos);


export default router;