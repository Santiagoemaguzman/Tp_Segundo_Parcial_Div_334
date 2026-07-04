import bcrypt from "bcrypt";
import { buscarUsuarioPorMail } from "../models/usuarios.model.js";

export function mostrarLogin(req, res) {
    if (req.session.usuario) {
        return res.redirect('/dashboard');
    }

    res.render('login', {
        title: 'Iniciar sesión',
        error: null,
        email: ''
    });
}

export async function iniciarSesion(req, res) {
    const { email, password } = req.credenciales;

    try {
        const usuario = await buscarUsuarioPorMail(email);
        const credencialesCorrectas = usuario
            ? await bcrypt.compare(password, usuario.Password)
            : false;

        if (!credencialesCorrectas) {
            return res.status(401).render('login', {
                title: 'Iniciar sesión',
                error: 'Correo o contraseña incorrectos.',
                email
            });
        }

        req.session.usuario = {
            mail: usuario.Mail,
            nombre: usuario.NombreApellido
        };

        req.session.save((error) => {
            if (error) {
                console.error('Error guardando la sesión:', error.message);
                return res.status(500).render('login', {
                    title: 'Iniciar sesión',
                    error: 'No se pudo iniciar la sesión. Intentá nuevamente.',
                    email
                });
            }

            res.redirect('/dashboard');
        });
    } catch (error) {
        console.error('Error validando el usuario:', error.message);
        res.status(500).render('login', {
            title: 'Iniciar sesión',
            error: 'No se pudo validar el usuario en este momento.',
            email
        });
    }
}

export function cerrarSesion(req, res) {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).send('No se pudo cerrar la sesión');
        }

        res.clearCookie('poketcg.sid');
        res.redirect('/login');
    });
}
