const BOOSTER = 1;
const SINGLE = 2;

const DEBUGPRODUCTOS = [
    { id: 0, tipo: BOOSTER, nombre: 'Booster Mega Evolution : Ascended Heroes', precio: 23000.00, imgPath: '../../assets/boosters/ME-AscendedHeroes.png' }
    , { id: 1, tipo: BOOSTER, nombre: 'Booster Mega Evolution : Perfect Order', precio: 12000.00, imgPath: '../../assets/boosters/ME-PerfectOrder.png' }
    , { id: 2, tipo: BOOSTER, nombre: 'Booster Scarlet & Violet : 151', precio: 70000.00, imgPath: '../../assets/boosters/S&V-151.png' }
    , { id: 3, tipo: BOOSTER, nombre: 'Booster Scarlet & Violet : Base Set Version 01', precio: 21600.00, imgPath: '../../assets/boosters/S&V-BaseSet01.png' }
    , { id: 4, tipo: BOOSTER, nombre: 'Booster Scarlet & Violet : Base Set Version 02', precio: 21600.00, imgPath: '../../assets/boosters/S&V-BaseSet02.png' }
    , { id: 5, tipo: BOOSTER, nombre: 'Booster Scarlet & Violet : Ascended Heroes', precio: 40000.00, imgPath: '../../assets/boosters/S&V-DestinedRivals.png' }
    , { id: 6, tipo: SINGLE, nombre: 'Arcanine ex (SV1 224/198)', precio: 27850.85, imgPath: '../../assets/singles/ArcanineEX.png' }
    , { id: 7, tipo: SINGLE, nombre: 'Banette ex (SV1 088/198)', precio: 3450.55, imgPath: '../../assets/singles/BanetteEX.png' }
    , { id: 8, tipo: SINGLE, nombre: 'Banette ex (SV1 229/198)', precio: 7249.05, imgPath: '../../assets/singles/BanetteEX-AR.png' }
    , { id: 9, tipo: SINGLE, nombre: 'Blastoise ex (MEW 200/165)', precio: 166423.69, imgPath: '../../assets/singles/BlastoiseEX.png' }
    , { id: 10, tipo: SINGLE, nombre: 'Gardevoir ex (SV1 086/198)', precio: 6872.10, imgPath: '../../assets/singles/GardevoirEX.png' }
    , { id: 11, tipo: SINGLE, nombre: 'Houndoom (SFA 066/064)', precio: 82740.66, imgPath: '../../assets/singles/Houndoom.png' }
    , { id: 12, tipo: SINGLE, nombre: 'Meowth ex (POR 107/088)', precio: 28996.20, imgPath: '../../assets/singles/MeowthEX.png' }
    , { id: 13, tipo: SINGLE, nombre: 'Mewtwo ex (DRI 240/182)', precio: 122900.39, imgPath: '../../assets/singles/MewtwoEX.png' }
    , { id: 14, tipo: SINGLE, nombre: 'Psyduck de Misty (DRI 193/182)', precio: 165278.34, imgPath: '../../assets/singles/Psyduck.png' }
    , { id: 15, tipo: SINGLE, nombre: 'Typhlosion de Eco (DRI 190/182)', precio: 50670.86, imgPath: '../../assets/singles/Typhlosion.png' }
    , { id: 16, tipo: SINGLE, nombre: 'Beedrill ex (DRI 098/086)', precio: 11453.50, imgPath: '../../assets/singles/BeedrillEX.png' }
    , { id: 17, tipo: SINGLE, nombre: 'Charizard ex (MEW 183/165)', precio: 71185.67, imgPath: '../../assets/singles/CharizardEX.png' }
    , { id: 18, tipo: SINGLE, nombre: 'Greavard ex (SV1 214/198)', precio: 32620.72, imgPath: '../../assets/singles/Greavard.png' }
    , { id: 19, tipo: SINGLE, nombre: 'MegaStarmie ex (POR 102/088)', precio: 15527.47, imgPath: '../../assets/singles/MegaStarmie.png' }
    , { id: 20, tipo: SINGLE, nombre: 'Mew ex (MEW 151/165)', precio: 26415.54, imgPath: '../../assets/singles/MewEX.png' }
    , { id: 21, tipo: SINGLE, nombre: 'Pachirisu (SV1 208/198)', precio: 46103.96, imgPath: '../../assets/singles/Pachirisu.png' }
    , { id: 22, tipo: SINGLE, nombre: 'Tauros (CRI 096/086)', precio: 8321.91, imgPath: '../../assets/singles/Tauros.png' }
];

const ORDEN_POR_DEFECTO = 0;
const ORDEN_ALFA_ASC = 1;
const ORDEN_ALFA_DESC = 2;
const ORDEN_PRECIO_ASC = 3;
const ORDEN_PRECIO_DESC = 4;
let orden = ORDEN_ALFA_ASC;

// ==========================================================================
// Ordenar Productos
// ==========================================================================
function ordenarArrayProductos(arrayProductos) {
    let _arrayProductosCopia = [...arrayProductos];
    switch (orden) {
        case ORDEN_ALFA_ASC:
            _arrayProductosCopia.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case ORDEN_ALFA_DESC:
            _arrayProductosCopia.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
        case ORDEN_PRECIO_ASC:
            _arrayProductosCopia.sort((a, b) => a.precio - b.precio);
            break;
        case ORDEN_PRECIO_DESC:
            _arrayProductosCopia.sort((a, b) => b.precio - a.precio);
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
        _contenedorProductos += `<div class="card myProductItem" data-id="${producto.id}" data-tipo="${producto.tipo}">
            <div class="myProductItemImg">
                <img src="${producto.imgPath}" alt="${producto.nombre}" >
            </div>
            <div class="card-body">
                <p class="m-0 h-25">${producto.nombre}</p>
                <h4 class="mt-4 mb-3">${Number(producto.precio).toFixed(2)} AR$</h4>
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

    imprimirArrayProductos(DEBUGPRODUCTOS);

    // let inputBarraBusqueda = document.querySelector('input.barra-busqueda');
    // inputBarraBusqueda.addEventListener('input', filtarArrayDeFrutas)

    // recuperarCarritoDeComprasDelLocalStorage();
}

document.addEventListener('DOMContentLoaded', init);
