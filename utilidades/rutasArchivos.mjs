// Módulo path: permite armar rutas de archivos de forma independiente del sistema operativo.
import path from 'node:path'

// import.meta.dirname devuelve la carpeta del módulo actual (reemplaza a __dirname de CommonJS).
// Se usa una ruta absoluta para que el servidor funcione sin importar desde dónde se ejecute "node".
const CARPETA_DATOS = path.join(import.meta.dirname, '..', 'datos')

// Archivo JSON con los productos (fuente de datos de la API REST)
export const RUTA_PRODUCTOS = path.join(CARPETA_DATOS, 'productos.json')

// Archivo JSON donde el middleware guarda el resultado del procedimiento
export const RUTA_RESULTADOS = path.join(CARPETA_DATOS, 'resultados.json')
