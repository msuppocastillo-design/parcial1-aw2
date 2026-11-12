-- Base de datos "admin" (se crea con POSTGRES_DB=admin al levantar el contenedor)
\c admin;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    session_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Usuario: admin / Contraseña: admin123 (guardada hasheada con bcrypt, 10 rondas)
INSERT INTO usuarios (username, password_hash) VALUES
    ('admin', '$2b$10$BF4tcN41HYPwGg18nqDfE.7NKHaOJztSFBTEyFb.oGDArbzPlxQd6');
