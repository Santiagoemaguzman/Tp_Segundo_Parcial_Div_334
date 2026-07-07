// Contiene todas las rutas, la importa, las centraliza aca y las exporta con un nombre
import productosRouter from "./productos.routes.js";
import ventasRouter from "./ventas.routes.js"
import authRouter from "./auth.routes.js"
import viewsRouter from "./views.routes.js"
import usuariosRouter from "./usuarios.routes.js"

export {
    productosRouter
    , ventasRouter
    , authRouter
    , viewsRouter
    , usuariosRouter
}