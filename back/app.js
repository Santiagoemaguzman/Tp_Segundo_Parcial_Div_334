import express from "express";
import cors from "cors";
import environments from "./api/config/environment/environment.js";
import inicioRouter from "./api/routes/inicio.routes.js";
import productosRouter from "./api/routes/productos.routes.js";
import ventasRouter from "./api/routes/ventas.routes.js";

const app = express();
const PORT = environments.port;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/', inicioRouter);
app.use('/api/productos', productosRouter);
app.use('/api/ventas', ventasRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
