import fsp from 'node:fs/promises'
import { RUTA_RESULTADOS } from '../utilidades/rutasArchivos.mjs'

// MIDDLEWARE PROPIO: guarda en un archivo JSON del servidor el resultado del procedimiento.
// Un middleware es una función (req, res, next) que se ejecuta entre la petición y la respuesta.
// Toma el resultado que dejó el controlador en res.locals (objeto pensado para compartir
// datos entre middlewares durante una misma petición), lo agrega a un historial y responde al cliente.
export const guardarResultado = async (req, res, next) => {
    try {
        const resultado = res.locals.resultado

        // Se lee el historial existente; si el archivo todavía no existe (error ENOENT) se parte de un arreglo vacío
        let historial = []
        try {
            const contenido = await fsp.readFile(RUTA_RESULTADOS, 'utf-8')
            historial = JSON.parse(contenido)
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error
            }
        }

        // Se agrega la nueva ejecución con fecha, usuario que la ejecutó y ruta consultada
        historial.push({
            fecha: new Date().toISOString(),
            usuario: req.usuario?.usuario,
            ruta: req.originalUrl,
            resultado: resultado
        })

        // JSON.stringify(dato, null, 2) genera JSON indentado (legible)
        await fsp.writeFile(RUTA_RESULTADOS, JSON.stringify(historial, null, 2), 'utf-8')

        // Recién cuando se guardó correctamente se responde al cliente
        res.status(200).json(resultado)
    } catch (error) {
        next(error)
    }
}
