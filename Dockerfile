FROM postgres:latest
COPY sql/usuarios.sql /docker-entrypoint-initdb.d/
EXPOSE 5432
