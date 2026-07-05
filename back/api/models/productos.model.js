// ============================================================================
// MODELO DEL PRODUCTO
// ============================================================================
import connection from "../database/database.js"
import {
    TIPOPRODUCTO_BOOSTERS
    , TIPOPRODUCTO_SINGLES
    , TIPOPRODUCTO_TODOS
    , ORDEN_ALFA_ASC
    , ORDEN_ALFA_DESC
    , ORDEN_PRECIO_ASC
    , ORDEN_PRECIO_DESC
} from "../../../shared/constantes.js";

function selectProductos() {

    const query = `SELECT
        PROD.IDProducto
        , PROD.Producto
        , PROD.IDTipoProducto
        , TPRD.TipoProducto
        , PROD.Importe
        , PROD.ImagenPath
        , CAST(PROD.Estado AS UNSIGNED) AS Estado
    FROM
        Productos PROD
        INNER JOIN TipoProductos TPRD ON PROD.IDTipoProducto = TPRD.IDTipoProducto
    ORDER BY 
        PROD.IDProducto DESC`;

    return connection.query(query);
}

function selectProductosWhere(params) {

    // Destruc de Parametros
    const {
        soloActivo = false
        , producto = ''
        , tipoProducto = '1'
        , orderBy = '1'
        , currentPage = '0'
        , limitPerPage = '10'
    } = params;

    // Query Base
    let query = 'SELECT IDProducto, Producto, Importe, ImagenPath FROM Productos WHERE 1 = 1';

    // SET soloActivo
    if (soloActivo == true) {
        query += " AND Estado = 1";
    }

    // SET Producto
    const queryParams = [];
    if (producto !== '') {
        query += ' AND Producto LIKE ?';
        queryParams.push(`%${producto}%`);
    }

    // SET IDTipoProducto
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

    // SET orderBy
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

    //SET limit
    query += " LIMIT " + limitPerPage;

    //SET offset
    const offset = parseInt(currentPage, 10) * parseInt(limitPerPage, 10);
    query += " OFFSET " + offset;

    return connection.query(query, queryParams);
}

function selectProductosWhereIDProducto(params) {

    // Destruc de Parametros
    const { IDProducto } = params;

    const query = `SELECT
        PROD.IDProducto
        , PROD.Producto
        , PROD.IDTipoProducto
        , TPRD.TipoProducto
        , PROD.Importe
        , PROD.ImagenPath
        , CAST(PROD.Estado AS UNSIGNED) AS Estado
    FROM
        Productos PROD
        INNER JOIN TipoProductos TPRD ON PROD.IDTipoProducto = TPRD.IDTipoProducto
    WHERE 
        PROD.IDProducto = ` + IDProducto;

    return connection.query(query);
}

function insertProductos(params) {

    // Destruc de Parametros
    const {
        producto = 'Nuevo Producto'
        , tipoProducto = '1'
        , importe = '0.00'
        , stock = '100'
        , imgPath = ''
        , usuarioAlta = 'admin'
    } = params;

    console.log(params);

    const query = `INSERT INTO 
        Productos
        (
            Producto
            , IDTipoProducto
            , Importe
            , Stock
            , ImagenPath
            , UsuarioAlta
        ) VALUES ( 
            ?, ?, ?, ?, ?, ? 
        )`;

    return connection.query(query, [producto, tipoProducto, importe, stock, imgPath, usuarioAlta]);
}

function updateProductosWhereIDProducto(params) {

    // Destruc de Parametros
    const {
        id = '0'
        , producto = 'Nuevo Producto'
        , tipoProducto = '1'
        , importe = '0.00'
        , stock = '100'
        , imgPath = ''
        , usuarioModif = 'admin'
    } = params;

    const query = `UPDATE Productos
    SET
        Producto = ?
        , IDTipoProducto = ?
        , Importe = ?
        , Stock = ?
        , ImagenPath = ?
        , UsuarioModif = ?
        , FechaModif = NOW()
    WHERE
        IDProducto = ?`;

    return connection.query(query, [producto, tipoProducto, importe, stock, imgPath, usuarioModif, id]);
}

function updateProductosEstadoWhereIDProducto(params) {
    // Destruc de Parametros
    const {
        id = '0'
        , estado = 1
        , usuarioModif = 'admin'
    } = params;

    const query = `UPDATE Productos
    SET
        Estado = ?
        , UsuarioModif = ?
        , FechaModif = NOW()
    WHERE
        IDProducto = ?`;

    return connection.query(query, [estado, usuarioModif, id]);


}



function deleteProductosWhereIDProducto(params) {
    //     const sql = "DELETE FROM products WHERE id = ?";
    //     return connection.query(sql, [id]);

    console.log("deleteProductosWhereIDProducto");
}





function selectTipoProductos() {

    const query = `SELECT
        IDTipoProducto
        , TipoProducto
    FROM
        TipoProductos
    ORDER BY 
        IDTipoProducto ASC`;

    return connection.query(query);
}


export default {
    selectProductos
    , selectProductosWhere
    , selectProductosWhereIDProducto
    , insertProductos
    , updateProductosWhereIDProducto
    , deleteProductosWhereIDProducto
    , selectTipoProductos
}