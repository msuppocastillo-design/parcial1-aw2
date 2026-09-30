import { Router } from 'express'
import { aplicarDescuento } from '../controladores/procedimientosControlador.mjs'
import { guardarResultado } from '../middlewares/guardarResultado.mjs'

const rutasProcedimientos = Router()

// Fuera de REST: la ruta es una acción (verbo), no un recurso.
// Se encadenan dos funciones: primero el controlador calcula, luego el middleware guarda y responde.
rutasProcedimientos.get('/aplicar-descuento', aplicarDescuento, guardarResultado)

export default rutasProcedimientos
