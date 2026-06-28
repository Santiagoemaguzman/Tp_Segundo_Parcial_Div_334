import { Router } from "express";
import { obtenerProductos } from "../controllers/productos.controller.js";
import { validarConsultaProductos } from "../middlewares/validaciones.js";

const productosRouter = Router();

productosRouter.get('/', validarConsultaProductos, obtenerProductos);

export default productosRouter;
