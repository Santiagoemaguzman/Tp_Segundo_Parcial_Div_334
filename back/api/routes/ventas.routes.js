import { Router } from "express";
import { registrarVenta, exportarVentas } from "../controllers/ventas.controller.js";
import { validarCrearVenta } from "../middlewares/validaciones.js";

const ventasRouter = Router();

ventasRouter.post('/', validarCrearVenta, registrarVenta);

ventasRouter.get('/export', exportarVentas);

export default ventasRouter;
