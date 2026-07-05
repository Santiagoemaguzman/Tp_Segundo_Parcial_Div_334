// Importaciones
import express from "express";
import cors from "cors";
import session from "express-session";
import environment from "./api/config/environment.js";
import {
    productosRouter, ventasRouter, authRouter, viewsRouter
} from './api/routes/index.js'
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loggerURL } from "./api/middlewares/logger.js";

// import path from "node:path";
// import { fileURLToPath } from "node:url";
// import environments from "./api/config/environment/environment.js";
// import authRouter from "./api/routes/auth.routes.js";
// import dashboardRouter from "./api/routes/dashboard.routes.js";
// import inicioRouter from "./api/routes/inicio.routes.js";
// import productosRouter from "./api/routes/productos.routes.js";
// import ventasRouter from "./api/routes/ventas.routes.js";



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
app.use(express.static(path.join(currentDirectory, 'public')));
app.use('/assets', express.static(path.join(currentDirectory, '..', 'assets')));
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

// // Middleware de sesion
// app.use(session({
//     secret: session_key, // Firma las cookies para evitar manipulacion
//     resave: false, // Evita guardar la sesion si no hubo cambios
//     saveUninitialized: true // No guarda sesiones vacias
// }));


// ==============================================
// ROUTES
// ==============================================

// app.use('/', inicioRouter);
// app.use('/login', authRouter);
// app.use('/dashboard', dashboardRouter);


app.use('/api/productos', productosRouter);

app.use('/api/ventas', ventasRouter);

app.use("/login", authRouter);

app.use("/dashboard", viewsRouter);

// ==============================================

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);

    console.log(path.join(currentDirectory, 'views'));
});
