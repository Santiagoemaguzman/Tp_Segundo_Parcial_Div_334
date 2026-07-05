// ==========================================================================
// CONTROLADOR DE VISTAS
// ==========================================================================

// Importaciones
import productosModel from "../models/productos.model.js"


export async function indexView(req, res) {

    const nombreUsuario = req.session.usuario.nombre;

    try {

        const [rows] = await productosModel.selectProductos();

        if (rows.length === 0) {
            return respuesta.status(404).send(
                "No se encontraron Productos"
            )
        }

        res.status(200).render("dashboard", {
            usuario: nombreUsuario
            , productosArray: rows
        });

    } catch (error) {
        console.error("Error al renderizar el dashboard:", error);
        res.status(500).send("Error interno del servidor");
    }
}

// Vista GET
export async function getView(req, res) {

    const nombreUsuario = req.session.usuario.nombre;

    const IDProducto = req.params.IDProducto;

    try {
        const [rowProducto] = await productosModel.selectProductosWhereIDProducto({ IDProducto: IDProducto });

        const [rowTipos] = await productosModel.selectTipoProductos();

        if (rowProducto.length === 0 || rowTipos.length === 0) {
            return respuesta.status(404).send(
                "No se encontraron Productos"
            )
        }

        const producto = rowProducto[0];

        const tipos = rowTipos;

        res.status(200).render("get", {
            usuario: nombreUsuario
            , producto: producto
            , tipoProductos: tipos
        });

    } catch (error) {
        console.error("Error al renderizar el dashboard:", error);
        res.status(500).send("Error interno del servidor");
    }
}

// Vista POST
export async function createView(req, res) {

    const nombreUsuario = req.session.usuario.nombre;

    try {
        const [rowTipos] = await productosModel.selectTipoProductos();

        if (rowTipos.length === 0) {
            return respuesta.status(404).send(
                "No se encontraron Productos"
            )
        }

        const tipos = rowTipos;

        res.status(200).render("post", {
            usuario: nombreUsuario
            , tipoProductos: tipos
        });

    } catch (error) {
        console.error("Error al renderizar el dashboard:", error);
        res.status(500).send("Error interno del servidor");
    }
}

// Vista PUT
export async function updateView(req, res) {

    console.log('updateView');

    const nombreUsuario = req.session.usuario.nombre;

    const IDProducto = req.params.IDProducto;

    try {
        const [rowProducto] = await productosModel.selectProductosWhereIDProducto({ IDProducto: IDProducto });

        const [rowTipos] = await productosModel.selectTipoProductos();

        if (rowProducto.length === 0 || rowTipos.length === 0) {
            return respuesta.status(404).send(
                "No se encontraron Productos"
            )
        }

        const producto = rowProducto[0];

        const tipos = rowTipos;

        res.status(200).render("put", {
            usuario: nombreUsuario
            , producto: producto
            , tipoProductos: tipos
        });

    } catch (error) {
        console.error("Error al renderizar el dashboard:", error);
        res.status(500).send("Error interno del servidor");
    }

}

// // Vista DELETE
// export const deleteView = (req, res) => {
//     res.render("delete");
// }