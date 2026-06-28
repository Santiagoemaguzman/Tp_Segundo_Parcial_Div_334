// Importaciones
import express from "express";
import environment from "./api/config/environment.js";
import cors from "cors";
import { inicioRouter, productosRouter, ventasRouter } from './api/routes/index.js'

const app = express();
const PORT = environment.port;

app.use(cors());
app.use(express.json());

// Middleware logegr para mostrar todas las solicitudes por consola
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next(); // Pasa al siguiente middleware o continua a procesar la respuesta
});

// Rutas
app.use('/', inicioRouter);
app.use('/api/productos', productosRouter);
app.use('/api/ventas', ventasRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
