import { registrarVenta as guardarVenta, selectVentasToExportExcel } from "../models/ventas.model.js";
import exceljs from "exceljs";

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

export async function exportarVentas(req, res) {

    try {
        const [rows] = await selectVentasToExportExcel();

        // Validamos si se logro recuperar los Datos
        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron Productos"
            })
        }

        // 2. Crear libro y hoja
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet("Ventas");

        // 3. Definir columnas del Excel
        worksheet.columns = [
            { header: "IDVenta", key: "IDVenta", width: 10 },
            { header: "Comprador", key: "Cliente", width: 25 },
            { header: "IDProducto", key: "IDProducto", width: 25 },
            { header: "Producto", key: "Producto", width: 25 },
            { header: "Precio Unitario", key: "PrecioUnitario", width: 25 },
            { header: "Cantidad", key: "ProductoCantidad", width: 25 },
            { header: "SubTotal por Producto", key: "SubTotal", width: 25 },
            { header: "Total Venta", key: "Total", width: 25 },
            { header: "Fecha Venta", key: "FechaVenta", width: 25 },
        ];

        // 4. Insertar datos
        rows.forEach(row => worksheet.addRow(row));

        // 5. Cabeceras HTTP para descarga
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", "attachment; filename=PokeTCGService-Ventas.xlsx");

        // 6. Enviar el archivo Excel
        await workbook.xlsx.write(res);

        res.end();

    } catch (error) {
        console.log(`Error interno al obtener Ventas. Detalle [${error.message}]`);
        res.status(500).json({
            message: `Error interno al obtener Ventas. Detalle [${error.message}]`
        })
    }
}
