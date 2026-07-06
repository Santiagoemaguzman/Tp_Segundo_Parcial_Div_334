// ==========================================================================
// CONTROLADOR DEL PRODUCTO
// ==========================================================================

// Importaciones
import productosModel from "../models/productos.model.js"

export async function getProductos(req, res) {
    try {

        const params = req.query;

        let rows;

        if (Object.keys(params).length > 0) {
            [rows] = await productosModel.selectProductosWhere(params);
        } else {
            [rows] = await productosModel.selectProductos();
        }

        // Validamos si se logro recuperar los Datos
        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron Productos"
            })
        }

        // OK
        res.status(200).json({
            total: rows.length
            , payload: rows
        });

    } catch (error) {
        // Si falla la conexion a la BBDD
        // Si tardo demasiado
        // Si la tabla no existe
        // O si hay error de sintaxis
        console.log(`Error interno al obtener Productos. Detalle [${error.message}]`);
        res.status(500).json({
            message: `Error interno al obtener Productos. Detalle [${error.message}]`
        })
    }
}

export async function createProducto(req, res) {

    try {

        const { Producto, IDTipoProducto, Importe } = req.body;

        const ImagenPath = req.file.filename ? "../../back/productos-imgs/" + req.file.filename : undefined;

        if (!Producto || !IDTipoProducto || !Importe || !ImagenPath) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de incluir todas las categorias"
            });
        }

        const [row] = await productosModel.insertProductos({ producto: Producto.trim(), tipoProducto: IDTipoProducto, importe: Importe, imgPath: ImagenPath });

        res.status(201).json({
            message: `Producto creado con exito con id ${row.insertId}`,
            productId: row.insertId
        });

    } catch (error) {
        console.log(`Error interno al crear Producto. Detalle [${error.message}]`);
        res.status(500).json({
            message: `Error interno al crear Producto. Detalle [${error.message}]`
        })
    }
}

export async function updateProducto(req, res) {
    try {

        const { Producto, IDTipoProducto, Importe, ImagenPath, IDProducto } = req.body;

        let ImagenPathFinal = ImagenPath;
        if (req.file) {
            console.log(req.file);
            ImagenPathFinal = "../../back/productos-imgs/" + req.file.filename;
        }

        if (!Producto || !IDTipoProducto || !Importe || !IDProducto) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de incluir todas las categorias"
            });
        }

        const [row] = await productosModel.updateProductosWhereIDProducto({ id: IDProducto, producto: Producto.trim(), tipoProducto: IDTipoProducto, importe: Importe, imgPath: ImagenPathFinal });

        res.status(201).json({
            message: `Producto con ID ${IDProducto} modificado con exito`,
            productId: IDProducto
        });

    } catch (error) {
        console.log(`Error interno al modificar Producto. Detalle [${error.message}]`);
        res.status(500).json({
            message: `Error interno al modificar Producto. Detalle [${error.message}]`
        })
    }
}

export async function changeEstadoProducto(req, res) {


    let estadoString, estadoStringAccion;

    try {

        const { IDProducto, Estado } = req.body;
        estadoString = Estado == 1 ? "habilitado" : "deshabilitado"
        estadoStringAccion = Estado == 1 ? "habilitar" : "deshabilitar"

        if (!IDProducto || !Estado) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de incluir todas las categorias"
            });
        }

        //ImagenPath

        const [row] = await productosModel.updateProductosEstadoWhereIDProducto({ id: IDProducto, estado: Estado });

        res.status(201).json({
            message: `Producto con ID ${IDProducto} ${estadoString} con exito`,
        });

    } catch (error) {
        console.log(`Error interno al ${estadoStringAccion} Producto. Detalle [${error.message}]`);
        res.status(500).json({
            message: `Error interno al ${estadoStringAccion} Producto. Detalle [${error.message}]`
        })
    }
}

export async function deleteProducto(req, res) {

    try {

        const { IDProducto } = req.body;

        console.log(IDProducto);

        //ImagenPath

        await productosModel.deleteProductosWhereIDProducto({ id: IDProducto });

        res.status(200).json({
            message: `Producto con ID ${IDProducto} eliminado con exito`,
        });

    } catch (error) {
        console.log(`Error interno al eliminar Producto. Detalle [${error.message}]`);
        res.status(500).json({
            message: `Error interno al eliminar Producto. Detalle [${error.message}]`
        })
    }
}


