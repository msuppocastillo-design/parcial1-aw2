const tabla = document.getElementById('tabla')
const mensaje = document.getElementById('mensaje')

const cargarProductos = async () => {
    try {
        const respuesta = await fetch('/api/v1/productos')

        // 401: la cookie venció o no existe -> volver al login
        if (respuesta.status === 401) return (location.href = '/login/?autorizado=false')
        if (!respuesta.ok) throw new Error()

        const productos = await respuesta.json()

        for (const producto of productos) {
            const fila = document.createElement('tr')

            // textContent (y no innerHTML) escribe texto plano: evita inyectar HTML (XSS)
            for (const valor of [
                producto.nombre.trim(),
                producto.categoria,
                producto.marca,
                `$ ${producto.precio.toLocaleString('es-AR')}`
            ]) {
                const celda = document.createElement('td')
                celda.textContent = valor
                fila.appendChild(celda)
            }

            // Enlace a la página Ítem: el id viaja como query string (?id=1)
            const celdaEnlace = document.createElement('td')
            const enlace = document.createElement('a')
            enlace.className = 'enlace'
            enlace.textContent = 'Ver detalle'
            enlace.href = `/item.html?id=${producto.id}`
            celdaEnlace.appendChild(enlace)
            fila.appendChild(celdaEnlace)

            tabla.appendChild(fila)
        }
    } catch (error) {
        mensaje.textContent = 'No se pudieron cargar los productos'
        mensaje.classList.remove('oculto')
    }
}

cargarProductos()
