import express from "express";
import cors from "cors";
import session from "express-session";
import path from "node:path";
import { fileURLToPath } from "node:url";
import environments from "./api/config/environment/environment.js";
import authRouter from "./api/routes/auth.routes.js";
import dashboardRouter from "./api/routes/dashboard.routes.js";
import inicioRouter from "./api/routes/inicio.routes.js";
import productosRouter from "./api/routes/productos.routes.js";
import ventasRouter from "./api/routes/ventas.routes.js";

const app = express();
const PORT = environments.port;
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs');
app.set('views', path.join(currentDirectory, 'views'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(currentDirectory, 'public')));
app.use('/assets', express.static(path.join(currentDirectory, '..', 'assets')));
app.use(session({
    name: 'poketcg.sid',
    secret: environments.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 4
    }
}));

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/', inicioRouter);
app.use('/login', authRouter);
app.use('/dashboard', dashboardRouter);
app.use('/api/productos', productosRouter);
app.use('/api/ventas', ventasRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
