import dotenv from 'dotenv'

// dotenv lee el archivo .env y carga sus pares CLAVE=valor en process.env.
// Se ejecuta acá, una sola vez, porque este módulo es el primero que importan los demás.
dotenv.config()

export const PUERTO = process.env.PUERTO || 3000

// Clave privada para firmar/verificar el JWT (algoritmo HS256: clave simétrica)
export const JWT_CLAVE = process.env.JWT_CLAVE

// process.env siempre devuelve strings: se convierte a número (60 minutos por defecto)
export const JWT_EXPIRA_MINUTOS = Number(process.env.JWT_EXPIRA_MINUTOS) || 60

// process.env.COOKIE_SECURE es el texto "true"/"false": se convierte a booleano
export const COOKIE_SECURE = process.env.COOKIE_SECURE === 'true'

export const BD = {
    host: process.env.BD_HOST || 'localhost',
    port: Number(process.env.BD_PORT) || 5432,
    user: process.env.BD_USER,
    password: process.env.BD_PASS,
    database: process.env.BD_BD
}

// Si falta la clave, el servidor no debe arrancar: firmaría tokens inseguros o fallaría después.
if (!JWT_CLAVE) {
    throw new Error('Falta la variable JWT_CLAVE en el archivo .env')
}
