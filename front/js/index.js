const BOOSTER = 1;
const SINGLE = 2;

// ==========================================================================
// Obtener Productos de Base de Datos
// ==========================================================================
async function ProductosGetAll() {
    try {
        const response = await fetch("http://localhost:3000/api/productos");
        const datos = await response.json();
        const productos = datos.payload;

        console.log(productos);

        return productos;

    } catch (error) {
        console.error(error);
    }
}


// ==========================================================================
// Ordenar Productos
// ==========================================================================
const ORDEN_POR_DEFECTO = 0;
const ORDEN_ALFA_ASC = 1;
const ORDEN_ALFA_DESC = 2;
const ORDEN_PRECIO_ASC = 3;
const ORDEN_PRECIO_DESC = 4;
let orden = ORDEN_ALFA_ASC;

function ordenarArrayProductos(arrayProductos) {
    let _arrayProductosCopia = [...arrayProductos];
    switch (orden) {
        case ORDEN_ALFA_ASC:
            _arrayProductosCopia.sort((a, b) => a.Producto.localeCompare(b.Producto));
            break;
        case ORDEN_ALFA_DESC:
            _arrayProductosCopia.sort((a, b) => b.Producto.localeCompare(a.Producto));
            break;
        case ORDEN_PRECIO_ASC:
            _arrayProductosCopia.sort((a, b) => a.Importe - b.Importe);
            break;
        case ORDEN_PRECIO_DESC:
            _arrayProductosCopia.sort((a, b) => b.Importe - a.Importe);
            break;
        default:

    }
    return _arrayProductosCopia;
}

// ==========================================================================
// Mostrar Productos
// ==========================================================================

function imprimirArrayProductos(arrayProductos) {

    // Armado de los Nodos
    let _arrayProductosOrdenados = ordenarArrayProductos(arrayProductos);

    // Armado de los Nodos
    let _contenedorProductos = '';
    _arrayProductosOrdenados.forEach((producto) => {
        _contenedorProductos += `<div class="card myProductItem" data-id="${producto.IDProducto}" data-tipo="${producto.IDTipoProducto}">
            <div class="myProductItemImg">
                <img src="${producto.ImagenPath}" alt="${producto.Producto}" >
            </div>
            <div class="card-body">
                <p class="m-0 h-25">${producto.Producto}</p>
                <h4 class="mt-4 mb-3">${Number(producto.Importe).toFixed(2)} AR$</h4>
                <div class="d-flex flex-row justify-content-between">
                    <button class="btn btn-success px-4">Agregar</button>
                    <button class="btn btn-danger px-4">Quitar</button>
                </div>
            </div>
        </div>`;
    });






    // Agregacion de los Nodos al DOM
    let _divContenedorProductos = document.querySelector('body main section div.myProductsContainer');
    _divContenedorProductos.innerHTML = _contenedorProductos;

    // // Agregacion de los Listeners para Agregar al Carrito
    // let buttonsAgregarProducto = divContenedorProdcutos.querySelectorAll('div.card-producto button');
    // buttonsAgregarProducto.forEach(
    //     (button) => {
    //         button.addEventListener('click', agregarProducto);
    //     }
    // );
}


// ==========================================================================
// INICIALIZACION
// ==========================================================================

function init() {

    // // ORDENAMIENTO
    // let divOrdenamientoProductos = document.querySelectorAll('div.ordenamiento-productos button');
    // divOrdenamientoProductos.forEach(
    //     (button) => {
    //         button.addEventListener('click', cambiarOrden);
    //     }
    // );

    // // VACIAR
    // let buttonVaciarCarrito = document.querySelector('section.seccion-carrito button.vaciar-carrito');
    // buttonVaciarCarrito.addEventListener('click', vaciarCarritoDeCompras);

    // imprimirDatosAlumno();


    ProductosGetAll()
        .then((productos) => {
            // 3. Esto se ejecuta DESPUÉS, cuando la BD responde
            imprimirArrayProductos(productos);

        })
        .catch((error) => {
            console.error("Hubo un error al recuperar:", error);
        });


    




    // let inputBarraBusqueda = document.querySelector('input.barra-busqueda');
    // inputBarraBusqueda.addEventListener('input', filtarArrayDeFrutas)

    // recuperarCarritoDeComprasDelLocalStorage();
}

document.addEventListener('DOMContentLoaded', init);
