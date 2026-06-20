// ==========================================================================
// Export
// ==========================================================================

function imprimirCarrito(carrito) {
    const tbody = document.querySelector('#tabla-carrito tbody');

    let filas = '';

    carrito.forEach((producto) => {
        filas += `
            <tr>
                <td>${producto.nombre}</td>
                <td>
                    <div class="myQuantityControls">
                        <button type="button" class="myQuantityButton" data-action="decrementar"
                            data-id="${producto.id}" aria-label="Quitar una unidad">−</button>
                        <span>${producto.cantidad}</span>
                        <button type="button" class="myQuantityButton" data-action="incrementar"
                            data-id="${producto.id}" aria-label="Agregar una unidad">+</button>
                    </div>
                </td>
                <td>${producto.precioIndividual.toFixed(2)} AR$</td>
            </tr>
        `;

    });
    tbody.innerHTML = filas;
}

function actualizarCantidadProducto(idProducto, variacion) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = carrito.find((item) => item.id === idProducto);

    if (!producto) {
        return;
    }

    producto.cantidad += variacion;

    const carritoActualizado = carrito.filter((item) => item.cantidad > 0);
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    imprimirCarrito(carritoActualizado);
}

function handlerCantidadProducto(event) {
    const boton = event.target.closest('button[data-action]');

    if (!boton) {
        return;
    }

    const idProducto = Number(boton.dataset.id);
    const variacion = boton.dataset.action === 'incrementar' ? 1 : -1;
    actualizarCantidadProducto(idProducto, variacion);
}

function handlerLimpiarCarrito() {
    localStorage.removeItem('carrito');
    imprimirCarrito([]);
}

function calcularTotalCarrito(carrito) {
    return carrito.reduce(
        (total, producto) => total + producto.precioIndividual * producto.cantidad,
        0
    );
}

function handlerAbrirModalCompra() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const modal = document.querySelector('#Modal-confirmar-compra');
    const resumen = modal.querySelector('.myPurchaseSummary');
    const error = modal.querySelector('.myPurchaseError');
    const botonConfirmar = modal.querySelector('#Boton-confirmar-compra');

    error.textContent = '';

    if (carrito.length === 0) {
        resumen.textContent = 'El carrito está vacío.';
        botonConfirmar.disabled = true;
    } else {
        const total = calcularTotalCarrito(carrito);
        resumen.textContent = `¿Confirmás la compra por ${total.toFixed(2)} AR$?`;
        botonConfirmar.disabled = false;
    }

    modal.showModal();
}

async function handlerConfirmarCompra() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cliente = localStorage.getItem('nombreCliente') || '';
    const modal = document.querySelector('#Modal-confirmar-compra');
    const errorMensaje = modal.querySelector('.myPurchaseError');
    const botonConfirmar = modal.querySelector('#Boton-confirmar-compra');

    if (carrito.length === 0) {
        return;
    }

    botonConfirmar.disabled = true;
    botonConfirmar.textContent = 'Procesando...';
    errorMensaje.textContent = '';

    try {
        const response = await fetch('http://localhost:3000/api/ventas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cliente,
                productos: carrito.map((producto) => ({
                    id: producto.id,
                    cantidad: producto.cantidad
                }))
            })
        });
        const datos = await response.json();

        if (!response.ok) {
            throw new Error(datos.error || 'No se pudo finalizar la compra');
        }

        localStorage.setItem('ultimaVenta', JSON.stringify(datos.payload));
        localStorage.removeItem('carrito');
        window.location.href = './ticket.html';
    } catch (error) {
        errorMensaje.textContent = error.message;
        botonConfirmar.disabled = false;
        botonConfirmar.textContent = 'Confirmar';
    }
}

export function initPantallaCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const tbody = document.querySelector('#tabla-carrito tbody');
    const botonLimpiarCarrito = document.querySelector('#Boton-limpiar-carrito');
    const botonComprar = document.querySelector('#Boton-comprar');
    const botonCancelarCompra = document.querySelector('#Boton-cancelar-compra');
    const botonConfirmarCompra = document.querySelector('#Boton-confirmar-compra');
    const modal = document.querySelector('#Modal-confirmar-compra');

    imprimirCarrito(carrito);
    tbody.addEventListener('click', handlerCantidadProducto);
    botonLimpiarCarrito.addEventListener('click', handlerLimpiarCarrito);
    botonComprar.addEventListener('click', handlerAbrirModalCompra);
    botonCancelarCompra.addEventListener('click', () => modal.close());
    botonConfirmarCompra.addEventListener('click', handlerConfirmarCompra);
}
