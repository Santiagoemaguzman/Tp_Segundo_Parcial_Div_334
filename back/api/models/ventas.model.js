import connection from "../database/database.js";

function crearError(mensaje, status) {
    const error = new Error(mensaje);
    error.status = status;
    return error;
}

export async function registrarVenta(cliente, productosSolicitados) {
    const idsProductos = productosSolicitados.map((producto) => producto.id);
    let transaction;

    try {
        transaction = await connection.getConnection();
        await transaction.beginTransaction();

        const placeholders = idsProductos.map(() => '?').join(', ');
        const [productosDB] = await transaction.query(
            `SELECT IDProducto, Producto, Importe, Stock
             FROM Productos
             WHERE IDProducto IN (${placeholders}) AND Estado = 1
             FOR UPDATE`,
            idsProductos
        );

        if (productosDB.length !== productosSolicitados.length) {
            throw crearError("Uno o más productos no existen o están inactivos", 400);
        }

        const detalleVenta = productosSolicitados.map((productoSolicitado) => {
            const productoDB = productosDB.find(
                (producto) => producto.IDProducto === productoSolicitado.id
            );

            if (productoDB.Stock < productoSolicitado.cantidad) {
                throw crearError(`Stock insuficiente para ${productoDB.Producto}`, 400);
            }

            const precioIndividual = Number(productoDB.Importe);

            return {
                id: productoDB.IDProducto,
                nombre: productoDB.Producto,
                cantidad: productoSolicitado.cantidad,
                precioIndividual,
                subtotal: Number((precioIndividual * productoSolicitado.cantidad).toFixed(2))
            };
        });
        const importeTotal = Number(
            detalleVenta.reduce((total, producto) => total + producto.subtotal, 0).toFixed(2)
        );
        const [ventaResult] = await transaction.query(
            `INSERT INTO Ventas (ImporteTotal, Cliente, UsuarioAlta)
             VALUES (?, ?, ?)`,
            [importeTotal, cliente, cliente]
        );
        const detallePlaceholders = detalleVenta.map(() => '(?, ?, ?)').join(', ');
        const detalleParams = detalleVenta.flatMap((producto) => [
            ventaResult.insertId,
            producto.id,
            producto.cantidad
        ]);

        await transaction.query(
            `INSERT INTO VentasProductos (IDVenta, IDProducto, ProductoCantidad)
             VALUES ${detallePlaceholders}`,
            detalleParams
        );

        for (const producto of detalleVenta) {
            const [stockResult] = await transaction.query(
                `UPDATE Productos
                 SET Stock = Stock - ?
                 WHERE IDProducto = ? AND Stock >= ?`,
                [producto.cantidad, producto.id, producto.cantidad]
            );

            if (stockResult.affectedRows !== 1) {
                throw crearError(`No se pudo actualizar el stock de ${producto.nombre}`, 409);
            }
        }

        const [ventas] = await transaction.query(
            'SELECT FechaAlta FROM Ventas WHERE IDVenta = ?',
            [ventaResult.insertId]
        );

        await transaction.commit();

        return {
            idVenta: ventaResult.insertId,
            cliente,
            fecha: ventas[0].FechaAlta,
            productos: detalleVenta,
            total: importeTotal
        };
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        throw error;
    } finally {
        if (transaction) {
            transaction.release();
        }
    }
}


export async function selectVentasToExportExcel() {

    const query = `
    SELECT
        VNT.IDVenta
        , VNT.Cliente
        , PRD.IDProducto 
        , PRD.Producto 
        , PRD.Importe AS PrecioUnitario
        , VXP.ProductoCantidad
        , PRD.Importe * VXP.ProductoCantidad AS SubTotal
        , VNT.ImporteTotal AS Total
        , VNT.FechaAlta AS FechaVenta
    FROM
        Ventas VNT
        INNER JOIN VentasProductos VXP ON VNT.IDVenta = VXP.IDVenta
        INNER JOIN Productos PRD ON VXP.IDProducto = PRD.IDProducto
    ORDER BY 
        VNT.IDVenta DESC`;

    return connection.query(query);
}