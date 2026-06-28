export function validarConsultaProductos(req, res, next) {
    const {
        producto = '',
        tipoProducto = '1',
        orderBy = '1'
    } = req.query;

    if (typeof producto !== 'string' || producto.length > 255) {
        return res.status(400).json({ error: "El nombre del producto es inválido" });
    }

    const tipoProductoNumero = Number(tipoProducto);
    if (!Number.isInteger(tipoProductoNumero) || ![1, 2, 3].includes(tipoProductoNumero)) {
        return res.status(400).json({ error: "El tipo de producto es inválido" });
    }

    const ordenNumero = Number(orderBy);
    if (!Number.isInteger(ordenNumero) || ![1, 2, 3, 4].includes(ordenNumero)) {
        return res.status(400).json({ error: "El orden de productos es inválido" });
    }

    req.consultaProductos = {
        producto: producto.trim(),
        tipoProducto: tipoProductoNumero,
        orderBy: ordenNumero
    };

    next();
}

export function validarCrearVenta(req, res, next) {
    const { cliente, productos } = req.body ?? {};

    if (typeof cliente !== 'string' || cliente.trim() === '' || cliente.length > 255) {
        return res.status(400).json({ error: "El nombre del cliente es inválido" });
    }

    if (!Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ error: "El carrito está vacío" });
    }

    const estructuraProductosValida = productos.every((producto) =>
        producto !== null && typeof producto === 'object'
    );

    if (!estructuraProductosValida) {
        return res.status(400).json({ error: "El carrito contiene productos inválidos" });
    }

    const productosSolicitados = productos.map((producto) => ({
        id: Number(producto.id),
        cantidad: Number(producto.cantidad)
    }));
    const productosValidos = productosSolicitados.every((producto) =>
        Number.isInteger(producto.id)
        && producto.id > 0
        && Number.isInteger(producto.cantidad)
        && producto.cantidad > 0
    );

    if (!productosValidos) {
        return res.status(400).json({ error: "El carrito contiene productos inválidos" });
    }

    const idsProductos = productosSolicitados.map((producto) => producto.id);
    const idsUnicos = new Set(idsProductos);

    if (idsUnicos.size !== idsProductos.length) {
        return res.status(400).json({ error: "El carrito contiene productos repetidos" });
    }

    req.ventaValidada = {
        cliente: cliente.trim(),
        productos: productosSolicitados
    };

    next();
}
