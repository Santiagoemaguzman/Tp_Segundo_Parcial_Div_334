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

    const { producto, tipoProducto, orderBy } = req.query;

    let query = 'SELECT * FROM Productos WHERE 1 = 1'

    if (producto !== '') {
        // Por si se busca algo con comilla, escapamos la comilla
        query += ` AND Producto LIKE '%${producto.replace(/'/g, "\\'")}%'`
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
        const [rows] = await connection.query(sql); // En rows guardamos los resultados de nuestra sentencia SQL
        // console.log(rows);

        // el objeto res nos permitira devolver un codigo de estado y un tipo de respuesta
        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log("Error obteniendo productos: ", error.message);
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