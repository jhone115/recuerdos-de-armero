        document.addEventListener('DOMContentLoaded', function() {
            const itemsGaleria = document.querySelectorAll('.item-galeria');
            const flechaSiguiente = document.getElementById('flecha-siguiente');
            
            const TODAS_LAS_IMAGENES = [
                "Caja Agraria",
                "Hospital San Lorenzo", 
                "Banco Cafetero",
                "Colegio La Sagrada Familia",
                "Iglesia del Carmen",
                "Almacenes Yep"
            ];
            
            console.log("=== INICIALIZANDO SISTEMA DE RASTREO ===");
            
            flechaSiguiente.style.display = 'none';
            flechaSiguiente.classList.remove('mostrar');
            
            function obtenerImagenesVistas() {
                try {
                    const vistas = JSON.parse(sessionStorage.getItem('imagenesVistasSession')) || [];
                    console.log("Imágenes vistas recuperadas:", vistas);
                    return vistas;
                } catch (error) {
                    console.error("Error al obtener imágenes vistas:", error);
                    return [];
                }
            }
            
            function guardarImagenesVistas(vistas) {
                try {
                    sessionStorage.setItem('imagenesVistasSession', JSON.stringify(vistas));
                    console.log("Imágenes vistas guardadas:", vistas);
                } catch (error) {
                    console.error("Error al guardar imágenes vistas:", error);
                }
            }
            
            function verificarTodasVistas() {
                const imagenesVistas = obtenerImagenesVistas();
                
                console.log("=== VERIFICANDO IMÁGENES VISTAS ===");
                console.log("Imágenes requeridas:", TODAS_LAS_IMAGENES);
                console.log("Imágenes vistas:", imagenesVistas);
                
                // Verificar que todas las imágenes requeridas estén en las vistas
                const todasVistas = TODAS_LAS_IMAGENES.every(imagen => 
                    imagenesVistas.includes(imagen)
                );
                
                console.log("¿Todas las imágenes han sido vistas?", todasVistas);
                
                if (todasVistas) {
                    flechaSiguiente.classList.add('mostrar');
                    flechaSiguiente.style.display = 'block';
                    console.log("✅ TODAS LAS IMÁGENES VISTAS - Flecha activada");
                } else {
                    flechaSiguiente.classList.remove('mostrar');
                    flechaSiguiente.style.display = 'none';
                    
                    const faltantes = TODAS_LAS_IMAGENES.filter(imagen => 
                        !imagenesVistas.includes(imagen)
                    );
                    console.log("❌ Faltan por ver:", faltantes);
                }
                
                return todasVistas;
            }
            
            verificarTodasVistas();
            
            itemsGaleria.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const imagenSrc = this.getAttribute('data-imagen');
                    const texto = this.getAttribute('data-texto');
                    const descripcion = this.getAttribute('data-descripcion');
                    
                    console.log("🖱️ Clic en imagen:", texto);
                    
                    if (!imagenSrc || !texto) {
                        console.error("❌ Datos incompletos en:", this);
                        return;
                    }
                    
                    const datosExposicion = {
                        titulo: texto,
                        imagen: imagenSrc,
                        texto: descripcion,
                        timestamp: Date.now()
                    };
                    
                    try {
                        sessionStorage.setItem('imagenSeleccionada', JSON.stringify(datosExposicion));
                        console.log("📤 Datos guardados para exposición:", datosExposicion);
                        
                        // Actualizar lista de imágenes vistas
                        let imagenesVistas = obtenerImagenesVistas();
                        if (!imagenesVistas.includes(texto)) {
                            imagenesVistas.push(texto);
                            guardarImagenesVistas(imagenesVistas);
                            console.log("📝 Imagen agregada a vistas:", texto);
                        }
                        
                        verificarTodasVistas();
                        
                        console.log("🔄 Redirigiendo a exposición...");
                        window.location.href = this.getAttribute('href');
                        
                    } catch (error) {
                        console.error("❌ Error crítico:", error);
                    }
                });
            });
            
            console.log("=== ESTADO FINAL INICIAL ===");
            console.log("Total de imágenes en galería:", itemsGaleria.length);
            console.log("Imágenes vistas actualmente:", obtenerImagenesVistas().length);
            console.log("Flecha visible:", flechaSiguiente.classList.contains('mostrar'));
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