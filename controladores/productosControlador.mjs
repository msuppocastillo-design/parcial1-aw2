import { leerProductos, buscarProductoPorId } from '../servicios/productosServicio.mjs'

// GET /api/v1/productos -> devuelve todos los productos
export const obtenerProductos = async (req, res, next) => {
    try {
        const productos = await leerProductos()
        // 200 OK: la petición se resolvió correctamente
        res.status(200).json(productos)
    } catch (error) {
        // El error pasa al middleware de errores
        next(error)
    }
}

// GET /api/v1/productos/:id -> devuelve un único producto
export const obtenerProductoPorId = async (req, res, next) => {
    try {
        // Los parámetros de ruta siempre llegan como string, se convierten a número
        const id = Number(req.params.id)

        // Number('abc') es NaN: el cliente envió un dato inválido -> 400 Bad Request
        if (Number.isNaN(id)) {
            return res.status(400).json({ mensaje: 'El id debe ser un número' })
        }

        const producto = await buscarProductoPorId(id)

        // Si no existe el producto -> 404 Not Found
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' })
        }

        res.status(200).json(producto)
    } catch (error) {
        next(error)
    }
}
