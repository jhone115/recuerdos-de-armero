const urlParams = new URLSearchParams(window.location.search);
const imageId = urlParams.get('id');

// Detectar si estamos en GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

const imageData = {
    // ... tus datos de imágenes
};

// Función para manejar las polaroids vistas
const getVistoPolaroids = () => {
    const visto = localStorage.getItem('vistoPolaroids');
    return visto ? JSON.parse(visto) : [];
};

const setVistoPolaroid = (id) => {
    const visto = getVistoPolaroids();
    if (!visto.includes(id)) {
        visto.push(id);
        localStorage.setItem('vistoPolaroids', JSON.stringify(visto));
    }
};

// Cargar los datos correspondientes al ID
document.addEventListener('DOMContentLoaded', function() {
    // Verificar y restaurar pantalla completa
    const fullscreenEstado = localStorage.getItem('fullscreen');
    if (fullscreenEstado === 'true' && !document.fullscreenElement) {
        setTimeout(() => {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error al restaurar pantalla completa: ${err.message}`);
            });
        }, 500);
    }

    const fullscreenBtn = document.getElementById('fullscreen-btn'); // Asegúrate de tener este botón en a_exp.html

    const data = imageData[imageId] || imageData[1];
    
    // Establecer la imagen de fondo para cubrir toda la pantalla
    const body = document.getElementById('main-body');
    body.style.backgroundImage = `url('${data.image}')`;
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundAttachment = "fixed";
    
    // Establecer la descripción
    document.getElementById('detail-description').textContent = data.description;
    
    // Marcar esta polaroid como vista
    if (imageId) {
        setVistoPolaroid(parseInt(imageId));
    }

    // Función para guardar estado de pantalla completa
    const guardarEstadoFullscreen = (estado) => {
        localStorage.setItem('fullscreen', estado ? 'true' : 'false');
    };

    // Configurar botón de pantalla completa si existe
    if (fullscreenBtn) {
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

        // Cambiar imagen según el estado de pantalla completa
        document.addEventListener("fullscreenchange", () => {
            if (document.fullscreenElement) {
                fullscreenBtn.src = "../recursos/imagenes/menos.png";
                guardarEstadoFullscreen(true);
            } else {
                fullscreenBtn.src = "../recursos/imagenes/mas.png";
                guardarEstadoFullscreen(false);
            }
        });
    }
});

// Botón de atrás con animación reversa
document.getElementById('btn-atras').addEventListener('click', function() {
    // Guardar estado actual antes de redirigir
    localStorage.setItem('fullscreen', document.fullscreenElement ? 'true' : 'false');
    
    // Aplicar animación reversa
    document.getElementById('main-body').classList.add('page-turn-reverse');
    
    // Redirigir después de la animación
    setTimeout(() => {
        if (isGitHubPages) {
            window.location.href = 'a.html';
        } else {
            window.location.href = 'a.html';
        }
    }, 1200);
});