// Menú de navegación compartido: se inyecta en el <header id="menu"> de cada página,
// así queda siempre visible y se mantiene en un único lugar.
const enlaces = [
    { texto: 'Login', ruta: '/login/' },
    { texto: 'Ítems', ruta: '/items.html' },
    { texto: 'Procedimiento', ruta: '/procedimiento.html' },
    // El cierre de sesión lo resuelve el servidor (elimina la cookie httpOnly)
    { texto: 'Cerrar sesión', ruta: '/cerrar-sesion', clase: 'salir' }
]

const nav = document.createElement('nav')
nav.className = 'menu'

for (const enlace of enlaces) {
    const a = document.createElement('a')
    a.textContent = enlace.texto
    a.href = enlace.ruta
    if (enlace.clase) a.classList.add(enlace.clase)
    // Se marca la página actual; la página "item" pertenece a la sección Ítems
    const paginaActual = location.pathname
    if (paginaActual === enlace.ruta || (paginaActual === '/item.html' && enlace.ruta === '/items.html')) {
        a.classList.add('activo')
    }
    nav.appendChild(a)
}

document.getElementById('menu').appendChild(nav)
