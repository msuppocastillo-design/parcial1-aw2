// Módulo path: arma rutas de archivos independientes del sistema operativo.
import path from 'node:path'

// import.meta.dirname: carpeta del módulo actual (reemplaza a __dirname de CommonJS).
const RAIZ = path.join(import.meta.dirname, '..')
const CARPETA_DATOS = path.join(RAIZ, 'datos')

// Archivo JSON con los productos (fuente de datos de la API REST)
export const RUTA_PRODUCTOS = path.join(CARPETA_DATOS, 'productos.json')

// Archivo JSON donde el middleware guarda el resultado del procedimiento
export const RUTA_RESULTADOS = path.join(CARPETA_DATOS, 'resultados.json')

// Carpetas del front-end
export const RUTA_LOGIN = path.join(RAIZ, 'publico', 'login')       // sin protección
export const RUTA_RECURSOS = path.join(RAIZ, 'publico', 'recursos') // css y menú (sin protección)
export const RUTA_PRIVADO = path.join(RAIZ, 'privado')              // páginas protegidas
