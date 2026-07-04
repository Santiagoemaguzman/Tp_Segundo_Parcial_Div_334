/*===============================
    Controladores  de vistas
================================*/

// Importamos el modelo de los productos para poder comunicarlos con la BBDD
import productosModel from "../models/productos.model.js"




export const loginView = async (req, res) => {


     try {
        // 2. Aquí respondes al navegador renderizando tu archivo 'dashboard.ejs'
        // (Asegúrate de que 'dashboard.ejs' esté dentro de tu carpeta 'views')
        res.render("login", {
            title: "Panel de Control"
        });

    } catch (error) {
        console.error("Error al renderizar el login:", error);
        res.status(500).send("Error interno del servidor");
    }

}


// Vista index
export const indexView = async (req, res) => {

    console.log('TESSSSSSSSSST');

    // res.render("dashboard");

    try {
        // 2. Aquí respondes al navegador renderizando tu archivo 'dashboard.ejs'
        // (Asegúrate de que 'dashboard.ejs' esté dentro de tu carpeta 'views')
        res.render("dashboard", {
            title: "Panel de Control"
        });

    } catch (error) {
        console.error("Error al renderizar el dashboard:", error);
        res.status(500).send("Error interno del servidor");
    }

    // try {
    //     const [rows] = await productosModel.selectProductos();

    //     res.render("index", {
    //         title: "Inicio",
    //         about: "Nuestros productos",
    //         productsArray: rows
    //     });

    // } catch (error) {
    //     console.log(error);
    // }
}

// // Vista GET
// export const getView = (req, res) => {
//     res.render("get", {
//         title: "Consultar",
//         about: "Consultar producto por id:"
//     });
// }

// // Vista POST
// export const createView = (req, res) => {
//     res.render("post", {
//         title: "Crear",
//         about: "Crear producto"
//     });
// }

// // Vista PUT
// export const updateView = (req, res) => {
//     res.render("put", {
//         title: "Modificar",
//         about: "Consultar producto por id:"
//     });
// }

// // Vista DELETE
// export const deleteView = (req, res) => {
//     res.render("delete");
// }