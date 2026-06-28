import { registrarVenta as guardarVenta } from "../models/ventas.model.js";

export async function registrarVenta(req, res) {
    const { cliente, productos } = req.ventaValidada;

    try {
        const venta = await guardarVenta(cliente, productos);
        res.status(201).json({ payload: venta });
    } catch (error) {
        console.log("Error registrando venta: ", error.message);
        res.status(error.status || 500).json({
            error: error.status ? error.message : "No se pudo registrar la venta"
        });
    }
}
