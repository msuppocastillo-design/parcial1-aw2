import { Router } from 'express'
import { iniciarSesion, cerrarSesion } from '../controladores/autenticacionControlador.mjs'

const rutasAutenticacion = Router()

// Rutas SIN protección: son justamente las que permiten obtener (o perder) las credenciales
rutasAutenticacion.post('/autenticacion', iniciarSesion)
rutasAutenticacion.get('/cerrar-sesion', cerrarSesion)

export default rutasAutenticacion
