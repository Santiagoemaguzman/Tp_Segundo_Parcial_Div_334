export function validarLogin(req, res, next) {
    const { email = '', password = '' } = req.body ?? {};
    const emailNormalizado = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!emailNormalizado || !password) {
        return res.status(400).render('login', {
            title: 'Iniciar sesión',
            error: 'Ingresá tu correo y contraseña.',
            email: emailNormalizado
        });
    }

    if (emailNormalizado.length > 255 || typeof password !== 'string' || password.length > 255) {
        return res.status(400).render('login', {
            title: 'Iniciar sesión',
            error: 'Las credenciales ingresadas no son válidas.',
            email: emailNormalizado
        });
    }

    req.credenciales = {
        email: emailNormalizado,
        password
    };

    next();
}

export function requerirLogin(req, res, next) {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }

    next();
}
