import express from 'express'
import rutasProductos from './rutas/productosRutas.mjs'
import rutasProcedimientos from './rutas/procedimientosRutas.mjs'
import { rutaNoEncontrada, manejadorErrores } from './middlewares/manejadorErrores.mjs'

const PUERTO = 3000

const app = express()

// API REST versionada: todas las rutas de productos quedan bajo /api/v1
app.use('/api/v1', rutasProductos)

// Endpoint de procedimiento (fuera de la API REST)
app.use('/', rutasProcedimientos)

// Estos middlewares van al final: primero se prueban todas las rutas y,
// si ninguna responde, se ejecutan la ruta inexistente y el manejador de errores.
app.use(rutaNoEncontrada)
app.use(manejadorErrores)

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})
