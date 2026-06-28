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
} from '../../shared/constantes.js';

// ==========================================================================
// PARAMETROS GLOBALES DE PAGINACION 
// ==========================================================================
let PAG_ITEMS_PAGINA = 5;
let PAG_PAGINA_ACTUAL = 0;
let PAG_FILTER_TIPOPRODUCTO = TIPOPRODUCTO_TODOS;
let PAG_FILTER_ORDEN = ORDEN_ALFA_ASC;
let PAG_FILTER_SEARCH = '';
let PAG_CARGANDO = false;
let PAG_FIN = false;

// ==========================================================================
// FILTER BAR
// ==========================================================================

function setFilterBar() {
    // Agregacion de los Nodos al DOM
    const _divProductsFilterBar = document.querySelector('body main section div.myProductsFilterBar');
    _divProductsFilterBar.innerHTML = `<div class="col-12 mt-3 mb-0 col-lg-4 my-lg-3">
                    <input type="text" class="form-control mySearchBar" placeholder="Buscar..."></input>
                </div>
                <div class="d-flex align-items-center col-12 my-3 col-md-6 col-lg-4">
                    <label for="" class="col-3 col-md-4 ">Filtrar por: </label>
                    <select class="form-select mySelectFilter">
                        <option value="${TIPOPRODUCTO_TODOS}">Boosters y Singles ♠️</option>
                        <option value="${TIPOPRODUCTO_BOOSTERS}">Solo Boosters ♦️</option>
                        <option value="${TIPOPRODUCTO_SINGLES}">Solo Singles ♣️</option>
                    </select>
                </div>
                <div class="d-flex align-items-center col-12 mt-0 mb-3 col-md-6 my-md-3 col-lg-4">
                    <label for="" class="col-3 col-md-4 col-lg-5">Ordenar por:</label>
                    <select class="form-select mySelectOrder">
                        <option value="${ORDEN_ALFA_ASC}">Nombre ↗️</option>
                        <option value="${ORDEN_ALFA_DESC}">Nombre ↘️</option>
                        <option value="${ORDEN_PRECIO_ASC}">Precio ↗️</option>
                        <option value="${ORDEN_PRECIO_DESC}">Precio ↘️</option>
                    </select>
                </div>`;

    const _barraBusqueda = document.querySelector('body main section div.myProductsFilterBar input.mySearchBar');
    const _selectFiltro = document.querySelector('body main section div.myProductsFilterBar select.mySelectFilter');
    const _selectOrder = document.querySelector('body main section div.myProductsFilterBar select.mySelectOrder');

    if (_barraBusqueda && _selectFiltro && _selectOrder) {
        _barraBusqueda.addEventListener('input', handlerFilterBar);
        _selectFiltro.addEventListener('change', handlerFilterBar);
        _selectOrder.addEventListener('change', handlerFilterBar);
    }
}

function handlerFilterBar(event) {
    const _barraBusqueda = document.querySelector('body main section div.myProductsFilterBar input.mySearchBar');
    const _selectFiltro = document.querySelector('body main section div.myProductsFilterBar select.mySelectFilter');
    const _selectOrder = document.querySelector('body main section div.myProductsFilterBar select.mySelectOrder');

    PAG_PAGINA_ACTUAL = 0;
    PAG_FILTER_TIPOPRODUCTO = _selectFiltro.value;
    PAG_FILTER_ORDEN = _selectOrder.value;
    PAG_FILTER_SEARCH = _barraBusqueda.value;
    PAG_CARGANDO = false;
    PAG_FIN = false;

    loadProductos();
}

// ==========================================================================
// PRODUCTOS CONTAINER
// ==========================================================================

function imprimirArrayProductos(arrayProductos) {

    if (!Array.isArray(arrayProductos)) {
        imprimirErrorProductos();
        return;
    }

    // Recuperamos el Carrito
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Armado de los Nodos
    let _contenedorProductos = '';
    arrayProductos.forEach((producto) => {

        // Si existe en el Carrito, recuperamos la cantidad
        let _productoEnCarrito = carrito.find((ProductoEnCarrito) => ProductoEnCarrito.id === producto.IDProducto);
        const _productoEnCarritoCantidad = _productoEnCarrito ? _productoEnCarrito.cantidad : 0;

        _contenedorProductos += `<div class="card myProductItem p-0 m-0" data-id="${producto.IDProducto}" data-tipo="${producto.IDTipoProducto}">
            <div class="myProductItemImg">
                <img src="${producto.ImagenPath}" alt="${producto.Producto}" >
            </div>
            <div class="card-body p-2 d-flex flex-column justify-content-between">
                <p class="mt-0 mb-2 h-25">${producto.Producto}</p>
                <h4 class="m-0 ">${Number(producto.Importe).toFixed(2)} AR$</h4>

                <div class="${_productoEnCarritoCantidad == 0 ? "d-flex" : "d-none"} m-0 w-100 myDivButtonAgregarProductoWrapper ">
                    <button class="btn px-4 w-100 myButtonAgregarProductoWrapper d-flex justify-content-center align-items-center"
                        data-id="${producto.IDProducto}"
                        data-nombre="${producto.Producto}"
                        data-precio="${producto.Importe}">
                        <svg viewBox="0 0 40 40 " class="me-3">
                            <use href="../../assets/icons/AgregarCarrito.svg"></use>
                        </svg>
                        Agregar 
                    </button>
                </div>

                <div class="${_productoEnCarritoCantidad == 0 ? "d-none" : "d-flex"} m-0 flex-row justify-content-between myDivButtonAgregarQuitarProducto">
                   
                    <button class="btn myButtonQuitarProducto d-flex justify-content-center align-items-center"
                        data-id="${producto.IDProducto}">
                        <svg viewBox="0 0 28 3">
                            <use href="../../assets/icons/Remove.svg"></use>
                        </svg>
                    </button>

                    <h4>${_productoEnCarritoCantidad}</h4>

                    <button class="btn myButtonAgregarProducto d-flex justify-content-center align-items-center"
                        data-id="${producto.IDProducto}"
                        data-nombre="${producto.Producto}"
                        data-precio="${producto.Importe}">
                        <svg viewBox="0 0 28 28">
                            <use href="../../assets/icons/Add.svg"></use>
                        </svg>
                    </button>
                    
                </div>
            </div>
        </div>`;
    });

    // Agregacion de los Nodos al DOM
    let _divContenedorProductos = document.querySelector('body main section div.myProductsContainer');
    if (PAG_PAGINA_ACTUAL === 0) {
        _divContenedorProductos.innerHTML = _contenedorProductos;
    } else {
        _divContenedorProductos.innerHTML += _contenedorProductos;
    }


}

function imprimirErrorProductos(error) {
    let _divContenedorProductos = document.querySelector('body main section div.myProductsContainer');
    _divContenedorProductos.innerHTML = `<div class="alert alert-danger text-center myProductsMessage" role="alert">
        ${error} 
    </div>`;
}

// ==========================================================================
// PRODUCTOS ITEMS
// ==========================================================================

function agregarListenersBotonesCarrito() {
    const _divContenedorProductos = document.querySelector('body main section div.myProductsContainer');
    if (!_divContenedorProductos) return;

    _divContenedorProductos.addEventListener('click', (event) => {
        // Buscamos si el click ocurrió en el botón de agregar o en algo dentro de él
        const botonAgregarWrapper = event.target.closest('.myButtonAgregarProductoWrapper');
        const botonAgregar = event.target.closest('.myButtonAgregarProducto');
        const botonQuitar = event.target.closest('.myButtonQuitarProducto');

        if (botonAgregarWrapper) {
            handlerAgregarProductoWrapper(botonAgregarWrapper);
        }

        if (botonAgregar) {
            handlerAgregarProducto(botonAgregar);
        }

        if (botonQuitar) {
            handlerQuitarProducto(botonQuitar);
        }
    });
}

function handlerAgregarProductoWrapper(boton) {
    handlerAgregarProducto(boton)

    const _cardBody = boton.parentElement.parentElement;
    const _divButtonAgregarProductoWrapper = _cardBody.querySelector('.myDivButtonAgregarProductoWrapper');
    const _divButtonAgregarQuitarProducto = _cardBody.querySelector('.myDivButtonAgregarQuitarProducto');

    _divButtonAgregarProductoWrapper.classList.replace('d-flex', 'd-none');
    _divButtonAgregarQuitarProducto.classList.replace('d-none', 'd-flex');
}

function handlerAgregarProducto(boton) {

    const productoNuevo = {
        id: Number(boton.dataset.id),
        nombre: boton.dataset.nombre,
        cantidad: 1,
        precioIndividual: Number(boton.dataset.precio)
    };

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carrito.find((producto) => producto.id === productoNuevo.id);

    let _cantidad = 0;

    if (productoExistente) {
        productoExistente.cantidad++;
        _cantidad = productoExistente.cantidad;
    } else {
        carrito.push(productoNuevo);
        _cantidad = 1;
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Update Visual
    const _h4Cantidad = boton.parentElement.parentElement.querySelector('div.myDivButtonAgregarQuitarProducto h4');
    if (_h4Cantidad) _h4Cantidad.innerHTML = _cantidad;

}

function handlerQuitarProducto(boton) {

    const idProducto = Number(boton.dataset.id);
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carrito.find((producto) => producto.id === idProducto);

    if (!productoExistente) {
        return;
    }

    productoExistente.cantidad--;
    let _cantidad = productoExistente.cantidad;

    const carritoActualizado = carrito.filter((producto) => producto.cantidad > 0);
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));

    // Update Visual
    if (_cantidad == 0) {
        const _cardBody = boton.parentElement.parentElement;
        const _divButtonAgregarProductoWrapper = _cardBody.querySelector('.myDivButtonAgregarProductoWrapper');
        const _divButtonAgregarQuitarProducto = _cardBody.querySelector('.myDivButtonAgregarQuitarProducto');

        _divButtonAgregarProductoWrapper.classList.replace('d-none', 'd-flex');
        _divButtonAgregarQuitarProducto.classList.replace('d-flex', 'd-none');
    } else {
        const _h4Cantidad = boton.parentElement.querySelector('h4');
        if (_h4Cantidad) _h4Cantidad.innerHTML = _cantidad;
    }
}

// ==========================================================================
// PRODUCTOS LOAD
// ==========================================================================

function loadProductos() {
    if (PAG_CARGANDO || PAG_FIN) return;
    PAG_CARGANDO = true;

    ProductosGetItems()
        .then((productos) => {
            imprimirArrayProductos(productos);
            // Avanzamos la página para la siguiente tanda
            PAG_PAGINA_ACTUAL += 1;
            PAG_FIN = productos.length < PAG_ITEMS_PAGINA ? true : false;
            // Mandamos a comprobar de manera automática si se requiere rellenar más pantalla
            checkIfSentinelIsShow();
        })
        .catch((error) => {
            imprimirErrorProductos(error);

        }).finally(() => {
            PAG_CARGANDO = false;
        });
}

async function ProductosGetItems(searchProducto = PAG_FILTER_SEARCH, tipoProducto = PAG_FILTER_TIPOPRODUCTO, orderBy = PAG_FILTER_ORDEN, currentPage = PAG_PAGINA_ACTUAL, limitPerPage = PAG_ITEMS_PAGINA) {

    const queryParams = new URLSearchParams({
        soloActivos: true
        , producto: searchProducto
        , tipoProducto
        , orderBy
        , currentPage
        , limitPerPage
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
// CENTINELA PARA SCROLL INFINITO
// ==========================================================================

function setSentinelObserver() {

    const centinela = document.querySelector('.mySentinel');

    // Creamos el observador del navegador
    const observador = new IntersectionObserver((entries) => {
        // entries[0].isIntersecting significa: "¿El div invisible entró en la pantalla?"
        if (entries[0].isIntersecting && !PAG_CARGANDO && !PAG_FIN) {
            // cargarMasProductos();
            loadProductos();
        }
    });

    observador.observe(centinela);
}

function checkIfSentinelIsShow() {
    setTimeout(() => {
        const centinela = document.querySelector('.mySentinel');
        if (centinela && !PAG_FIN) {
            // RECUPERO LA POSICION
            const posicion = centinela.getBoundingClientRect();

            // Si esta dentro de la pantalla
            if (posicion.top < window.innerHeight) {

                loadProductos();
            }

        }
    }, 50)
}

// ==========================================================================
// EXPORT
// ==========================================================================
export function initPantallaProductos() {

    setFilterBar();

    loadProductos();

    agregarListenersBotonesCarrito();

    setSentinelObserver();

}
