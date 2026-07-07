// Importaciones
import express from "express";
import cors from "cors";
import session from "express-session";
import environment from "./api/config/environment.js";
import {
    productosRouter, ventasRouter
    , authRouter, viewsRouter, usuariosRouter
} from './api/routes/index.js'
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loggerURL } from "./api/middlewares/logger.js";
import { exec } from 'child_process';

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

app.use(express.urlencoded({ extended: true }));

// Middleware de sesion
app.use(session({
    name: 'poketcg.sid',
    secret: environment.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 4
    }
}));

// Middleware logear para mostrar todas las solicitudes por consola
app.use(loggerURL);

// Middleware parsear datos del <form> como Objetos
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estaticos
app.use('/assets', express.static(path.join(currentDirectory, '..', 'assets')));
app.use('/css', express.static(path.join(currentDirectory, 'css')));
app.use('/shared', express.static(path.join(currentDirectory, '..', 'shared')));
app.use('/productos-imgs', express.static(path.join(currentDirectory, 'productos-imgs')));
app.use('/front', express.static(path.join(currentDirectory, '..', 'front')));


// ==============================================
// ROUTES
// ==============================================

app.use('/api/productos', productosRouter);

app.use('/api/ventas', ventasRouter);

app.use("/login", authRouter);

app.use("/dashboard", viewsRouter);

app.use("/users", usuariosRouter);

// ==============================================

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);

    const url = 'http://localhost:3000/front/pages/bienvenida.html';
    // const comando = process.platform === 'win32' ? `start ${url}` :
    //                 process.platform === 'darwin' ? `open ${url}` :
    //                 `xdg-open ${url}`;

    exec(`start ${url}`);


});
