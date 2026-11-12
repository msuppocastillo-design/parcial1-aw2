import pg from 'pg'
import { BD } from './entorno.mjs'

// pg es un paquete CommonJS: se importa por defecto y se extrae Pool.
// Pool: conjunto de conexiones reutilizables a PostgreSQL (evita abrir una por consulta).
const { Pool } = pg

const pool = new Pool(BD)

export default pool
