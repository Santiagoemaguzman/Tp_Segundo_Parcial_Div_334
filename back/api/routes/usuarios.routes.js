import { Router } from "express"; // Importamos el modulo Router
import { createUsuario } from "../controllers/usuarios.controller.js";

// Inicializamos el modulo router
const router = Router();

router.post("/", createUsuario);

export default router;