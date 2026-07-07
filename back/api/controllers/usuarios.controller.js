// Importaciones
import bcrypt from "bcrypt";
import usuariosModel from "../models/usuarios.model.js"


export async function createUsuario(req, res) {

    try {

        const { Mail, Password, NombreApellido } = req.body;

        if (!Mail || !Password || !NombreApellido) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de incluir todas las categorias"
            });
        }

        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(Password, saltRound);

        const [row] = await usuariosModel.insertUsuarios({ mail: Mail.trim(), password: hashedPassword, nombreApellido: NombreApellido });

        res.status(201).json({
            message: `Usuario creado con exito`,
            productId: row.insertId
        });

    } catch (error) {
        console.log(`Error interno al crear Producto. Detalle [${error.message}]`);
        res.status(500).json({
            message: `Error interno al crear Producto. Detalle [${error.message}]`
        })
    }
}