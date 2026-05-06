document.addEventListener('DOMContentLoaded', function() {
    let seccionActual = null;

    function manejarNavegacionHash() {
        const hash = window.location.hash;
        const secciones = document.querySelectorAll('.seccion');

        secciones.forEach(seccion => {
            seccion.classList.remove('activa');
        });

        if (hash && document.querySelector(hash)) {
            const seccionObjetivo = document.querySelector(hash);
            if (seccionObjetivo) {
                seccionObjetivo.classList.add('activa');
                seccionActual = seccionObjetivo;
            }
        } else {
            const primeraSeccion = document.querySelector('.seccion');
            if (primeraSeccion) {
                primeraSeccion.classList.add('activa');
                seccionActual = primeraSeccion;
                window.location.hash = primeraSeccion.id;
            }
        }

        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }

    function navegarASeccion(idSeccion) {
        window.location.hash = idSeccion;
    }

    manejarNavegacionHash();

    window.addEventListener('hashchange', manejarNavegacionHash);
    window.addEventListener('load', manejarNavegacionHash);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                navegarASeccion(targetId);
                
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

    document.addEventListener('wheel', function(e) {
        if (e.ctrlKey) return;
        e.preventDefault();
    }, { passive: false });

    document.body.style.overflow = 'hidden';
});

function inicializarSeccionMemoria() {
    const seccionMemoria = document.getElementById('seccion-memoria');
    const imagenMemoria = seccionMemoria.querySelector('img');
    
    if (imagenMemoria) {
        imagenMemoria.onload = function() {
            console.log('Imagen de memoria cargada correctamente');
            window.dispatchEvent(new Event('resize'));
        };
        
        if (imagenMemoria.complete) {
            window.dispatchEvent(new Event('resize'));
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    inicializarSeccionMemoria();
    
    window.addEventListener('hashchange', function() {
        setTimeout(inicializarSeccionMemoria, 50);
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
