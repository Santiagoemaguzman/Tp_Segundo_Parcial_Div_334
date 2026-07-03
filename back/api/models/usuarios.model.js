import connection from "../config/database/database.js";

export async function buscarUsuarioPorMail(mail) {
    const [usuarios] = await connection.query(
        `SELECT Mail, Password, NombreApellido
         FROM Usuarios
         WHERE Mail = ? AND Estado = 1
         LIMIT 1`,
        [mail]
    );

    return usuarios[0] ?? null;
}
