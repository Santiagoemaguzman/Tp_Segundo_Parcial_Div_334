// ==========================================================================
// Export
// ==========================================================================
function formatearImporte(importe) {
    return `${Number(importe).toFixed(2)} AR$`;
}

function imprimirTicket(venta) {

    // Creamos una nueva instancia de jsPDF 
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const docAncho = doc.internal.pageSize.getWidth();
    const docAlto = doc.internal.pageSize.getHeight();

    const imgMarcaAgua = new Image();
    imgMarcaAgua.src = "/assets/logo.png";

    imgMarcaAgua.onload = () => {

        const imgMarcaAguaAncho = imgMarcaAgua.naturalWidth;
        const imgMarcaAguaAlto = imgMarcaAgua.naturalHeight;

        const imgMarcaAguaAnchoDeseado = 100;
        const imgMarcaAguaAltoDeseado = imgMarcaAguaAnchoDeseado * (imgMarcaAguaAlto / imgMarcaAguaAncho);

        const imgMarcaAguaPosX = (docAncho - imgMarcaAguaAnchoDeseado) / 2;
        const imgMarcaAguaPosY = (docAlto - imgMarcaAguaAltoDeseado) / 2;


        doc.setGState(new doc.GState({ opacity: 0.1 }));

        //doc.addImage(imageData, format, x, y, width, height, alias, compression, rotation);

        doc.addImage(imgMarcaAgua, 'PNG', imgMarcaAguaPosX, imgMarcaAguaPosY, imgMarcaAguaAnchoDeseado, imgMarcaAguaAltoDeseado, "", 'FAST', 0);

        doc.setGState(new doc.GState({ opacity: 1 }));

        // 
        let y = 20;

        doc.setFontSize(18);

        doc.text("Ticket de compra", docAncho / 2, y, { align: "center" });

        y += 20;

        doc.setFontSize(12);

        const productos = document.querySelector('#Ticket-productos');

        let total = 0;

        const margenIzquierdo = 20;
        const margenDerecho = docAncho - margenIzquierdo;

        venta.productos.forEach(producto => {

            doc.text(`${producto.nombre} :  ${producto.precioIndividual.toFixed(2)} AR$ x  ${producto.cantidad}`, margenIzquierdo, y, { align: "left" });

            doc.text(`${producto.subtotal.toFixed(2)} AR$`, margenDerecho, y, { align: "right" });


            total += producto.subtotal;

            y += 7;
        });

        y += 10;

        doc.text(`TOTAL`, margenIzquierdo, y, { align: "left" });

        doc.text(`${total.toFixed(2)} AR$`, margenDerecho, y, { align: "right" });

        //doc.save("ticket.pdf"); // Sugerencia: Usen fechas para poner de nombre

        const pdfUrl = doc.output("bloburl");

        const iFrame = document.querySelector('#ticket-panel');

        iFrame.src = pdfUrl;




        // fecha.textContent = new Date(venta.fecha).toLocaleString('es-AR');
        // cliente.textContent = venta.cliente;
        // vendedor.textContent = 'PokeTCG';
        // productos.innerHTML = venta.productos.map((producto) => `
        //     <tr>
        //         <td>${producto.nombre} x ${producto.cantidad}</td>
        //         <td>${formatearImporte(producto.subtotal)}</td>
        //     </tr>
        // `).join('');
        // total.textContent = formatearImporte(venta.total);


    }

}

function handlerReiniciarFlujo() {
    localStorage.removeItem('nombreCliente');

    localStorage.removeItem('ultimaVenta');


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
