//////////////////
// Importaciones
// Esta es la sintaxis nueva de importar y exportar modulos de ESM -> type: module en el package.jjson
import express from "express";
import environments from "./api/config/environment/environment.js";
import connection from "./api/config/database/database.js";
import cors from "cors";



///////////
// Config
const app = express();
const PORT = environments.port;



/////////////////
// Middlewares
app.use(cors()); // Middleware CORS basico para permitir todas las solicitudes
app.use(express.json());

// Middleware logegr para mostrar todas las solicitudes por consola
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next(); // Pasa al siguiente middleware o continua a procesar la respuesta
});

// TO DO:  Middleware para parsear a JSON en las solicitudes POST y PUT



/////////////
// Endpoints


app.get("/", (req, res) => {
    res.send("Hola mundo");
});


// GET all products
app.get("/api/productos", async (req, res) => {

    const {
        producto = '',
        tipoProducto = '1',
        orderBy = '1'
    } = req.query;

    let query = 'SELECT * FROM Productos WHERE 1 = 1';
    const queryParams = [];

    if (producto !== '') {
        query += ' AND Producto LIKE ?';
        queryParams.push(`%${producto}%`);
    }

    //--

    const TIPOPRODUCTO_TODOS = 1;
    const TIPOPRODUCTO_BOOSTERS = 2;
    const TIPOPRODUCTO_SINGLES = 3;

    switch (parseInt(tipoProducto, 10)) {
        case TIPOPRODUCTO_BOOSTERS:
            query += " AND IDTipoProducto = 1"
            break;
        case TIPOPRODUCTO_SINGLES:
            query += " AND IDTipoProducto = 2"
            break;
        case TIPOPRODUCTO_TODOS:
        default:
            break;
    }

    //--

    const ORDEN_ALFA_ASC = 1;
    const ORDEN_ALFA_DESC = 2;
    const ORDEN_PRECIO_ASC = 3;
    const ORDEN_PRECIO_DESC = 4;

    switch (parseInt(orderBy, 10)) {
        case ORDEN_ALFA_DESC:
            query += " ORDER BY Producto DESC"
            break;
        case ORDEN_PRECIO_ASC:
            query += " ORDER BY Importe ASC"
            break;
        case ORDEN_PRECIO_DESC:
            query += " ORDER BY Importe DESC"
            break;
        case ORDEN_ALFA_ASC:
        default:
            query += " ORDER BY Producto ASC"
            break;
    }

    //--

    query += ' LIMIT 10'

    try {
        const sql = query;
        const [rows] = await connection.query(sql, queryParams); // En rows guardamos los resultados de nuestra sentencia SQL
        // console.log(rows);

        // el objeto res nos permitira devolver un codigo de estado y un tipo de respuesta
        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log("Error obteniendo productos: ", error.message);
        res.status(500).json({
            error: "No se pudieron obtener los productos"
        });
    }
});

// POST sale
app.post("/api/ventas", async (req, res) => {
    const { cliente, productos } = req.body;

    if (typeof cliente !== 'string' || cliente.trim() === '' || cliente.length > 255) {
        return res.status(400).json({ error: "El nombre del cliente es inválido" });
    }

    if (!Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ error: "El carrito está vacío" });
    }

    const productosSolicitados = productos.map((producto) => ({
        id: Number(producto.id),
        cantidad: Number(producto.cantidad)
    }));
    const productosValidos = productosSolicitados.every((producto) =>
        Number.isInteger(producto.id)
        && producto.id > 0
        && Number.isInteger(producto.cantidad)
        && producto.cantidad > 0
    );

    if (!productosValidos) {
        return res.status(400).json({ error: "El carrito contiene productos inválidos" });
    }

    const idsProductos = productosSolicitados.map((producto) => producto.id);
    const idsUnicos = new Set(idsProductos);

    if (idsUnicos.size !== idsProductos.length) {
        return res.status(400).json({ error: "El carrito contiene productos repetidos" });
    }

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
            const error = new Error("Uno o más productos no existen o están inactivos");
            error.status = 400;
            throw error;
        }

        const detalleVenta = productosSolicitados.map((productoSolicitado) => {
            const productoDB = productosDB.find(
                (producto) => producto.IDProducto === productoSolicitado.id
            );

            if (productoDB.Stock < productoSolicitado.cantidad) {
                const error = new Error(`Stock insuficiente para ${productoDB.Producto}`);
                error.status = 400;
                throw error;
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
        const nombreCliente = cliente.trim();
        const [ventaResult] = await transaction.query(
            `INSERT INTO Ventas (ImporteTotal, Cliente, UsuarioAlta)
             VALUES (?, ?, ?)`,
            [importeTotal, nombreCliente, nombreCliente]
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
                const error = new Error(`No se pudo actualizar el stock de ${producto.nombre}`);
                error.status = 409;
                throw error;
            }
        }

        const [ventas] = await transaction.query(
            'SELECT FechaAlta FROM Ventas WHERE IDVenta = ?',
            [ventaResult.insertId]
        );

        await transaction.commit();

        res.status(201).json({
            payload: {
                idVenta: ventaResult.insertId,
                cliente: nombreCliente,
                fecha: ventas[0].FechaAlta,
                productos: detalleVenta,
                total: importeTotal
            }
        });
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.log("Error registrando venta: ", error.message);
        res.status(error.status || 500).json({
            error: error.status ? error.message : "No se pudo registrar la venta"
        });
    } finally {
        if (transaction) {
            transaction.release();
        }
    }
});


// // Get product by id
// app.get("/api/products/:id", async (req, res) => {
//     try {
//         // Gracias al destructuring, agarramos el valor id de req.params
//         const { id } = req.params;
//         // const id = req.params.id -> misma solucion

//         // Este interrogante es el placeholder
//         const sql = "SELECT * FROM products where products.id = ?";
//         const [rows] = await connection.query(sql, [id]);
//         // console.log(rows);

//         res.status(200).json({
//             payload: rows
//         });

//     } catch (error) {
//         console.log("Error obteniendo producto con id: ", error.message);
//     }
// });



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
