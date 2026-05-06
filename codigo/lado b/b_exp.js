        document.addEventListener('DOMContentLoaded', function() {
            const fondoExposicion = document.getElementById('fondo-exposicion');
            const textoImagen = document.getElementById('texto-imagen');
            const flechaSiguiente = document.getElementById('flecha-siguiente');
            
            console.log("=== EXPOSICIÓN LADO B INICIADA ===");
            
            const TODAS_LAS_IMAGENES_B = ["B1", "B2", "B3", "B4", "B5", "B6"];
            
            flechaSiguiente.style.display = 'none';
            flechaSiguiente.classList.remove('mostrar');
            
            function obtenerImagenesVistas() {
                try {
                    const vistas = JSON.parse(sessionStorage.getItem('imagenesVistasSessionB')) || [];
                    console.log("Imágenes vistas lado B recuperadas:", vistas);
                    return vistas;
                } catch (error) {
                    console.error("Error al obtener imágenes vistas lado B:", error);
                    return [];
                }
            }
            
            function guardarImagenesVistas(vistas) {
                try {
                    sessionStorage.setItem('imagenesVistasSessionB', JSON.stringify(vistas));
                    console.log("Imágenes vistas lado B guardadas:", vistas);
                } catch (error) {
                    console.error("Error al guardar imágenes vistas lado B:", error);
                }
            }
            
            function verificarTodasVistas() {
                const imagenesVistas = obtenerImagenesVistas();
                
                console.log("=== VERIFICANDO EN EXPOSICIÓN LADO B ===");
                console.log("Imágenes requeridas:", TODAS_LAS_IMAGENES_B);
                console.log("Imágenes vistas:", imagenesVistas);
                
                const todasVistas = TODAS_LAS_IMAGENES_B.every(imagen => 
                    imagenesVistas.includes(imagen)
                );
                
                console.log("¿Todas las imágenes han sido vistas en lado B?", todasVistas);
                
                if (todasVistas) {
                    flechaSiguiente.classList.add('mostrar');
                    flechaSiguiente.style.display = 'block';
                    console.log("✅ TODAS LAS IMÁGENES VISTAS LADO B - Flecha activada en exposición");
                } else {
                    flechaSiguiente.classList.remove('mostrar');
                    flechaSiguiente.style.display = 'none';
                    
                    const faltantes = TODAS_LAS_IMAGENES_B.filter(imagen => 
                        !imagenesVistas.includes(imagen)
                    );
                    console.log("❌ Faltan por ver en lado B:", faltantes);
                }
            }
            
            const datosGuardados = sessionStorage.getItem('imagenSeleccionadaB');
            if (datosGuardados) {
                try {
                    const datos = JSON.parse(datosGuardados);
                    console.log("🖼️ Cargando imagen lado B:", datos);
                    
                    textoImagen.textContent = datos.texto;
                    fondoExposicion.style.backgroundImage = `url('${datos.imagen}')`;
                    
                    verificarTodasVistas();
                    
                } catch (error) {
                    console.error("❌ Error al cargar datos lado B:", error);
                }
            } else {
                console.log("⚠️ No hay imagen seleccionada para mostrar en lado B");
            }
            
            setTimeout(() => {
                sessionStorage.removeItem('imagenSeleccionadaB');
                console.log("🧹 Datos de imagen seleccionada lado B limpiados");
            }, 100);
            
            setTimeout(() => {
                console.log("=== ESTADO FINAL EN EXPOSICIÓN LADO B ===");
                console.log("Imágenes vistas total lado B:", obtenerImagenesVistas().length);
                console.log("Flecha visible lado B:", flechaSiguiente.classList.contains('mostrar'));
            }, 200);
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