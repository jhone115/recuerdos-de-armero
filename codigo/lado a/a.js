document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ a.html cargado');
    
    // Verificar y restaurar pantalla completa
    const fullscreenEstado = localStorage.getItem('fullscreen');
    console.log('🔍 Estado fullscreen en localStorage:', fullscreenEstado);
    
    if (fullscreenEstado === 'true' && !document.fullscreenElement) {
        console.log('🔄 Intentando restaurar pantalla completa...');
        setTimeout(() => {
            document.documentElement.requestFullscreen().catch(err => {
                console.error('❌ Error al restaurar pantalla completa:', err);
            });
        }, 1000);
    }

    const polaroidGrid = document.querySelector('.polaroid-grid');
    const fullscreenBtn = document.getElementById('fullscreen-btn');

    console.log('🔍 Elementos encontrados:', {
        polaroidGrid: !!polaroidGrid,
        fullscreenBtn: !!fullscreenBtn
    });

    const polaroids = [
        { 
            id: 1, 
            title: "", 
            image: "../recursos/imagenes/IMG-20251005-WA0010.jpg",
            description: "",
            rotation: "-3deg"
        },
        { 
            id: 2, 
            title: "", 
            image: "../recursos/imagenes/IMG-20251005-WA0012.jpg",
            description: "",
            rotation: "2deg"
        },
        { 
            id: 3, 
            title: "", 
            image: "../recursos/imagenes/IMG-20251005-WA0014.jpg",
            description: "",
            rotation: "-1deg"
        },
        { 
            id: 4, 
            title: "", 
            image: "../recursos/imagenes/IMG-20251005-WA0013.jpg",
            description: "",
            rotation: "3deg"
        },
        { 
            id: 5, 
            title: "", 
            image: "../recursos/imagenes/IMG-20251005-WA0004.jpg",
            description: "",
            rotation: "-2deg"
        },
        { 
            id: 6, 
            title: "", 
            image: "../recursos/imagenes/IMG-20251005-WA0008.jpg",
            description: "",
            rotation: "1deg"
        }
    ];

    // Verificar qué polaroids se han visto
    const getVistoPolaroids = () => {
        const visto = localStorage.getItem('vistoPolaroids');
        console.log('📋 Polaroids vistas:', visto);
        return visto ? JSON.parse(visto) : [];
    };

    const setVistoPolaroid = (id) => {
        const visto = getVistoPolaroids();
        if (!visto.includes(id)) {
            visto.push(id);
            localStorage.setItem('vistoPolaroids', JSON.stringify(visto));
            console.log('✅ Polaroid marcada como vista:', id);
        }
    };

    const todasVistas = () => {
        const visto = getVistoPolaroids();
        const todas = polaroids.every(polaroid => visto.includes(polaroid.id));
        console.log('🔍 Todas las polaroids vistas?', todas);
        return todas;
    };

    // Crear las polaroids
    console.log('🎨 Creando polaroids...');
    polaroids.forEach(polaroid => {
        console.log('➕ Creando polaroid:', polaroid.id, polaroid.image);
        
        const polaroidElement = document.createElement('div');
        polaroidElement.className = 'polaroid';
        polaroidElement.style.setProperty('--rotation', polaroid.rotation);
        polaroidElement.setAttribute('data-id', polaroid.id);
        
        // Verificar si la imagen existe
        const img = new Image();
        img.onload = function() {
            console.log('✅ Imagen cargada correctamente:', polaroid.image);
        };
        img.onerror = function() {
            console.error('❌ Error cargando imagen:', polaroid.image);
        };
        img.src = polaroid.image;
        
        // Contenido especial para la sexta polaroid si todas fueron vistas
        if (polaroid.id === 6 && todasVistas()) {
            console.log('🎯 Mostrando flecha en polaroid 6');
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
            const id = parseInt(this.getAttribute('data-id'));
            console.log('🖱️ Clic en polaroid:', id);
            
            // Marcar esta polaroid como vista
            setVistoPolaroid(id);
            
            // Guardar estado de pantalla completa antes de redirigir
            const isFullscreen = !!document.fullscreenElement;
            localStorage.setItem('fullscreen', isFullscreen ? 'true' : 'false');
            console.log('💾 Guardando estado fullscreen:', isFullscreen);
            
            // Si es la polaroid 6 y todas han sido vistas, ir al Lado B
            if (id === 6 && todasVistas()) {
                console.log('🚀 Redirigiendo al Lado B');
                document.querySelector('.pantalla-a').classList.add('page-turn');
                
                setTimeout(() => {
                    window.location.href = 'lado b/b.html';
                }, 1000);
            } else {
                console.log('📄 Redirigiendo a experiencia:', id);
                document.querySelector('.pantalla-a').classList.add('page-turn');
                
                setTimeout(() => {
                    window.location.href = `a_exp.html?id=${id}`;
                }, 1000);
            }
        });
        
        polaroidGrid.appendChild(polaroidElement);
    });

    console.log('✅ Todas las polaroids creadas');

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
                fullscreenBtn.src = "../recursos/imagenes/menos.png";
            } else {
                fullscreenBtn.src = "../recursos/imagenes/mas.png";
            }
        });

        // Establecer imagen inicial
        if (document.fullscreenElement) {
            fullscreenBtn.src = "../recursos/imagenes/menos.png";
        } else {
            fullscreenBtn.src = "../recursos/imagenes/mas.png";
        }
    }

    // Verificar al cargar si todas están vistas
    setTimeout(() => {
        const todasVistasEstado = todasVistas();
        console.log('🔍 Estado final - Todas vistas:', todasVistasEstado);
        
        if (todasVistasEstado) {
            const sextaPolaroid = document.querySelector('.polaroid[data-id="6"]');
            if (sextaPolaroid && !sextaPolaroid.classList.contains('polaroid-with-arrow')) {
                console.log('🔄 Actualizando polaroid 6 con flecha');
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
    }, 100);
});