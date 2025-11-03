document.addEventListener('DOMContentLoaded', function() {
    console.log('=== INICIANDO B.JS ===');
    
    const polaroidGrid = document.querySelector('.polaroid-grid');
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

    // Crear las polaroids (SIN rotación individual en estilo, ya está en CSS)
    polaroids.forEach(polaroid => {
        const polaroidElement = document.createElement('div');
        polaroidElement.className = 'polaroid';
        polaroidElement.setAttribute('data-id', polaroid.id);
        
        polaroidElement.innerHTML = `
            <div class="polaroid-image" style="background-image: url('${polaroid.image}')"></div>
            <div class="polaroid-caption">${polaroid.title}</div>
        `;
        
        // Evento clic
        polaroidElement.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            console.log('Click en polaroid:', id);
            
            // Para testing, redirige a la página de detalle
            window.location.href = `b_exp.html?id=${id}`;
        });
        
        polaroidGrid.appendChild(polaroidElement);
    });

    // Configurar botones
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener("click", () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });
    }

    const btnAtras = document.getElementById('btn-atras');
    if (btnAtras) {
        btnAtras.addEventListener('click', function() {
            window.location.href = '../../index.html';
        });
    }
});

// Sistema de audio
function initAudio() {
    const audio = document.getElementById('backgroundio');
    if (audio) {
        audio.volume = 0.3;
        document.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAudio);
} else {
    initAudio();
}