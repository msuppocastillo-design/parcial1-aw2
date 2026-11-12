const formulario = document.getElementById('formulario')
const mensaje = document.getElementById('mensaje')
const resumen = document.getElementById('resumen')
const tabla = document.getElementById('tabla')
const cuerpoTabla = document.getElementById('cuerpoTabla')

const formatear = (numero) => `$ ${numero.toLocaleString('es-AR')}`

const mostrarMensaje = (texto, esExito) => {
    mensaje.textContent = texto
    mensaje.className = `mensaje ${esExito ? 'exito' : 'error'}`
}

formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault()
    // Se limpia el resultado anterior
    cuerpoTabla.replaceChildren()
    resumen.classList.add('oculto')
    tabla.classList.add('oculto')

    // URLSearchParams arma la query string (?porcentaje=10&categoria=teclados) codificada correctamente
    const parametros = new URLSearchParams({ porcentaje: document.getElementById('porcentaje').value })
    const categoria = document.getElementById('categoria').value
    if (categoria) parametros.set('categoria', categoria)

    try {
        const respuesta = await fetch(`/aplicar-descuento?${parametros}`)
        if (respuesta.status === 401) return (location.href = '/login/?autorizado=false')

        const cuerpo = await respuesta.json()

        // El procedimiento falló (400/404/500): se informa el motivo
        if (!respuesta.ok) {
            return mostrarMensaje(`El procedimiento NO se ejecutó: ${cuerpo.mensaje}`, false)
        }

        mostrarMensaje('El procedimiento se ejecutó con éxito', true)

        const { procesado, resultado } = cuerpo
        resumen.textContent = `Operación: ${procesado.operacion} | Porcentaje: ${procesado.porcentaje}% | ` +
            `Categoría: ${procesado.categoria} | Productos procesados: ${procesado.cantidadProductos}`
        resumen.classList.remove('oculto')

        for (const producto of resultado) {
            const fila = document.createElement('tr')
            for (const valor of [
                producto.nombre.trim(),
                formatear(producto.precioOriginal),
                formatear(producto.precioConDescuento)
            ]) {
                const celda = document.createElement('td')
                celda.textContent = valor
                fila.appendChild(celda)
            }
            cuerpoTabla.appendChild(fila)
        }
        tabla.classList.remove('oculto')
    } catch (error) {
        mostrarMensaje('El procedimiento NO se ejecutó: no se pudo conectar con el servidor', false)
    }
})
