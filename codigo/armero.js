document.addEventListener("DOMContentLoaded", () => {
    console.log('✅ Página principal cargada');
    
    const intro = document.getElementById("intro");
    const contenido = document.getElementById("contenido");
    const texto = contenido ? contenido.querySelector(".texto") : null;
    const titulo = intro ? intro.querySelector(".titulo") : null;
    const subtitulo = intro ? intro.querySelector(".subtitulo") : null;
    const fullscreenBtn = document.getElementById("fullscreen-btn");
    const btnAtras = document.getElementById("btn-atras");
    const btnAdelante = document.getElementById("btn-adelante");

    console.log('🔍 Elementos encontrados:', {
        intro: !!intro,
        contenido: !!contenido,
        texto: !!texto,
        titulo: !!titulo,
        subtitulo: !!subtitulo,
        fullscreenBtn: !!fullscreenBtn,
        btnAtras: !!btnAtras,
        btnAdelante: !!btnAdelante
    });

    // Verificar estado de pantalla completa
    const fullscreenEstado = localStorage.getItem('fullscreen');
    console.log('🔍 Estado fullscreen:', fullscreenEstado);

    if (fullscreenEstado === 'true' && !document.fullscreenElement) {
        console.log('🔄 Intentando restaurar pantalla completa...');
        // En GitHub Pages, necesitamos una interacción del usuario
        // Solo intentaremos si hay un botón de pantalla completa
    }

    // Configurar botón de pantalla completa
    if (fullscreenBtn) {
        console.log('🔧 Configurando botón de pantalla completa');
        
        fullscreenBtn.addEventListener("click", () => {
            if (!document.fullscreenElement) {
                console.log('🔄 Activando pantalla completa');
                document.documentElement.requestFullscreen().catch(err => {
                    console.error('❌ Error activando pantalla completa:', err);
                });
                localStorage.setItem('fullscreen', 'true');
            } else {
                console.log('🔙 Saliendo de pantalla completa');
                document.exitFullscreen();
                localStorage.setItem('fullscreen', 'false');
            }
        });

        document.addEventListener("fullscreenchange", () => {
            const isFullscreen = !!document.fullscreenElement;
            console.log('🔄 Cambio de pantalla completa:', isFullscreen);
            localStorage.setItem('fullscreen', isFullscreen ? 'true' : 'false');
            
            if (isFullscreen) {
                fullscreenBtn.src = "recursos/imagenes/menos.png";
            } else {
                fullscreenBtn.src = "recursos/imagenes/mas.png";
            }
        });

        // Establecer imagen inicial
        if (document.fullscreenElement) {
            fullscreenBtn.src = "recursos/imagenes/menos.png";
        } else {
            fullscreenBtn.src = "recursos/imagenes/mas.png";
        }
    }

    // Solo configurar eventos si los elementos existen
    if (titulo && subtitulo) {
        titulo.addEventListener("click", cambiarPantalla);
        subtitulo.addEventListener("click", cambiarPantalla);
    }

    if (btnAtras) {
        btnAtras.addEventListener("click", volverPortada);
    }

    if (btnAdelante) {
        btnAdelante.addEventListener("click", () => {
            console.log('🚀 Redirigiendo a lado A');
            localStorage.setItem('fullscreen', document.fullscreenElement ? 'true' : 'false');
            window.location.href = "codigo/lado a/a.html";
        });
    }

    function cambiarPantalla() {
        console.log('🔄 Cambiando a pantalla de contenido');
        if (!intro || !contenido) return;
        
        intro.style.opacity = "0";
        intro.style.transform = "scale(1.05)";

        setTimeout(() => {
            intro.classList.add("oculto");
            contenido.classList.remove("oculto");
            
            contenido.style.opacity = "0";
            contenido.offsetHeight;

            setTimeout(() => {
                contenido.style.opacity = "1";
                contenido.classList.add("mostrar");
                if (texto) texto.classList.add("mostrar");
            }, 50);
        }, 1000);
    }

    function volverPortada() {
        console.log('🔙 Volviendo a portada');
        if (!intro || !contenido) return;
        
        contenido.style.opacity = "0";
        contenido.style.transform = "scale(1.05)";

        setTimeout(() => {
            contenido.classList.add("oculto");
            contenido.classList.remove("mostrar");
            if (texto) texto.classList.remove("mostrar");
            intro.classList.remove("oculto");
            
            intro.style.opacity = "0";
            intro.offsetHeight;

            setTimeout(() => {
                intro.style.opacity = "1";
                intro.style.transform = "scale(1)";
            }, 50);
        }, 1000);
    }
});