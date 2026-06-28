import connection from "../config/database/database.js";

export async function obtenerProductos({ producto, tipoProducto, orderBy }) {
    let query = 'SELECT * FROM Productos WHERE 1 = 1';
    const queryParams = [];

    if (producto !== '') {
        query += ' AND Producto LIKE ?';
        queryParams.push(`%${producto}%`);
    }

    if (tipoProducto === 2) {
        query += ' AND IDTipoProducto = 1';
    } else if (tipoProducto === 3) {
        query += ' AND IDTipoProducto = 2';
    }

    switch (orderBy) {
        case 2:
            query += ' ORDER BY Producto DESC';
            break;
        case 3:
            query += ' ORDER BY Importe ASC';
            break;
        case 4:
            query += ' ORDER BY Importe DESC';
            break;
        case 1:
        default:
            query += ' ORDER BY Producto ASC';
            break;
    }

    query += ' LIMIT 10';

    const [rows] = await connection.query(query, queryParams);
    return rows;
}
