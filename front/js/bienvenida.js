// ==========================================================================
// LOGIN CLIENTE
// ==========================================================================
function handlerLoginCliente(event) {
    // Recupera el Valor del Input
    let _clientLoginInput = document.querySelector('input.myClientLoginInput');
    const _nombreCliente = _clientLoginInput.value.trim();;

    // Validacion
    // Si el Cliente Nombre esta vacio o es mayor a 10 caracteres
    if (_nombreCliente === "" || _nombreCliente.length < 5) {
        // Agrego la clase de boostrap is-invalid
        _clientLoginInput.classList.add('is-invalid');
        return;
    }

    // Si esta validado, en caso de existir, elimina la clase is-invalid
    _clientLoginInput.classList.remove('is-invalid');

    // Persistencia
    localStorage.setItem('nombreCliente', _nombreCliente);

    // Redireccion a Productos
    window.location.href = '../pages/productos.html';
}

function handlerLoginAdmin(event) {
    // Redireccion a Productos
    window.location.href = "http://localhost:3000/login";
}

// ==========================================================================
// EXPORT
// ==========================================================================
export function initPantallaBienvenida() {

    // Reset localStorage
    localStorage.removeItem('nombreCliente');

    // Recuperamos el Boton Login de Cliente y le agregamos un Listener
    const _botonClientLoginButton  = document.querySelector('button.myClientLoginButton');
    _botonClientLoginButton.addEventListener('click', handlerLoginCliente)

    // Recuperamos el Boton Login de Admin y le agregamos un Listener
    const _botonAdminLoginButton = document.querySelector('button.myToAdminLoginPageButton');
    _botonAdminLoginButton.addEventListener('click', handlerLoginAdmin)
}