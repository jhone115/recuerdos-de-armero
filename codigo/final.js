// Navegación entre secciones
document.addEventListener('DOMContentLoaded', function() {

    function manejarNavegacionHash() {
        const hash = window.location.hash;
        const secciones = document.querySelectorAll('.seccion');

        // Ocultar todas las secciones
        secciones.forEach(seccion => {
            seccion.classList.remove('activa');
        });

        // Si existe un hash, mostrar esa sección
        if (hash) {
            const seccionObjetivo = document.querySelector(hash);
            if (seccionObjetivo) {
                seccionObjetivo.classList.add('activa');
            }
        } else {
            // Mostrar la PRIMERA sección por defecto
            document.getElementById('historia-final').classList.add('activa');
        }
    }

    manejarNavegacionHash();

    window.addEventListener('hashchange', manejarNavegacionHash);

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId.startsWith('#')) {
                e.preventDefault();

                window.location.hash = targetId;
                manejarNavegacionHash();
            }
        });
    });

});
