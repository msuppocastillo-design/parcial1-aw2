import { leerProductos } from '../servicios/productosServicio.mjs'

// PROCEDIMIENTO: aplica un descuento porcentual a los productos (todos, o solo los de una categoría).
// No respeta los principios REST porque la ruta expresa una acción (verbo) y no un recurso.
// Este controlador NO responde: guarda el resultado en res.locals y llama a next()
// para que el middleware guardarResultado lo persista en un archivo JSON y luego responda.
export const aplicarDescuento = async (req, res, next) => {
    try {
        // req.query contiene los parámetros de la query string (lo que va después de "?")
        const porcentaje = Number(req.query.porcentaje)
        const categoria = req.query.categoria

        // Validación: el porcentaje debe ser un número mayor a 0 y menor a 55.
        // Number(undefined) es NaN y Number('') es 0: ambos quedan rechazados.
        if (Number.isNaN(porcentaje) || porcentaje <= 0 || porcentaje >= 55) {
            return res.status(400).json({
                mensaje: 'El parámetro "porcentaje" es obligatorio y debe ser un número mayor a 0 y menor a 55'
            })
        }

        let productos = await leerProductos()

        // Si se indicó una categoría, se filtran los productos (Array.prototype.filter)
        if (categoria) {
            productos = productos.filter((producto) => {
                return producto.categoria === categoria.toLowerCase()
            })

            if (productos.length === 0) {
                return res.status(404).json({ mensaje: `No hay productos en la categoría "${categoria}"` })
            }
        }

        // Array.prototype.map: crea un nuevo arreglo con el precio calculado,
        // sin modificar los datos originales del archivo JSON
        const productosConDescuento = productos.map((producto) => {
            const precioConDescuento = producto.precio * (1 - porcentaje / 100)
            return {
                id: producto.id,
                nombre: producto.nombre,
                precioOriginal: producto.precio,
                precioConDescuento: Math.round(precioConDescuento)
            }
        })

        // Respuesta: "qué se procesó" y "su resultado"
        res.locals.resultado = {
            procesado: {
                operacion: 'aplicar descuento',
                porcentaje: porcentaje,
                categoria: categoria || 'todas',
                cantidadProductos: productos.length
            },
            resultado: productosConDescuento
        }

        // next() pasa el control al siguiente middleware de la ruta (guardarResultado)
        next()
    } catch (error) {
        next(error)
    }
}
