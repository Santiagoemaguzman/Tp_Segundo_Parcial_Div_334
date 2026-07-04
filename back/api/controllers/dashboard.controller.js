export function mostrarDashboard(req, res) {
    res.render('dashboard', {
        title: 'Dashboard',
        usuario: req.session.usuario
    });
}
