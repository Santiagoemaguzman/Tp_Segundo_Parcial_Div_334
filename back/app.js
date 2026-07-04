// Importaciones
import express from "express";
import cors from "cors";
import session from "express-session";
import environment from "./api/config/environment.js";
import {
    inicioRouter, productosRouter, ventasRouter, viewsRouter
} from './api/routes/index.js'
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loggerURL } from "./api/middlewares/logger.js";



// 
const app = express();
const PORT = environment.port;
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

// Configuracion EJS
app.set("view engine", "ejs");
app.set('views', path.join(currentDirectory, 'views'));

// ==============================================
// MIDLEWARES
// ==============================================

// Middleware CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Middleware logear para mostrar todas las solicitudes por consola
app.use(loggerURL);

// Middleware parsear datos del <form> como Objetos
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estaticos
app.use('/assets', express.static(path.join(currentDirectory, '..', 'assets')));
app.use('/css', express.static(path.join(currentDirectory, 'css')));
app.use('/shared', express.static(path.join(currentDirectory, '..', 'shared')));

// // Middleware de sesion
// app.use(session({
//     secret: session_key, // Firma las cookies para evitar manipulacion
//     resave: false, // Evita guardar la sesion si no hubo cambios
//     saveUninitialized: true // No guarda sesiones vacias
// }));


// ==============================================
// ROUTES
// ==============================================
app.use('/api/productos', productosRouter);

app.use('/api/ventas', ventasRouter);

app.use("/back", viewsRouter);

// ==============================================

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);

    console.log(path.join(currentDirectory, 'views'));
});
