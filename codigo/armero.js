// Navegación entre secciones
document.addEventListener('DOMContentLoaded', function() {
    // Manejar la navegación por hash
    function manejarNavegacionHash() {
        const hash = window.location.hash;
        const secciones = document.querySelectorAll('.seccion');
        
        // Ocultar todas las secciones
        secciones.forEach(seccion => {
            seccion.classList.remove('activa');
        });
        
        // Mostrar la sección correspondiente al hash
        if (hash) {
            const seccionObjetivo = document.querySelector(hash);
            if (seccionObjetivo) {
                seccionObjetivo.classList.add('activa');
            }
        } else {
            // Mostrar la primera sección por defecto
            document.getElementById('seccion-titulo').classList.add('activa');
        }
    }
    
    // Ejecutar al cargar la página
    manejarNavegacionHash();
    
    // Ejecutar cuando cambie el hash
    window.addEventListener('hashchange', manejarNavegacionHash);
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});