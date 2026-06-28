import { Router } from "express"; // Importamos el modulo Router
//import { validateId, validateProduct } from "../middlewares/middlewares.js";
import { getProductosWhere, getProductos } from "../controllers/productos.controller.js";

// Inicializamos el modulo router
const router = Router();


router.get("/", getProductosWhere);

router.get("/", getProductos);


export default router;
