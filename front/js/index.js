// ==========================================================================
// Global
// ==========================================================================

const BOOSTER = 1;
const SINGLE = 2;

const TIPOPRODUCTO_TODOS = 1;
const TIPOPRODUCTO_BOOSTERS = 2;
const TIPOPRODUCTO_SINGLES = 3;

const ORDEN_ALFA_ASC = 1;
const ORDEN_ALFA_DESC = 2;
const ORDEN_PRECIO_ASC = 3;
const ORDEN_PRECIO_DESC = 4;

// ==========================================================================
// Pantalla de Bienvenida
// ==========================================================================
function handlerLoginCliente(event) {

    // Recupera el Valor del Input
    let _clientLoginInput = document.querySelector('input.myClientLoginInput');
    const _nombreCliente = _clientLoginInput.value.trim();;

    // Validacion
    // Si el Cliente Nombre esta vacio o es mayor a 10 caracteres
    if (_nombreCliente === "" || _nombreCliente.length > 10) {
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

function initPantallaBienvenida() {

    // Recuperamos el Boton y le agregamos un Listener
    let _boton = document.querySelector('button.myClientLoginButton');
    _boton.addEventListener('click', handlerLoginCliente)

    // Reset localStorage nombreCliente
    localStorage.setItem('nombreCliente', '');
}

// ==========================================================================
// Pantalla de Productos
// ==========================================================================

function imprimirNombreCliente() {

    // Recupero nombreCliente del localStorage
    const _nombreCliente = localStorage.getItem('nombreCliente');

    // Actualizo etiqueta HTML
    let _pNombreCliente = document.querySelector('p.myClientName');
    _pNombreCliente.innerHTML = "Bienvenido/a " + _nombreCliente + "!";
}

function imprimirFilterBar() {
    // Agregacion de los Nodos al DOM
    let _divProductsFilterBar = document.querySelector('body main section div.myProductsFilterBar');
    _divProductsFilterBar.innerHTML = `<div class="col-4">
                    <input type="text" class="form-control col-4 mySearchBar" placeholder="Buscar..."></input>
                </div>
                <div class="d-flex flex-row align-items-center col-3">
                    <label for="" class="w-25 ">Filtrar por: </label>
                    <select class="form-select w-75 mySelectFilter">
                        <option value="${TIPOPRODUCTO_TODOS}">Boosters y Singles ♠️</option>
                        <option value="${TIPOPRODUCTO_BOOSTERS}">Solo Boosters ♦️</option>
                        <option value="${TIPOPRODUCTO_SINGLES}">Solo Singles ♣️</option>
                    </select>
                </div>
                <div class="d-flex flex-row align-items-center col-3">
                    <label for="" class="w-50">Ordenar por:</label>
                    <select class="form-select w-50 mySelectOrder">
                        <option value="${ORDEN_ALFA_ASC}">Nombre ↗️</option>
                        <option value="${ORDEN_ALFA_DESC}">Nombre ↘️</option>
                        <option value="${ORDEN_PRECIO_ASC}">Precio ↗️</option>
                        <option value="${ORDEN_PRECIO_DESC}">Precio ↘️</option>
                    </select>
                </div>`;
}

function imprimirLoadingSpinner() {
    // Agregacion de los Nodos al DOM
    let _divContenedorProductos = document.querySelector('body main section div.myProductsContainer');
    _divContenedorProductos.innerHTML = `<div class="mySpinnerContainer d-flex align-items-center justify-content-center">
                    <div class="spinner-border" role="status"></div>
                </div>`;
}

function imprimirArrayProductos(arrayProductos) {

    // Armado de los Nodos
    let _contenedorProductos = '';
    arrayProductos.forEach((producto) => {
        _contenedorProductos += `<div class="card myProductItem" data-id="${producto.IDProducto}" data-tipo="${producto.IDTipoProducto}">
            <div class="myProductItemImg">
                <img src="${producto.ImagenPath}" alt="${producto.Producto}" >
            </div>
            <div class="card-body p-2 d-flex flex-column justify-content-between">
                <p class="mt-0 mb-2 h-25">${producto.Producto}</p>
                <h4 class="m-0 ">${Number(producto.Importe).toFixed(2)} AR$</h4>
                <div class="d-flex m-0 flex-row justify-content-between ">
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

function handlerFilterBar(event) {
    const _barraBusqueda = document.querySelector('body main section div.myProductsFilterBar input.mySearchBar');

    const _selectFiltro = document.querySelector('body main section div.myProductsFilterBar select.mySelectFilter');

    const _selectOrder = document.querySelector('body main section div.myProductsFilterBar select.mySelectOrder');

    ProductosGetItems(_barraBusqueda.value, _selectFiltro.value, _selectOrder.value)
        .then((productos) => {
            imprimirArrayProductos(productos);
        })
        .catch((error) => {
            console.error("Hubo un error al recuperar:", error);
        });
}



function agregarListenersFilterBar() {
    let _barraBusqueda = document.querySelector('body main section div.myProductsFilterBar input.mySearchBar');
    _barraBusqueda.addEventListener('input', handlerFilterBar);

    let _selectFiltro = document.querySelector('body main section div.myProductsFilterBar select.mySelectFilter');
    _selectFiltro.addEventListener('change', handlerFilterBar);

    let _selectOrder = document.querySelector('body main section div.myProductsFilterBar select.mySelectOrder');
    _selectOrder.addEventListener('change', handlerFilterBar);
}

async function ProductosGetItems(searchProducto = '', tipoProducto = TIPOPRODUCTO_TODOS, orderBy = ORDEN_ALFA_ASC) {


    console.log(searchProducto);
    console.log(tipoProducto);
    console.log(orderBy);


    let _endpointURL = `http://localhost:3000/api/productos?producto=${searchProducto}&tipoProducto=${tipoProducto}&orderBy=${orderBy}`;

    console.log(_endpointURL);

    try {
        const response = await fetch(_endpointURL);
        const datos = await response.json();
        const productos = datos.payload;
        return productos;

    } catch (error) {
        console.error(error);
    }
}

function initPantallaProductos() {

    //Recupero nombreCliente en etiqueta HTML
    imprimirNombreCliente();

    imprimirFilterBar();

    imprimirLoadingSpinner();

    ProductosGetItems()
        .then((productos) => {
            imprimirArrayProductos(productos);
            agregarListenersFilterBar();
        })
        .catch((error) => {
            console.error("Hubo un error al recuperar:", error);
        });
}

// ==========================================================================
// Pantalla de Productos
// ==========================================================================
function initPantallaCarrito() {

    //Recupero nombreCliente en etiqueta HTML
    imprimirNombreCliente();
    
    imprimirLoadingSpinner();

}

// ==========================================================================
// INICIALIZACION
// ==========================================================================

function init() {

    // Leemos el atributo data-page del body
    const _pantallaActual = document.body.getAttribute('data-page');

    switch (_pantallaActual) {
        case 'bienvenida':
            initPantallaBienvenida();
            break;
        case 'productos':
            initPantallaProductos();
            break;
        case 'carrito':
            initPantallaCarrito();
            break;
        default:
            console.warn('Pantalla En Progreso');
    }




    // // VACIAR
    // let buttonVaciarCarrito = document.querySelector('section.seccion-carrito button.vaciar-carrito');
    // buttonVaciarCarrito.addEventListener('click', vaciarCarritoDeCompras);



}

document.addEventListener('DOMContentLoaded', init);
