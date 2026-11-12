import express from 'express'
import cookieParser from 'cookie-parser'
import { PUERTO } from './config/entorno.mjs'
import rutasAutenticacion from './rutas/autenticacionRutas.mjs'
import rutasProductos from './rutas/productosRutas.mjs'
import rutasProcedimientos from './rutas/procedimientosRutas.mjs'
import { protegerEndpoints, protegerPaginas } from './middlewares/verificarToken.mjs'
import { rutaNoEncontrada, manejadorErrores } from './middlewares/manejadorErrores.mjs'
import { RUTA_LOGIN, RUTA_RECURSOS, RUTA_PRIVADO } from './utilidades/rutasArchivos.mjs'

const app = express()

// ---- Middlewares generales (el ORDEN importa: se ejecutan de arriba hacia abajo) ----
// cookie-parser: llena req.cookies a partir de la cabecera "Cookie"
app.use(cookieParser())
// Parsea el cuerpo JSON (el login se envía con fetch en formato JSON)
app.use(express.json())

// ---- Zona pública (no requiere credenciales) ----
app.use(rutasAutenticacion)                         // POST /autenticacion y GET /cerrar-sesion
app.use('/login', express.static(RUTA_LOGIN))       // página de login
app.use('/recursos', express.static(RUTA_RECURSOS)) // estilos y menú compartidos

// ---- Zona protegida: endpoints ----
// La API REST queda protegida completa con un único middleware a nivel de prefijo
app.use('/api/v1', protegerEndpoints, rutasProductos)
// El procedimiento se protege dentro de su propio router (ver procedimientosRutas.mjs)
app.use('/', rutasProcedimientos)

// ---- Zona protegida: páginas ----
// La raíz lleva a la primera página de la app (si no hay sesión, protegerPaginas redirige al login)
app.get('/', (req, res) => res.redirect('/items.html'))
// Lo que no coincidió antes pasa por protegerPaginas; con token válido se sirve el archivo estático
app.use(protegerPaginas, express.static(RUTA_PRIVADO))

// ---- Al final: ruta inexistente y manejador de errores ----
app.use(rutaNoEncontrada)
app.use(manejadorErrores)

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})
