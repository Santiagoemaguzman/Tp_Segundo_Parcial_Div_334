import {
    TIPOPRODUCTO_BOOSTERS
    , TIPOPRODUCTO_SINGLES
    , TIPOPRODUCTO_TODOS
    , ORDEN_ALFA_ASC
    , ORDEN_ALFA_DESC
    , ORDEN_PRECIO_ASC
    , ORDEN_PRECIO_DESC
    , THEME_LIGHT
    , THEME_DARK
} from './constantes.js';

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

    if (!Array.isArray(arrayProductos)) {
        imprimirErrorProductos();
        return;
    }

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

function imprimirErrorProductos() {
    let _divContenedorProductos = document.querySelector('body main section div.myProductsContainer');
    _divContenedorProductos.innerHTML = `<div class="alert alert-danger text-center myProductsMessage" role="alert">
        No se pudieron cargar los productos. Verificá que el backend esté ejecutándose en el puerto 3000.
    </div>`;
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
            imprimirErrorProductos();
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

    const queryParams = new URLSearchParams({
        producto: searchProducto,
        tipoProducto,
        orderBy
    });
    const _endpointURL = `http://localhost:3000/api/productos?${queryParams.toString()}`;
    const response = await fetch(_endpointURL);

    if (!response.ok) {
        throw new Error(`La API respondió con estado ${response.status}`);
    }

    const datos = await response.json();
    return datos.payload;
}

// ==========================================================================
// Export
// ==========================================================================
export function initPantallaProductos() {
    imprimirFilterBar();

    imprimirLoadingSpinner();

    ProductosGetItems()
        .then((productos) => {
            imprimirArrayProductos(productos);
            agregarListenersFilterBar();
        })
        .catch((error) => {
            console.error("Hubo un error al recuperar:", error);
            imprimirErrorProductos();
        });
}