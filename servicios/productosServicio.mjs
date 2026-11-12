// Módulo fs/promises: versión de File System basada en promesas (se usa con async/await).
import fsp from 'node:fs/promises'
import { RUTA_PRODUCTOS } from '../utilidades/rutasArchivos.mjs'

// Lee el archivo JSON en CADA llamada: así los datos siempre están actualizados.
export const leerProductos = async () => {
    const contenido = await fsp.readFile(RUTA_PRODUCTOS, 'utf-8')
    // JSON.parse convierte el texto JSON en un arreglo de objetos JavaScript
    return JSON.parse(contenido)
}

// Devuelve el producto con el id indicado, o undefined si no existe
export const buscarProductoPorId = async (id) => {
    const productos = await leerProductos()
    return productos.find((producto) => producto.id === id)
}
