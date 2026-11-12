const mensaje = document.getElementById('mensaje')

const cargarProducto = async () => {
    // Se lee el id de la query string de la URL (/item.html?id=3)
    const id = new URLSearchParams(location.search).get('id')

    try {
        // Se arma el endpoint con parámetro de ruta; encodeURIComponent evita caracteres peligrosos
        const respuesta = await fetch(`/api/v1/productos/${encodeURIComponent(id)}`)

        if (respuesta.status === 401) return (location.href = '/login/?autorizado=false')

        const cuerpo = await respuesta.json()
        // 400 (id inválido) y 404 (no existe) traen un "mensaje" desde el servidor
        if (!respuesta.ok) {
            mensaje.textContent = cuerpo.mensaje
            return mensaje.classList.remove('oculto')
        }

        document.getElementById('nombre').textContent = cuerpo.nombre.trim()
        document.getElementById('categoria').textContent = cuerpo.categoria
        document.getElementById('marca').textContent = cuerpo.marca
        document.getElementById('precio').textContent = `$ ${cuerpo.precio.toLocaleString('es-AR')}`
        document.getElementById('stock').textContent = cuerpo.stock
        document.getElementById('detalle').classList.remove('oculto')
    } catch (error) {
        mensaje.textContent = 'No se pudo consultar el producto'
        mensaje.classList.remove('oculto')
    }
}

cargarProducto()
