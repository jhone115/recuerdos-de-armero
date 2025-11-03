const urlParams = new URLSearchParams(window.location.search);
const imageId = urlParams.get('id');

const imageData = {
    1: {
        image: "../recursos/imagenes/IMG-20251005-WA0010.jpg",
        description: "Descripción para imagen 1 del lado B"
    },
    2: {
        image: "../recursos/imagenes/IMG-20251005-WA0012.jpg",
        description: "Descripción para imagen 2 del lado B"
    },
    3: {
        image: "../recursos/imagenes/IMG-20251005-WA0014.jpg",
        description: "Descripción para imagen 3 del lado B"
    },
    4: {
        image: "../recursos/imagenes/IMG-20251005-WA0013.jpg",
        description: "Descripción para imagen 4 del lado B"
    },
    5: {
        image: "../recursos/imagenes/IMG-20251005-WA0004.jpg",
        description: "Descripción para imagen 5 del lado B"
    },
    6: {
        image: "../recursos/imagenes/IMG-20251005-WA0008.jpg",
        description: "Descripción para imagen 6 del lado B"
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const data = imageData[imageId] || imageData[1];
    
    // Establecer la imagen de fondo
    const body = document.getElementById('main-body');
    if (body && data.image) {
        body.style.backgroundImage = `url('${data.image}')`;
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundAttachment = "fixed";
    }
    
    // Establecer la descripción
    const descElement = document.getElementById('detail-description');
    if (descElement) {
        descElement.textContent = data.description;
    }
    
    // Marcar polaroid como vista
    if (imageId) {
        const getVistoPolaroids = () => {
            const visto = sessionStorage.getItem('vistoPolaroidsB');
            return visto ? JSON.parse(visto) : [];
        };
        
        const setVistoPolaroid = (id) => {
            const visto = getVistoPolaroids();
            if (!visto.includes(id)) {
                visto.push(id);
                sessionStorage.setItem('vistoPolaroidsB', JSON.stringify(visto));
            }
        };
        
        setVistoPolaroid(parseInt(imageId));
        localStorage.setItem('fullscreen', document.fullscreenElement ? 'true' : 'false');
    }

    // Configurar pantalla completa
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
        const guardarEstadoFullscreen = (estado) => {
            localStorage.setItem('fullscreen', estado ? 'true' : 'false');
        };

        fullscreenBtn.addEventListener("click", () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.error(`Error al activar pantalla completa: ${err.message}`);
                });
                guardarEstadoFullscreen(true);
            } else {
                document.exitFullscreen();
                guardarEstadoFullscreen(false);
            }
        });

        document.addEventListener("fullscreenchange", () => {
            if (document.fullscreenElement) {
                fullscreenBtn.src = "../recursos/imagenes/menos.png";
                guardarEstadoFullscreen(true);
            } else {
                fullscreenBtn.src = "../recursos/imagenes/mas.png";
                guardarEstadoFullscreen(false);
            }
        });

        if (document.fullscreenElement) {
            fullscreenBtn.src = "../recursos/imagenes/menos.png";
        } else {
            fullscreenBtn.src = "../recursos/imagenes/mas.png";
        }
    }
});

// Botón de atrás
document.addEventListener('DOMContentLoaded', function() {
    const btnAtras = document.getElementById('btn-atras');
    if (btnAtras) {
        btnAtras.addEventListener('click', function() {
            localStorage.setItem('fullscreen', document.fullscreenElement ? 'true' : 'false');
            document.getElementById('main-body').classList.add('page-turn-reverse');
            setTimeout(() => {
                window.location.href = 'b.html';
            }, 1200);
        });
    }
});