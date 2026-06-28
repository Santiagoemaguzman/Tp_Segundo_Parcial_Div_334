import { Router } from "express";
import { mostrarInicio } from "../controllers/inicio.controller.js";

const inicioRouter = Router();

inicioRouter.get('/', mostrarInicio);

export default inicioRouter;
