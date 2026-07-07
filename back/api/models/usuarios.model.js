import connection from "../database/database.js"

function selectUsuariosWhereMail(params) {

    // Destruc de Parametros
    const { Mail } = params;

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
}

function insertUsuarios(params) {

    // Destruc de Parametros
    const {
        mail
        , password
        , nombreApellido
        , usuarioAlta = 'admin'
    } = params;

    const query = `
    INSERT INTO Usuarios
    (
        Mail
        , Password
        , NombreApellido
        , UsuarioAlta        
    ) VALUES ( 
        ?, ?, ?, ?
    )`;

    return connection.query(query, [mail, password, nombreApellido, usuarioAlta]);
}

export default {
    selectUsuariosWhereMail
    , insertUsuarios
}