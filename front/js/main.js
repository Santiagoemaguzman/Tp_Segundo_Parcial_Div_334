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

import { initPantallaBienvenida } from './bienvenida.js';
import { initPantallaProductos } from './productos.js';
import { initPantallaCarrito } from './carrito.js';
import { initPantallaTicket } from './ticket.js';


// ==========================================================================
// NAVBAR
// ==========================================================================
function setMenuResponsive() {

    // Recupero ambos Menus
    const _menuResponsive = document.querySelector('header div nav.myMenuResponsive');
    const _menuComplete = document.querySelector('header div nav.myMenuComplete');

    // Ajusto la visibilidad
    _menuResponsive.classList.add('d-flex');
    _menuResponsive.classList.remove('d-none');
    _menuComplete.classList.add('d-none');
    _menuComplete.classList.remove('d-flex');

    // Recupero los botones y el Menu Responsive Expandido
    const _buttonToExpandMenu = document.querySelector('header div nav.myMenuResponsive button.myButtonToExpandMenu');
    const _buttonToCollapseMenu = document.querySelector('header div nav.myMenuResponsive button.myButtonToCollapseMenu');
    const _menuResponsiveExpanded = document.querySelector('header div div.myMenuResponsiveExpanded');

    _menuResponsiveExpanded.classList.add('d-flex');
    _menuResponsiveExpanded.classList.remove('d-none');

    //Comportamiento del Boton para Expandir el Menu
    _buttonToExpandMenu.addEventListener('click', function (event) {
        _buttonToExpandMenu.classList.add('d-none');
        _buttonToExpandMenu.classList.remove('d-flex');

        _buttonToCollapseMenu.classList.add('d-flex');
        _buttonToCollapseMenu.classList.remove('d-none');

        _menuResponsiveExpanded.classList.add('myContainerIn');
        _menuResponsiveExpanded.classList.remove('myContainerOut');
    })

    //Comportamiento del Boton para Colapsar el Menu
    _buttonToCollapseMenu.addEventListener('click', function (event) {
        _buttonToCollapseMenu.classList.add('d-none');
        _buttonToCollapseMenu.classList.remove('d-flex');

        _buttonToExpandMenu.classList.add('d-flex');
        _buttonToExpandMenu.classList.remove('d-none');

        _menuResponsiveExpanded.classList.add('myContainerOut');
        _menuResponsiveExpanded.classList.remove('myContainerIn');
    })
}

function setMenuComplete() {

    // Recupero ambos Menus
    const _menuResponsive = document.querySelector('header div nav.myMenuResponsive');
    const _menuComplete = document.querySelector('header div nav.myMenuComplete');

    // Ajusto la visibilidad
    _menuResponsive.classList.add('d-none');
    _menuResponsive.classList.remove('d-flex');
    _menuComplete.classList.add('d-flex');
    _menuComplete.classList.remove('d-none');

    // Recupero el Menu Responsive Expandido
    const _menuResponsiveExpanded = document.querySelector('header div div.myMenuResponsiveExpanded');
    _menuResponsiveExpanded.classList.add('d-none');
    _menuResponsiveExpanded.classList.remove('d-flex');

}

function handlerMenu() {

    const _anchoPantalla = window.innerWidth;
    if (_anchoPantalla < 992) {
        setMenuResponsive();
    } else {
        setMenuComplete();
    }
}


// ==========================================================================
// THEME
// ==========================================================================

function setTheme(temaSitio) {

    // Recupero el Body, y los Botones para cambiar de Tema, tanto del Menu Completo como el Responsivo
    const _body = document.querySelector('body');
    const _arrButtonToDarkMode = document.querySelectorAll('header div nav button.myButtonToDarkMode');
    const _arrButtonToLightMode = document.querySelectorAll('header div nav button.myButtonToLightMode');

    // Set el Atributo data-theme, y la visibilidad de los Botones
    switch (temaSitio) {
        case THEME_DARK:
            _body.setAttribute('data-theme', 'dark');
            _arrButtonToDarkMode.forEach(function (boton) {
                boton.classList.add('d-none');
                boton.classList.remove('d-flex');
            })
            _arrButtonToLightMode.forEach(function (boton) {
                boton.classList.add('d-flex');
                boton.classList.remove('d-none');
            })
            break;
        case THEME_LIGHT:
        default:
            _body.setAttribute('data-theme', 'light');
            _arrButtonToDarkMode.forEach(function (boton) {
                boton.classList.add('d-flex');
                boton.classList.remove('d-none');
            })
            _arrButtonToLightMode.forEach(function (boton) {
                boton.classList.add('d-none');
                boton.classList.remove('d-flex');
            })
            break;
    }
}

function handlerTheme() {

    // Recupero temaSitio del localStorage
    let _temaSitio = localStorage.getItem('temaSitio');

    // Si no esta Seteado, reviso si en el Sistema es Dark, sino Light
    if (!_temaSitio) {
        const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        _temaSitio = userPrefersDark ? THEME_DARK : THEME_LIGHT;
    }

    // Seteo el Tema del Sitio por Primera Vez
    setTheme(_temaSitio);

    // Recupero los Botones de Cambio de Tema
    const _arrButtonToDarkMode = document.querySelectorAll('header div nav button.myButtonToDarkMode');
    const _arrButtonToLightMode = document.querySelectorAll('header div nav button.myButtonToLightMode');

    // Les agrego Listeners para Cambiar el Tema
    _arrButtonToDarkMode.forEach(function (boton) {
        boton.addEventListener('click', () => setTheme(THEME_DARK));
    })

    _arrButtonToLightMode.forEach(function (boton) {
        boton.addEventListener('click', () => setTheme(THEME_LIGHT));
    })
}

// ==========================================================================
// NOMBRECLIENTE
// ==========================================================================

function imprimirNombreCliente() {

    // Recupero nombreCliente del localStorage
    const _nombreCliente = localStorage.getItem('nombreCliente');

    // Actualizo etiqueta HTML
    let _pNombreCliente = document.querySelector('p.myClientName');
    _pNombreCliente.innerHTML = "Bienvenido/a " + _nombreCliente + "!";
}

// ==========================================================================
// INICIALIZACION
// ==========================================================================

function init() {

    // MANEJO DEL INIT
    // Recuperamos el data-page del Body
    const _pantallaActual = document.body.getAttribute('data-page');
    // Se ejecuta el Init en funcion del data-page
    switch (_pantallaActual) {
        case 'bienvenida':
            initPantallaBienvenida();
            break;
        case 'productos':
            imprimirNombreCliente();
            initPantallaProductos();
            break;
        case 'carrito':
            imprimirNombreCliente();
            initPantallaCarrito();
            break;
        case 'ticket':
            imprimirNombreCliente();
            initPantallaTicket();
            break;            
        default:
            console.warn('Pantalla En Progreso');
    }

    // MANEJO DEL MENU
    // Lo llamo una Primera Vez para que adapte el Menu
    handlerMenu();
    // Lo guardo en un Listener de Eventos
    window.addEventListener('resize', handlerMenu);

    // MANEJO DEL TEMA
    handlerTheme();
}

document.addEventListener('DOMContentLoaded', init);

