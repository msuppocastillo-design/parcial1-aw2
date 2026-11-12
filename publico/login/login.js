const formulario = document.getElementById('formulario')
const mensaje = document.getElementById('mensaje')

const mostrarError = (texto) => {
    mensaje.textContent = texto
    mensaje.classList.remove('oculto')
}

// Si el servidor nos redirigió acá por no tener sesión válida, se avisa
if (new URLSearchParams(location.search).get('autorizado') === 'false') {
    mostrarError('Tu sesión no es válida o expiró. Iniciá sesión para continuar.')
}

formulario.addEventListener('submit', async (evento) => {
    // Evita el envío tradicional del formulario (recarga de página)
    evento.preventDefault()
    mensaje.classList.add('oculto')

    const datos = {
        usuario: document.getElementById('usuario').value,
        pass: document.getElementById('pass').value
    }

    try {
        const respuesta = await fetch('/autenticacion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        })
        const cuerpo = await respuesta.json()

        if (!respuesta.ok) {
            formulario.reset()
            return mostrarError(cuerpo.mensaje)
        }
        // El servidor ya guardó la cookie con el JWT; solo falta navegar
        location.href = cuerpo.redirigir
    } catch (error) {
        mostrarError('No se pudo conectar con el servidor')
    }
})
