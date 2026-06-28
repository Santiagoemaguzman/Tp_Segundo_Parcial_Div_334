// Importaciones
import mysql2 from "mysql2/promise";
import environments from "../config/environment.js";

// Recuperamos las Varaibles de Entorno
const { database } = environments;

// Creamos el Pool de Conecciones a la Base de Datos
const connection = mysql2.createPool({
    host: database.host,
    port: database.port,
    database: database.name,
    user: database.user,
    password: database.password
});

// Exportacion
export default connection;