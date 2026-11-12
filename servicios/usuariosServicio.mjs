import pool from '../config/conexionBD.mjs'

// Busca un usuario por su nombre en PostgreSQL.
// Se usa una consulta PARAMETRIZADA ($1): el valor viaja separado del SQL,
// lo que evita la inyección SQL (SQL Injection).
// Devuelve la fila (con password_hash) o undefined si el usuario no existe.
export const buscarUsuarioPorNombre = async (username) => {
    const resultado = await pool.query(
        'SELECT id, username, password_hash FROM usuarios WHERE username = $1',
        [username]
    )
    // resultado.rows es un arreglo de filas; sin coincidencias queda vacío y rows[0] es undefined
    return resultado.rows[0]
}
