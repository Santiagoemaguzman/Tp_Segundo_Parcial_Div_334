import { Router } from "express";
import { indexView, getView, createView, updateView } from "../controllers/views.controller.js";
import { requerirLogin } from "../middlewares/autenticacion.js"


// Inicializamos el modulo router
const router = Router();

//Login

// Vista principal del dashboard
router.get("/", requerirLogin, indexView);

// Vista consultar producto
router.get("/get/:IDProducto", requerirLogin, getView);

// Vista crear producto
router.get("/post", requerirLogin, createView);

// Vista modificar producto
router.get("/put/:IDProducto", requerirLogin, updateView);

// // Vista eliminar producto
// router.get("/delete", deleteView);

export default router;