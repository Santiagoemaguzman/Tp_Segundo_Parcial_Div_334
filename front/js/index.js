// // ==========================================================================
// // Global
// // ==========================================================================

// // const BOOSTER = 1;
// // const SINGLE = 2;

// const TIPOPRODUCTO_TODOS = 1;
// const TIPOPRODUCTO_BOOSTERS = 2;
// const TIPOPRODUCTO_SINGLES = 3;

// const ORDEN_ALFA_ASC = 1;
// const ORDEN_ALFA_DESC = 2;
// const ORDEN_PRECIO_ASC = 3;
// const ORDEN_PRECIO_DESC = 4;

// // ==========================================================================
// // Pantalla de Bienvenida
// // ==========================================================================


// function initPantallaBienvenida() {

// }

// // ==========================================================================
// // Pantalla de Productos
// // ==========================================================================


// function initPantallaProductos() {

// }

// // ==========================================================================
// // Pantalla de Productos
// // ==========================================================================
// function initPantallaCarrito() {

//     //Recupero nombreCliente en etiqueta HTML
//     imprimirNombreCliente();

// }

// // ==========================================================================
// // INICIALIZACION
// // ==========================================================================

// function init() {

//     // Leemos el atributo data-page del body
//     const _pantallaActual = document.body.getAttribute('data-page');
//     const _themeActual = document.body.getAttribute('data-theme');

//     switch (_pantallaActual) {
//         case 'bienvenida':
//             initPantallaBienvenida();
//             break;
//         case 'productos':
//             initPantallaProductos();
//             break;
//         case 'carrito':
//             initPantallaCarrito();
//             break;
//         default:
//             console.warn('Pantalla En Progreso');
//     }


//     window.addEventListener('resize', () => {


//         const _anchoPantalla = window.innerWidth;

//         if (_anchoPantalla < 992) {
//             console.log("TOY CHIQUITO");
//         } else {
//             console.log("TOY GRANDOTE");
//         }
//     });



//     // // VACIAR
//     // let buttonVaciarCarrito = document.querySelector('section.seccion-carrito button.vaciar-carrito');
//     // buttonVaciarCarrito.addEventListener('click', vaciarCarritoDeCompras);



// }

// document.addEventListener('DOMContentLoaded', init);
