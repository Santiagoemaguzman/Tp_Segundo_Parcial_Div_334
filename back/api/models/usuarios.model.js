import connection from "../database/database.js"

function selectUsuariosWhereMail(params) {

    const query = `SELECT
        Mail
        , Password
        , NombreApellido
    FROM 
        Usuarios
    WHERE
        Estado = 1
        AND Mail = ?`;

    return connection.query(query, [Mail]);

    //console.log("selectProductosWhereIDProducto");
}


// export async function buscarUsuarioPorMail(mail) {
//     const [usuarios] = await connection.query(
//         `SELECT Mail, Password, NombreApellido
//          FROM Usuarios
//          WHERE Mail = ? AND Estado = 1
//          LIMIT 1`,
//         [mail]
//     );

//     return usuarios[0] ?? null;
// }