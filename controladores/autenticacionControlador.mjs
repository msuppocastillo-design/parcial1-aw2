import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { buscarUsuarioPorNombre } from '../servicios/usuariosServicio.mjs'
import { JWT_CLAVE, JWT_EXPIRA_MINUTOS, COOKIE_SECURE } from '../config/entorno.mjs'

// Opciones de la cookie. Se comparten entre crearla y borrarla:
// para borrar una cookie hay que usar los mismos atributos con los que se creó.
const OPCIONES_COOKIE = {
    httpOnly: true,        // JavaScript del navegador NO puede leerla (mitiga robo por XSS)
    secure: COOKIE_SECURE, // true: solo viaja por HTTPS
    sameSite: 'strict'     // no se envía en peticiones desde otros sitios (mitiga CSRF)
}

// POST /autenticacion
// Seudocódigo:
//   leer usuario y pass del body
//   si faltan -> 400
//   buscar usuario en PostgreSQL
//   comparar pass con password_hash usando bcrypt.compare (el hash no se "desencripta": se compara)
//   si no coincide -> 401 (mismo mensaje exista o no el usuario, para no dar pistas)
//   si coincide -> firmar JWT con expiración y guardarlo en una cookie con la misma caducidad
export const iniciarSesion = async (req, res, next) => {
    try {
        const { usuario, pass } = req.body ?? {}

        if (!usuario || !pass) {
            return res.status(400).json({ mensaje: 'Usuario y contraseña son obligatorios' })
        }

        const usuarioBD = await buscarUsuarioPorNombre(usuario)

        // bcrypt.compare(textoPlano, hash) -> true/false. Si el usuario no existe, verificado queda false.
        const verificado = usuarioBD
            ? await bcrypt.compare(pass, usuarioBD.password_hash)
            : false

        if (!verificado) {
            return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' })
        }

        // Payload: datos mínimos del usuario (nunca la contraseña: el JWT está firmado, no cifrado)
        // expiresIn agrega el campo "exp" al token: pasado ese tiempo jwt.verify lo rechaza.
        const token = jwt.sign(
            { id: usuarioBD.id, usuario: usuarioBD.username },
            JWT_CLAVE,
            { algorithm: 'HS256', expiresIn: `${JWT_EXPIRA_MINUTOS}m` }
        )

        // maxAge de la cookie en milisegundos: caduca al mismo tiempo que el JWT
        res.cookie('token', token, {
            ...OPCIONES_COOKIE,
            maxAge: JWT_EXPIRA_MINUTOS * 60 * 1000
        })

        res.status(200).json({ mensaje: 'Sesión iniciada', redirigir: '/items.html' })
    } catch (error) {
        next(error)
    }
}

// GET /cerrar-sesion
// El servidor elimina la cookie (res.clearCookie envía una cookie vencida con el mismo nombre)
// y redirige al login. La cookie es httpOnly: el front no podría borrarla por sí mismo.
export const cerrarSesion = (req, res) => {
    res.clearCookie('token', OPCIONES_COOKIE)
    res.redirect('/login/')
}
