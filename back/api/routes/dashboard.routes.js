import { Router } from "express";
import { mostrarDashboard } from "../controllers/dashboard.controller.js";
import { requerirLogin } from "../middlewares/autenticacion.js";

const dashboardRouter = Router();

dashboardRouter.get('/', requerirLogin, mostrarDashboard);

export default dashboardRouter;
