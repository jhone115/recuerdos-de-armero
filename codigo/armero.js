document.addEventListener('DOMContentLoaded', function() {
    function manejarNavegacionHash() {
        const hash = window.location.hash;
        const secciones = document.querySelectorAll('.seccion');
        
        secciones.forEach(seccion => {
            seccion.classList.remove('activa');
        });
        
        if (hash) {
            const seccionObjetivo = document.querySelector(hash);
            if (seccionObjetivo) {
                seccionObjetivo.classList.add('activa');
            }
        } else {
            document.getElementById('seccion-titulo').classList.add('activa');
        }
    }
    
    manejarNavegacionHash();
    
    window.addEventListener('hashchange', manejarNavegacionHash);
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                const target = document.querySelector(targetId);
                if (target) {
                    window.location.hash = targetId;
                    manejarNavegacionHash();
                }
            }
        });
    });
});

window.addEventListener('load', function() {
    if (isMobileDevice()) {
        setTimeout(() => {
            activateFullscreen();
        }, 1000);
    }
});

function forceLandscape() {
    if (isMobileDevice() && window.innerHeight > window.innerWidth) {
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape').catch(function(error) {
                console.log('Orientación no se puede bloquear: ', error);
            });
        }
    }
}

document.addEventListener('fullscreenchange', function() {
    if (isFullscreen()) {
        forceLandscape();
    }
});
