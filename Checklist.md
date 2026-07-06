# 📋 Programación III - Checklist Definitivo (Autoservicio)

## 🎨 Aspectos Generales de Diseño y Navegación (Todo el Sistema)
- 🟢 Restriccion de Negocio: Elegir un rubro lógico (físico o virtual) pero NO puede ser de comida

## 💻 Proyecto Frontend
### Pantalla de Bienvenida
- 🟢 Interfaz con estilos CSS cuidados y consistentes
- 🟢 Diseño Responsivo adaptable y completamente funcional tanto en PC como en dispositivos móviles
- 🟢 Favicon configurado en el navegador
- 🟢 Logo de la aplicación visible
- 🟢 Nombre de la aplicación visible
- 🟢 Nombre de los alumnos visible *(IMAGINO EN EL FOOTER)*
- 🟢 Barra de navegación *(SOLO THEME, MENUS NO DEBERIA)*
- 🟢 Selector para cambiar el tema de la aplicación (Claro / Oscuro / Otros)
- 🟢 Persistencia del tema elegido al recargar
- 🟢 El cliente nunca debe escribir una ruta a mano en la URL
- 🟢 Input para ingresar únicamente el nombre del cliente
- 🟢 Validación del input (bloquear acceso si está vacío)
- 🟢 Botón **Continuar** que redirige a la **Pantalla de Productos**
- 🟢 Botón oculto/discreto que redirige al **Login del Administrador**

### Pantalla de Productos
- 🟢 Interfaz con estilos CSS cuidados y consistentes
- 🟢 Diseño Responsivo adaptable y completamente funcional tanto en PC como en dispositivos móviles
- 🟢 Favicon configurado en el navegador
- 🟢 Logo de la aplicación visible
- 🟢 Nombre de la aplicación visible
- 🟢 Nombre de los alumnos visible *(IMAGINO EN EL FOOTER)*
- 🟢 Barra de navegación
- 🟢 Selector para cambiar el tema de la aplicación (Claro / Oscuro / Otros)
- 🟢 Persistencia del tema elegido al recargar
- 🟢 El cliente nunca debe escribir una ruta a mano en la URL
- 🟢 Visualización de productos divididos explícitamente en dos categorías
- 🟢 Mostrar solo los productos que tengan el estado activo
- 🟢 Renderizar todos los datos del producto junto con su imagen
- 🟢 Paginación funcional de los productos *(YA TIENE SCROLL INFINITO)*
- 🟢 Botón para agregar un producto al carrito *(SE ME OCURRIO HACERLO EN DOS PARTES, EN UNA PRIMERA SOLO "AGREGAR AL CARRITO", YA SI AGREGASTE 1, EL BOTON CAMBIA A ( - | 1 | + ))*

### Pantalla de Carrito
- 🟢 Interfaz con estilos CSS cuidados y consistentes
- 🟢 Diseño Responsivo adaptable y completamente funcional tanto en PC como en dispositivos móviles
- 🟢 Favicon configurado en el navegador
- 🟢 Logo de la aplicación visible
- 🟢 Nombre de la aplicación visible
- 🟢 Nombre de los alumnos visible *(IMAGINO EN EL FOOTER)*
- 🟢 Barra de navegación
- 🟢 Selector para cambiar el tema de la aplicación (Claro / Oscuro / Otros)
- 🟢 Persistencia del tema elegido al recargar
- 🟢 El cliente nunca debe escribir una ruta a mano en la URL
- 🟢 Listado detallado de los productos seleccionados
- 🟢 Controladores para incrementar o decrementar la cantidad de cada ítem
- 🟢 Botón para eliminar por completo un producto del carrito
- 🟢 Botón "Finalizar Compra" que dispara un Modal de Confirmación
- 🟢 Al confirmar, impactar la compra en la base de datos y redirigir al **Ticket**

### Pantalla de Ticket
- 🟢 Interfaz con estilos CSS cuidados y consistentes
- 🟢 Diseño Responsivo adaptable y completamente funcional tanto en PC como en dispositivos móviles
- 🟢 Favicon configurado en el navegador
- 🟢 Logo de la aplicación visible
- 🟢 Nombre de la aplicación visible
- 🟢 Nombre de los alumnos visible *(IMAGINO EN EL FOOTER)*
- 🟢 Barra de navegación
- 🟢 Selector para cambiar el tema de la aplicación (Claro / Oscuro / Otros)
- 🟢 Persistencia del tema elegido al recargar
- 🟢 El cliente nunca debe escribir una ruta a mano en la URL
- 🟢 Muestra del ticket con: Nombre de la empresa, Nombre del Cliente, productos comprados, subtotales y total, fecha actual del sistema
- 🟢 Botón para descargar el Ticket en formato PDF
- 🟢 Botón de "Salir" / "Volver a empezar" que limpia la sesión, reinicia el flujo y vuelve a la **Pantalla de Bienvenida**  

## ⚙️ Proyecto Backend (API & Backoffice)
### Base de Datos
- 🟢 Los Productos deben tener una propiedad de activo
- 🟢 El Sistema debe tener productos cargados al momento de evaluar	
- 🟢El Sistema debe persistir las Ventas
- 🟢 El Sistema debe tener Relacion Muchos a Muchos entre Productos y Ventas

### API
- 🟢 La API debe permitir traer los Productos en forma de pagina
- 🟢Las Rutas y Endpoints deben estar estructurados de forma lógica MVC
- 🟢 Debe validar los datos por Middlewares
- 🟢 Utilizar un ORM *(NO SE INTEGRA)*
- 🟢 CRUD
- 🟢 Las imagenes se deben almacenar en el Servidor
- ⚪ Encriptacion de Contraseñas

### Pantalla de Login (VISTA EJS)
- 🟢 Interfaz con estilos CSS cuidados y consistentes
- 🟢 Diseño Responsivo adaptable y completamente funcional tanto en PC como en dispositivos móviles
- 🟢 Favicon configurado en el navegador
- 🟢 Logo de la aplicación visible
- 🟢 Nombre de la aplicación visible
- 🟢 Nombre de los alumnos visible *(IMAGINO EN EL FOOTER)*
- 🟢 Selector para cambiar el tema de la aplicación (Claro / Oscuro / Otros)
- 🟢 Persistencia del tema elegido al recargar
- ⚪ Formulario de credenciales (correo y contraseña)
- ⚪ Validacion contra la Base de Datos
- 🟢 Botón discreto de Acceso Rápido Tester,que autocompleta los campos de login
- 🟢 Al completar el **Login**, redirigir al **Dashboard**

### Pantalla de Dashboard (VISTA EJS) 
- 🟢 Interfaz con estilos CSS cuidados y consistentes
- 🟢 Diseño Responsivo adaptable y completamente funcional tanto en PC como en dispositivos móviles
- 🟢 Favicon configurado en el navegador
- 🟢 Logo de la aplicación visible
- 🟢 Nombre de la aplicación visible
- 🟢 Nombre de los alumnos visible *(IMAGINO EN EL FOOTER)*
- 🟢 Selector para cambiar el tema de la aplicación (Claro / Oscuro / Otros)
- 🟢 Persistencia del tema elegido al recargar
- 🟢 Listado completo de productos de la base de datos agrupados/separados por tipo
- 🟢 Capacidad de dar de Alta un nuevo Producto (reidirigir al **ABM**)
- 🟢 Capacidad de Modificar un Producto (reidirigir al **ABM**)
- 🟢 Botón para descargar el reporte de ventas en Excel (.xlsx)

### ABM (VISTA EJS) 
- 🟢 Interfaz con estilos CSS cuidados y consistentes
- 🟢 Diseño Responsivo adaptable y completamente funcional tanto en PC como en dispositivos móviles
- 🟢 Favicon configurado en el navegador
- 🟢 Logo de la aplicación visible
- 🟢 Nombre de la aplicación visible
- 🟢 Nombre de los alumnos visible *(IMAGINO EN EL FOOTER)*
- 🟢 Selector para cambiar el tema de la aplicación (Claro / Oscuro / Otros)
- 🟢 Persistencia del tema elegido al recargar
- 🟢 Alta: Formulario para nuevos productos (campos requeridos + carga de archivo de imagen al servidor). Estado activo por defecto 
- 🟢 Modificación: formulario dinámico que toma el ID del producto y permite editar sus datos e imagen
- 🟢 Baja Lógica (Desactivar), debe abrir un Modal de Confirmacion, y cambia de Estado, deja de verse en el Front
- 🟢 Reactivación, debe abrir un Modal de Confirmacion, y cambia de Estado, deja de verse en el Front

## 🏆 EXTRA
### Frontend : Pantalla de Encuesta
- ⚪ Interfaz con estilos CSS cuidados y consistentes
- ⚪ Diseño Responsivo adaptable y completamente funcional tanto en PC como en dispositivos móviles
- ⚪ Favicon configurado en el navegador
- ⚪ Logo de la aplicación visible
- ⚪ Nombre de la aplicación visible
- ⚪ Nombre de los alumnos visible *(IMAGINO EN EL FOOTER)*
- ⚪ Barra de navegación
- ⚪ Selector para cambiar el tema de la aplicación (Claro / Oscuro / Otros)
- ⚪ Persistencia del tema elegido al recargar
- ⚪ El cliente nunca debe escribir una ruta a mano en la URL
- ⚪ Luego de Obtener el Ticket y ante de Reiniciar el Sistema, se redirige a la Pantalla de Encuesta
- ⚪ Botón de "Omitir encuesta" visible pero sutil (no debe resaltar)
- ⚪ El formulario debe tener al menos un **textarea** *(SERA PARA OPINION GENERAL)*
- ⚪ El formulario debe tener al menos un **email** 
- ⚪ El formulario debe tener al menos un **checkbox** *(SERA PARA RECIBIR PROMOCIONES AL MAIL?)*
- ⚪ El formulario debe tener al menos un **slider / range** *(PUNTUACION)*
- ⚪ El formulario debe tener al menos un **file** 
- ⚪ Validación completa de los campos con mensajes de error claros
- ⚪ Modal de Agradecimiento al enviar la encuesta con éxito
- ⚪ Guardado de la encuesta en la BD con la fecha del día

### Backend (API & Backoffice) : Sistema de Logs
- ⚪ Interfaz con estilos CSS cuidados y consistentes
- ⚪ Diseño Responsivo adaptable y completamente funcional tanto en PC como en dispositivos móviles
- ⚪ Favicon configurado en el navegador
- ⚪ Logo de la aplicación visible
- ⚪ Nombre de la aplicación visible
- ⚪ Nombre de los alumnos visible *(IMAGINO EN EL FOOTER)*
- ⚪ Barra de navegación
- ⚪ Selector para cambiar el tema de la aplicación (Claro / Oscuro / Otros)
- ⚪ Persistencia del tema elegido al recargar
- ⚪ Registro automático en la base de datos cada vez que un administrador inicia sesión
- ⚪ Visualización del LOG de inicios de sesión de los administradores
- ⚪ Visualizacion de tabla con el Top 10 de productos más vendidos
- ⚪ Visualizacion de tabla con el Top 10 de las ventas más caras
- ⚪ Incorporar al menos dos estadísticas adicionales presentadas en tablas descriptivas
- ⚪ Se debe poder descargar los Datos de las Encuestas en EXCEL

---

### REFERENCIAS 
- 🟢 Completo
- 🟡 En Proceso
- ⚪ Pendiente