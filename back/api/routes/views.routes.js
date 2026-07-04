import { Router } from "express";
import { loginView, indexView } from "../controllers/views.controller.js";

// Inicializamos el modulo router
const router = Router();

//Login
router.get("/login", loginView);


// Vista principal del dashboard
router.get("/", indexView);

// // Vista consultar producto
// router.get("/get", getView);

// // Vista crear producto
// router.get("/post", createView);

// // Vista modificar producto
// router.get("/put", updateView);

// // Vista eliminar producto
// router.get("/delete", deleteView);

export default router;