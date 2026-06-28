import { Router } from "express";
import { registrarVenta } from "../controllers/ventas.controller.js";
import { validarCrearVenta } from "../middlewares/validaciones.js";

const ventasRouter = Router();

ventasRouter.post('/', validarCrearVenta, registrarVenta);

export default ventasRouter;
