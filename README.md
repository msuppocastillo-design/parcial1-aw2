# Parcial 2 - Aplicaciones Web 2

Productos de informática: API REST (JSON) + procedimiento + interfaz web protegida con cookies y JWT.

## Puesta en marcha
1. Base de datos PostgreSQL (Docker, igual que en clase):
   ```
   docker build -t imagen_admin .        # Dockerfile con: COPY usuarios.sql /docker-entrypoint-initdb.d/
   docker run --name contenedor_admin -e POSTGRES_USER=root -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=admin -p 5432:5432 -d imagen_admin
   ```
   El script está en `sql/usuarios.sql` (crea la tabla `usuarios` e inserta `admin` / `admin123` hasheado con bcrypt).
2. Copiar `.env.example` a `.env` y completar los valores.
3. `npm install` y luego `npm run dev`.
4. Abrir http://localhost:3000 (sin sesión redirige al login).

## Estructura (MVC)
- `rutas/` define las URLs · `controladores/` procesa la petición y responde · `servicios/` accede a los datos (JSON y PostgreSQL)
- `middlewares/` verificarToken, guardarResultado (propio) y manejadorErrores
- `config/` variables de entorno y conexión a la BD · `publico/` login y recursos · `privado/` páginas protegidas
