// ==========================================================================
// CONTROLADOR DEL PRODUCTO
// ==========================================================================

// Importaciones
import productosModel from "../models/productos.model.js"

export async function getProductosWhere(requerimiento, respuesta) {
    try {
        // Seteamos los  Parametros
        const params = requerimiento.query;

        // Recuperamos las filas de la Base de Datos
        const [rows] = await productosModel.selectProductosWhere(params)

        // Validamos si se logro recuperar los Datos
        if (rows.length === 0) {
            return respuesta.status(404).json({
                message: "No se encontraron Productos"
            })
        }

        // OK
        respuesta.status(200).json({
            total: rows.length
            , payload: rows
        });

    } catch (error) {
        // Si falla la conexion a la BBDD
        // Si tardo demasiado
        // Si la tabla no existe
        // O si hay error de sintaxis
        console.log(`Error interno al obtener Productos. Detalle [${error.message}]`);
        respuesta.status(500).json({
            message: `Error interno al obtener Productos. Detalle [${error.message}]`
        })
    }
}

export async function getProductos(requerimiento, respuesta) {
    try {
        // Seteamos los  Parametros
        // const params = requerimiento.query;

        // Recuperamos las filas de la Base de Datos
        const [rows] = await productosModel.selectProductos();

        // Validamos si se logro recuperar los Datos
        if (rows.length === 0) {
            return respuesta.status(404).json({
                message: "No se encontraron Productos"
            })
        }

        // OK
        respuesta.status(200).json({
            total: rows.length
            , payload: rows
        });

    } catch (error) {
        // Si falla la conexion a la BBDD
        // Si tardo demasiado
        // Si la tabla no existe
        // O si hay error de sintaxis
        console.log(`Error interno al obtener Productos. Detalle [${error.message}]`);
        respuesta.status(500).json({
            message: `Error interno al obtener Productos. Detalle [${error.message}]`
        })
    }
}
