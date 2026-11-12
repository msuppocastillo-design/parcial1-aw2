import { Router } from 'express'
import { aplicarDescuento } from '../controladores/procedimientosControlador.mjs'
import { guardarResultado } from '../middlewares/guardarResultado.mjs'
import { protegerEndpoints } from '../middlewares/verificarToken.mjs'

const rutasProcedimientos = Router()

// Fuera de REST: la ruta es una acción (verbo), no un recurso.
// Se encadenan tres funciones que se ejecutan en orden:
//   1) protegerEndpoints: verifica el JWT de la cookie (401 si no hay credenciales)
//   2) aplicarDescuento: calcula y deja el resultado en res.locals
//   3) guardarResultado: lo guarda en un archivo JSON y responde
rutasProcedimientos.get('/aplicar-descuento', protegerEndpoints, aplicarDescuento, guardarResultado)

export default rutasProcedimientos
