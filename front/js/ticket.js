// ==========================================================================
// Export
// ==========================================================================
function formatearImporte(importe) {
    return `${Number(importe).toFixed(2)} AR$`;
}

function imprimirTicket(venta) {
    const fecha = document.querySelector('#Ticket-fecha');
    const cliente = document.querySelector('#Ticket-cliente');
    const vendedor = document.querySelector('#Ticket-vendedor');
    const productos = document.querySelector('#Ticket-productos');
    const total = document.querySelector('#Ticket-total');

    fecha.textContent = new Date(venta.fecha).toLocaleString('es-AR');
    cliente.textContent = venta.cliente;
    vendedor.textContent = 'PokeTCG';
    productos.innerHTML = venta.productos.map((producto) => `
        <tr>
            <td>${producto.nombre} x ${producto.cantidad}</td>
            <td>${formatearImporte(producto.subtotal)}</td>
        </tr>
    `).join('');
    total.textContent = formatearImporte(venta.total);
}

function handlerReiniciarFlujo() {
    localStorage.clear();
    window.location.href = './bienvenida.html';
}

export function initPantallaTicket() {
    const venta = JSON.parse(localStorage.getItem('ultimaVenta'));

    if (!venta) {
        window.location.href = './productos.html';
        return;
    }

    imprimirTicket(venta);

    const botonReiniciarFlujo = document.querySelector('#Boton-reiniciar-flujo');
    botonReiniciarFlujo.addEventListener('click', handlerReiniciarFlujo);
}
