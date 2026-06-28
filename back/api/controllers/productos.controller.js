import { obtenerProductos as buscarProductos } from "../models/productos.model.js";

export async function obtenerProductos(req, res) {
    try {
        const productos = await buscarProductos(req.consultaProductos);
        res.status(200).json({ payload: productos });
    } catch (error) {
        console.log("Error obteniendo productos: ", error.message);
        res.status(500).json({ error: "No se pudieron obtener los productos" });
    }
}
