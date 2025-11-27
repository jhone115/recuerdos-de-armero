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
    
    // Smooth scroll para enlaces internos - CORREGIDO
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Solo procesar si es un enlace interno (#)
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                const target = document.querySelector(targetId);
                if (target) {
                    // Cambiar hash primero
                    window.location.hash = targetId;
                    
                    // Luego manejar la navegación
                    manejarNavegacionHash();
                }
            }
            // Si no es un enlace interno, dejar que el navegador maneje el enlace normalmente
        });
    });
});
// Auto-pantalla completa en móvil al cargar
window.addEventListener('load', function() {
    if (isMobileDevice()) {
        setTimeout(() => {
            activateFullscreen();
        }, 1000); // Pequeño delay para permitir interacción del usuario
    }
});

// Forzar landscape en móvil
function forceLandscape() {
    if (isMobileDevice() && window.innerHeight > window.innerWidth) {
        // Intentar bloquear orientación (solo algunos navegadores)
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape').catch(function(error) {
                console.log('Orientación no se puede bloquear: ', error);
            });
        }
    }
}

// Llamar después de pantalla completa
document.addEventListener('fullscreenchange', function() {
    if (isFullscreen()) {
        forceLandscape();
    }
});