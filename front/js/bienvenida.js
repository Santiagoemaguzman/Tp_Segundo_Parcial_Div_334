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

// ==========================================================================
// Export
// ==========================================================================
export function initPantallaBienvenida() {

    // Recuperamos el Boton y le agregamos un Listener
    let _boton = document.querySelector('button.myClientLoginButton');
    _boton.addEventListener('click', handlerLoginCliente)

    // Reset localStorage nombreCliente
    localStorage.setItem('nombreCliente', '');
}