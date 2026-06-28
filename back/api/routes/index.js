// Contiene todas las rutas, la importa, las centraliza aca y las exporta con un nombre
import productosRouter from "./productos.routes.js";
import inicioRouter from "./inicio.routes.js"
import ventasRouter from "./ventas.routes.js"

export {
    productosRouter
    , inicioRouter
    , ventasRouter
}