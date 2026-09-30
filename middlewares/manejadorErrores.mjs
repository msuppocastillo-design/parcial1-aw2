// Ruta inexistente: se ejecuta si ninguna ruta anterior respondió -> 404
export const rutaNoEncontrada = (req, res) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' })
}

// Middleware de errores: Express lo reconoce por tener 4 parámetros (err, req, res, next).
// Recibe cualquier error enviado con next(error) desde los controladores.
export const manejadorErrores = (error, req, res, next) => {
    // El detalle del error se muestra solo en el servidor, no se le envía al cliente
    console.error(error)
    // 500 Internal Server Error: falla inesperada del servidor (ej. archivo JSON ilegible)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
}
