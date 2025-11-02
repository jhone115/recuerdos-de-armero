document.addEventListener('DOMContentLoaded', function() {
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

    // Sistema para rastrear TODAS las polaroids vistas
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

    const todasVistas = () => {
        const visto = getVistoPolaroids();
        return polaroids.every(polaroid => visto.includes(polaroid.id));
    };

    // Configurar pantalla completa
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
        // Guardar estado de pantalla completa
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

        // Cambiar imagen según el estado de pantalla completa
        document.addEventListener("fullscreenchange", () => {
            if (document.fullscreenElement) {
                fullscreenBtn.src = "../../recursos/imagenes/menos.png";
                guardarEstadoFullscreen(true);
            } else {
                fullscreenBtn.src = "../../recursos/imagenes/mas.png";
                guardarEstadoFullscreen(false);
            }
        });

        // Establecer imagen inicial
        if (document.fullscreenElement) {
            fullscreenBtn.src = "../../recursos/imagenes/menos.png";
        } else {
            fullscreenBtn.src = "../../recursos/imagenes/mas.png";
        }
    }

    // Crear las polaroids
    polaroids.forEach(polaroid => {
        const polaroidElement = document.createElement('div');
        polaroidElement.className = 'polaroid';
        polaroidElement.style.setProperty('--rotation', polaroid.rotation);
        polaroidElement.setAttribute('data-id', polaroid.id);
        
        // Contenido especial para la sexta polaroid si TODAS fueron vistas
        if (polaroid.id === 6 && todasVistas()) {
            polaroidElement.innerHTML = `
                <div class="polaroid-image" style="background-image: url('${polaroid.image}')">
                    <div class="continue-arrow">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </div>
                </div>
                <div class="polaroid-caption">${polaroid.title}</div>
            `;
            polaroidElement.classList.add('polaroid-with-arrow');
        } else {
            polaroidElement.innerHTML = `
                <div class="polaroid-image" style="background-image: url('${polaroid.image}')"></div>
                <div class="polaroid-caption">${polaroid.title}</div>
            `;
        }
        
        // Añadir evento de clic para la animación y redirección
        polaroidElement.addEventListener('click', function(e) {
            // Evitar que se active al hacer clic en la flecha
            if (e.target.closest('.continue-arrow')) {
                return;
            }
            
            const id = this.getAttribute('data-id');
            
            // Marcar esta polaroid como vista
            setVistoPolaroid(parseInt(id));
            
            // Guardar estado de pantalla completa antes de redirigir
            localStorage.setItem('fullscreen', document.fullscreenElement ? 'true' : 'false');
            
            // Si es la polaroid 6 y TODAS han sido vistas, ir al Lado B
            if (id === '6' && todasVistas()) {
                // Aplicar animación de paso de hoja de libro a toda la pantalla
                document.querySelector('.pantalla-a').classList.add('page-turn');
                
                // Redirigir después de la animación
                setTimeout(() => {
                    // Detectar si estamos en GitHub Pages o local
                    const isGitHubPages = window.location.hostname.includes('github.io');
                    
                    if (isGitHubPages) {
                        window.location.href = '../lado%20b/b.html';
                    } else {
                        window.location.href = '../lado b/b.html';
                    }
                }, 1000);
            } else {
                // Aplicar animación de paso de hoja de libro a toda la pantalla
                document.querySelector('.pantalla-a').classList.add('page-turn');
                
                // Redirigir después de la animación
                setTimeout(() => {
                    window.location.href = `a_exp.html?id=${id}`;
                }, 1000);
            }
        });
        
        polaroidGrid.appendChild(polaroidElement);
    });

    // Función para actualizar la sexta polaroid si es necesario
    const actualizarSextaPolaroid = () => {
        if (todasVistas()) {
            const sextaPolaroid = document.querySelector('.polaroid[data-id="6"]');
            if (sextaPolaroid && !sextaPolaroid.classList.contains('polaroid-with-arrow')) {
                sextaPolaroid.innerHTML = `
                    <div class="polaroid-image" style="background-image: url('${polaroids[5].image}')">
                        <div class="continue-arrow">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </div>
                    </div>
                    <div class="polaroid-caption">${polaroids[5].title}</div>
                `;
                sextaPolaroid.classList.add('polaroid-with-arrow');
            }
        }
    };

    // Verificar al cargar si todas están vistas y actualizar
    actualizarSextaPolaroid();
});