document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const imageId = urlParams.get('id');
    console.log('ID de imagen:', imageId);

    const imageData = {
        1: {
            image: "../../recursos/imagenes/IMG-20251005-WA0010.jpg",
            description: "Descripción para imagen 1 del lado B"
        },
        2: {
            image: "../../recursos/imagenes/IMG-20251005-WA0012.jpg",
            description: "Descripción para imagen 2 del lado B"
        },
        3: {
            image: "../../recursos/imagenes/IMG-20251005-WA0014.jpg",
            description: "Descripción para imagen 3 del lado B"
        },
        4: {
            image: "../../recursos/imagenes/IMG-20251005-WA0013.jpg",
            description: "Descripción para imagen 4 del lado B"
        },
        5: {
            image: "../../recursos/imagenes/IMG-20251005-WA0004.jpg",
            description: "Descripción para imagen 5 del lado B"
        },
        6: {
            image: "../../recursos/imagenes/IMG-20251005-WA0008.jpg",
            description: "Descripción para imagen 6 del lado B"
        }
    };

    // Cargar datos
    const data = imageData[imageId] || imageData[1];
    console.log('Datos cargados:', data);
    
    // Establecer imagen de fondo
    const body = document.getElementById('main-body');
    if (body && data.image) {
        body.style.backgroundImage = `url('${data.image}')`;
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundAttachment = "fixed";
        console.log('Imagen de fondo establecida:', data.image);
    }
    
    // Establecer descripción
    const descElement = document.getElementById('detail-description');
    if (descElement) {
        descElement.textContent = data.description;
        console.log('Descripción establecida');
    }
    
    // Marcar como vista
    if (imageId) {
        const getVistoPolaroids = () => {
            const visto = sessionStorage.getItem('vistoPolaroidsB');
            return visto ? JSON.parse(visto) : [];
        };
        
        const setVistoPolaroid = (id) => {
            const visto = getVistoPolaroids();
            if (!visto.includes(parseInt(id))) {
                visto.push(parseInt(id));
                sessionStorage.setItem('vistoPolaroidsB', JSON.stringify(visto));
                console.log('Polaroid marcada como vista:', id);
            }
        };
        
        setVistoPolaroid(imageId);
    }

    // Configurar pantalla completa
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener("click", () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.error('Error fullscreen:', err);
                });
            } else {
                document.exitFullscreen();
            }
        });

        document.addEventListener("fullscreenchange", () => {
            if (document.fullscreenElement) {
                fullscreenBtn.src = "../../recursos/imagenes/menos.png";
            } else {
                fullscreenBtn.src = "../../recursos/imagenes/mas.png";
            }
        });
    }

    // Botón atrás
    const btnAtras = document.getElementById('btn-atras');
    if (btnAtras) {
        btnAtras.addEventListener('click', function() {
            document.getElementById('main-body').classList.add('page-turn-reverse');
            setTimeout(() => {
                window.location.href = 'b.html';
            }, 1200);
        });
    }
});