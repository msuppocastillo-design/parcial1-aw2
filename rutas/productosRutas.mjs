import { Router } from 'express'
import { obtenerProductos, obtenerProductoPorId } from '../controladores/productosControlador.mjs'

// Router: permite agrupar rutas en un módulo aparte (mini-aplicación de Express)
const rutasProductos = Router()

// API REST: la ruta representa un recurso (sustantivo en plural) y el verbo HTTP la acción
rutasProductos.get('/productos', obtenerProductos)
// Ruta con parámetro: ":id" se lee en req.params.id
rutasProductos.get('/productos/:id', obtenerProductoPorId)

export default rutasProductos
