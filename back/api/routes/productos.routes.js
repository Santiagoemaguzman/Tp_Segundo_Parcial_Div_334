import { Router } from "express"; // Importamos el modulo Router
import { getProductos, createProducto, updateProducto, changeEstadoProducto, deleteProducto } from "../controllers/productos.controller.js";
import { validarConsultaProductos } from "../middlewares/validaciones.js";
import { multerUploader } from "../middlewares/multer.js";

// Inicializamos el modulo router
const router = Router();

router.get("/", validarConsultaProductos, getProductos);

router.post("/", multerUploader.single("image"), createProducto );

router.put("/", multerUploader.single("image"), updateProducto);

router.put("/changeEstado/", changeEstadoProducto);

router.delete("/", deleteProducto);

export default router;