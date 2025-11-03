document.addEventListener('DOMContentLoaded', function() {
    const polaroidGrid = document.querySelector('.polaroid-grid');
    console.log('polaroidGrid encontrado:', polaroidGrid);

    const polaroids = [
        { 
            id: 1, 
            title: "", 
            image: "../../recursos/imagenes/IMG-20251005-WA0010.jpg",
            description: "",
            rotation: "-3deg"
        },
        { 
            id: 2, 
            title: "", 
            image: "../../recursos/imagenes/IMG-20251005-WA0012.jpg",
            description: "",
            rotation: "2deg"
        },
        { 
            id: 3, 
            title: "", 
            image: "../../recursos/imagenes/IMG-20251005-WA0014.jpg",
            description: "",
            rotation: "-1deg"
        },
        { 
            id: 4, 
            title: "", 
            image: "../../recursos/imagenes/IMG-20251005-WA0013.jpg",
            description: "",
            rotation: "3deg"
        },
        { 
            id: 5, 
            title: "", 
            image: "../../recursos/imagenes/IMG-20251005-WA0004.jpg",
            description: "",
            rotation: "-2deg"
        },
        { 
            id: 6, 
            title: "", 
            image: "../../recursos/imagenes/IMG-20251005-WA0008.jpg",
            description: "",
            rotation: "1deg"
        }
    ];

    // Sistema de visualización
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

    const todasVistas = () => {
        const visto = getVistoPolaroids();
        return polaroids.every(polaroid => visto.includes(polaroid.id));
    };

    // Configurar pantalla completa
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
        console.log('Botón fullscreen encontrado');
        fullscreenBtn.addEventListener("click", () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.error('Error al activar pantalla completa:', err);
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

    // Configurar botón atrás
    const btnAtras = document.getElementById('btn-atras');
    if (btnAtras) {
        btnAtras.addEventListener('click', function() {
            window.location.href = '../../index.html';
        });
    }

    // Crear las polaroids
    polaroids.forEach(polaroid => {
        const polaroidElement = document.createElement('div');
        polaroidElement.className = 'polaroid';
        polaroidElement.style.transform = `rotate(${polaroid.rotation})`;
        polaroidElement.setAttribute('data-id', polaroid.id);
        
        // Verificar si mostrar flecha
        const mostrarFlecha = polaroid.id === 6 && todasVistas();
        
        polaroidElement.innerHTML = `
            <div class="polaroid-image" style="background-image: url('${polaroid.image}')">
                ${mostrarFlecha ? `
                <div class="continue-arrow">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </div>
                ` : ''}
            </div>
            <div class="polaroid-caption">${polaroid.title}</div>
        `;
        
        if (mostrarFlecha) {
            polaroidElement.classList.add('polaroid-with-arrow');
        }
        
        // Evento clic
        polaroidElement.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            console.log('Polaroid clickeada:', id);
            
            if (id === '6' && this.classList.contains('polaroid-with-arrow')) {
                // Ir al inicio
                sessionStorage.removeItem('vistoPolaroidsB');
                document.querySelector('.pantalla-b').classList.add('page-turn');
                setTimeout(() => {
                    window.location.href = '../../index.html';
                }, 1000);
            } else {
                // Ir a página de detalle
                document.querySelector('.pantalla-b').classList.add('page-turn');
                setTimeout(() => {
                    window.location.href = `b_exp.html?id=${id}`;
                }, 1000);
            }
        });
        
        polaroidGrid.appendChild(polaroidElement);
        console.log('Polaroid agregada:', polaroid.id);
    });

    console.log('Total polaroids creadas:', polaroidGrid.children.length);
});

// Sistema de audio
function initAudio() {
    const audio = document.getElementById('backgroundio');
    if (!audio) {
        console.log('Audio no encontrado');
        return;
    }
    
    console.log('Audio encontrado, inicializando...');
    audio.volume = 0.3;
    
    const playAudio = () => {
        audio.play().catch(error => {
            console.log('Audio requiere interacción del usuario:', error);
        });
    };
    
    document.addEventListener('click', function() {
        if (audio.paused) {
            console.log('Reproduciendo audio por clic');
            playAudio();
        }
    });
    
    setTimeout(playAudio, 1000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAudio);
} else {
    initAudio();
}