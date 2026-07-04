import { Router } from "express";
import { cerrarSesion, iniciarSesion, mostrarLogin } from "../controllers/auth.controller.js";
import { validarLogin } from "../middlewares/autenticacion.js";

const authRouter = Router();

authRouter.get('/', mostrarLogin);
authRouter.post('/', validarLogin, iniciarSesion);
authRouter.post('/salir', cerrarSesion);

export default authRouter;
