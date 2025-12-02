// a_exp.js - Lado A Exposición (Sistema de rastreo mejorado)
document.addEventListener('DOMContentLoaded', function() {
    const imagenAmpliada = document.getElementById('polaroid-imagen'); // Cambiado el ID
    const tituloImagen = document.getElementById('titulo-imagen');
    const textoImagen = document.getElementById('texto-imagen');
    const flechaSiguiente = document.getElementById('flecha-siguiente');
    
    console.log("=== EXPOSICIÓN INICIADA ===");
    
    // Lista de todas las imágenes que deben ser vistas
    const TODAS_LAS_IMAGENES = [
        "Caja Agraria",
        "Hospital San Lorenzo", 
        "Banco Cafetero",
        "Colegio La Sagrada Familia",
        "Iglesia del Carmen",
        "Almacenes Yep"
    ];
    
    // Inicializar la flecha como oculta
    flechaSiguiente.style.display = 'none';
    flechaSiguiente.classList.remove('mostrar');
    
    // Función para obtener imágenes vistas
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
    
    // Función para guardar imágenes vistas
    function guardarImagenesVistas(vistas) {
        try {
            sessionStorage.setItem('imagenesVistasSession', JSON.stringify(vistas));
            console.log("Imágenes vistas guardadas:", vistas);
        } catch (error) {
            console.error("Error al guardar imágenes vistas:", error);
        }
    }
    
    // Función para verificar si todas las imágenes han sido vistas
    function verificarTodasVistas() {
        const imagenesVistas = obtenerImagenesVistas();
        
        console.log("=== VERIFICANDO EN EXPOSICIÓN ===");
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
            console.log("✅ TODAS LAS IMÁGENES VISTAS - Flecha activada en exposición");
        } else {
            flechaSiguiente.classList.remove('mostrar');
            flechaSiguiente.style.display = 'none';
            
            // Mostrar cuáles faltan
            const faltantes = TODAS_LAS_IMAGENES.filter(imagen => 
                !imagenesVistas.includes(imagen)
            );
            console.log("❌ Faltan por ver:", faltantes);
        }
    }
    
    // Cargar y mostrar la imagen seleccionada
    const datosGuardados = sessionStorage.getItem('imagenSeleccionada');
    if (datosGuardados) {
        try {
            const datos = JSON.parse(datosGuardados);
            console.log("🖼️ Cargando imagen:", datos.titulo);
            
            // Mostrar la imagen AMPLIADA
            imagenAmpliada.src = datos.imagen;
            imagenAmpliada.alt = datos.titulo;
            tituloImagen.textContent = datos.titulo;
            textoImagen.textContent = datos.texto;
            
            // Marcar esta imagen como vista (doble verificación)
            let imagenesVistas = obtenerImagenesVistas();
            if (!imagenesVistas.includes(datos.titulo)) {
                imagenesVistas.push(datos.titulo);
                guardarImagenesVistas(imagenesVistas);
                console.log("📝 Imagen marcada como vista en exposición:", datos.titulo);
            }
            
            // Verificar estado
            verificarTodasVistas();
            
            // Cargar la imagen con precarga para evitar parpadeo
            const imgPreload = new Image();
            imgPreload.src = datos.imagen;
            imgPreload.onload = function() {
                imagenAmpliada.style.opacity = '1';
                // Ajustar tamaño del marco según la imagen
                ajustarMarcoPolaroid();
            };
            
        } catch (error) {
            console.error("❌ Error al cargar datos:", error);
        }
    } else {
        console.log("⚠️ No hay imagen seleccionada para mostrar");
    }
    
    // Función para ajustar el marco de la polaroid según el tamaño de la imagen
    function ajustarMarcoPolaroid() {
        const imagen = document.getElementById('polaroid-imagen');
        const marco = document.querySelector('.marco-polaroid');
        
        if (imagen.naturalWidth > 0) {
            // Si la imagen es más ancha que alta, hacer el marco más ancho
            const ratio = imagen.naturalWidth / imagen.naturalHeight;
            if (ratio > 1.5) {
                marco.style.maxWidth = '90%';
            }
        }
    }
    
    // Limpiar datos de imagen seleccionada después de mostrarla
    setTimeout(() => {
        sessionStorage.removeItem('imagenSeleccionada');
        console.log("🧹 Datos de imagen seleccionada limpiados");
    }, 100);
    
    // Verificación final
    setTimeout(() => {
        console.log("=== ESTADO FINAL EN EXPOSICIÓN ===");
        console.log("Imágenes vistas total:", obtenerImagenesVistas().length);
        console.log("Flecha visible:", flechaSiguiente.classList.contains('mostrar'));
    }, 200);
});

window.addEventListener('load', function() {
    if (isMobileDevice()) {
        setTimeout(() => {
            activateFullscreen();
        }, 1000); // Pequeño delay para permitir interacción del usuario
    }
});

// Forzar landscape en móvil
function forceLandscape() {
    if (isMobileDevice() && window.innerHeight > window.innerWidth) {
        // Intentar bloquear orientación (solo algunos navegadores)
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape').catch(function(error) {
                console.log('Orientación no se puede bloquear: ', error);
            });
        }
    }
}

// Llamar después de pantalla completa
document.addEventListener('fullscreenchange', function() {
    if (isFullscreen()) {
        forceLandscape();
    }
});