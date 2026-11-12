import jwt from 'jsonwebtoken'
import { JWT_CLAVE } from '../config/entorno.mjs'

// Función auxiliar: lee el token de la cookie y lo verifica.
// jwt.verify comprueba (1) que la firma sea válida con nuestra clave y (2) que no haya expirado ("exp").
// Si algo falla lanza un error; acá se captura y se devuelve null.
// Seudocódigo:
//   token = cookie "token"
//   si no hay token -> null
//   intentar verificar(token, clave) -> devolver payload
//   si falla (firma inválida / expirado / token alterado) -> null
const obtenerDatosDelToken = (req) => {
    // req.cookies existe gracias al middleware cookie-parser
    const token = req.cookies.token
    if (!token) return null
    try {
        // Se fija el algoritmo permitido para evitar ataques de confusión de algoritmo
        return jwt.verify(token, JWT_CLAVE, { algorithms: ['HS256'] })
    } catch (error) {
        return null
    }
}

// Protege los ENDPOINTS (API y procedimiento): sin credenciales responde 401 en JSON,
// porque quien consume un endpoint espera datos, no una página HTML.
export const protegerEndpoints = (req, res, next) => {
    const datos = obtenerDatosDelToken(req)
    if (!datos) {
        return res.status(401).json({ mensaje: 'No autorizado: iniciá sesión para acceder' })
    }
    // Se deja el payload disponible para los siguientes controladores
    req.usuario = datos
    next()
}

// Protege las PÁGINAS: sin credenciales redirige (302) al login.
export const protegerPaginas = (req, res, next) => {
    const datos = obtenerDatosDelToken(req)
    if (!datos) {
        return res.redirect('/login/?autorizado=false')
    }
    req.usuario = datos
    next()
}
