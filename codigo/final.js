// Navegación entre secciones
document.addEventListener('DOMContentLoaded', function() {
    let seccionActual = null;

    function manejarNavegacionHash() {
        const hash = window.location.hash;
        const secciones = document.querySelectorAll('.seccion');

        // Ocultar todas las secciones
        secciones.forEach(seccion => {
            seccion.classList.remove('activa');
        });

        // Si existe un hash válido, mostrar esa sección
        if (hash && document.querySelector(hash)) {
            const seccionObjetivo = document.querySelector(hash);
            if (seccionObjetivo) {
                seccionObjetivo.classList.add('activa');
                seccionActual = seccionObjetivo;
            }
        } else {
            // Mostrar la PRIMERA sección por defecto
            const primeraSeccion = document.querySelector('.seccion');
            if (primeraSeccion) {
                primeraSeccion.classList.add('activa');
                seccionActual = primeraSeccion;
                window.location.hash = primeraSeccion.id;
            }
        }

        // Forzar el redimensionamiento para evitar espacios vacíos
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }

    function navegarASeccion(idSeccion) {
        window.location.hash = idSeccion;
    }

    // Inicializar
    manejarNavegacionHash();

    // Event listeners
    window.addEventListener('hashchange', manejarNavegacionHash);
    window.addEventListener('load', manejarNavegacionHash);

    // Smooth scroll mejorado
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                navegarASeccion(targetId);
                
                // Scroll suave al inicio de la sección
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Prevenir scroll no deseado
    document.addEventListener('wheel', function(e) {
        if (e.ctrlKey) return; // Permitir zoom con Ctrl
        e.preventDefault();
    }, { passive: false });

    // Asegurar que el body ocupe toda la pantalla
    document.body.style.overflow = 'hidden';
});

// Función específica para manejar la sección memoria
function inicializarSeccionMemoria() {
    const seccionMemoria = document.getElementById('seccion-memoria');
    const imagenMemoria = seccionMemoria.querySelector('img');
    
    // Asegurar que la imagen cargue correctamente
    if (imagenMemoria) {
        imagenMemoria.onload = function() {
            console.log('Imagen de memoria cargada correctamente');
            // Forzar redibujado
            window.dispatchEvent(new Event('resize'));
        };
        
        // Si la imagen ya está cargada
        if (imagenMemoria.complete) {
            window.dispatchEvent(new Event('resize'));
        }
    }
}

// Llamar esta función cuando la sección memoria se active
document.addEventListener('DOMContentLoaded', function() {
    // ... tu código existente ...
    
    // Inicializar sección memoria
    inicializarSeccionMemoria();
    
    // También inicializar cuando cambie el hash
    window.addEventListener('hashchange', function() {
        setTimeout(inicializarSeccionMemoria, 50);
    });
});