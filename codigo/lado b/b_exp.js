// b_exp.js - Lado B Exposición
document.addEventListener('DOMContentLoaded', function() {
    const fondoExposicion = document.getElementById('fondo-exposicion');
    const textoImagen = document.getElementById('texto-imagen');
    
    // Función para actualizar la exposición
    function actualizarExposicion(imagenSrc, texto) {
        console.log("Actualizando exposición:", imagenSrc);
        
        // Establecer la imagen como fondo
        fondoExposicion.style.backgroundImage = `url('${imagenSrc}')`;
        
        // Actualizar texto
        textoImagen.textContent = texto;
        
        // Precargar la imagen para evitar problemas de carga
        const img = new Image();
        img.src = imagenSrc;
        img.onload = function() {
            console.log("Imagen cargada correctamente");
        };
        img.onerror = function() {
            console.error("Error al cargar la imagen:", imagenSrc);
        };
    }
    
    // Cargar imagen inicial si existe
    const datosGuardados = localStorage.getItem('imagenSeleccionada');
    if (datosGuardados) {
        try {
            const datos = JSON.parse(datosGuardados);
            actualizarExposicion(datos.imagen, datos.texto);
        } catch (error) {
            console.error("Error al parsear datos:", error);
        }
    } else {
        console.log("No hay datos guardados en localStorage");
    }
    
    // También escuchar cambios en tiempo real por si se actualiza
    window.addEventListener('storage', function(e) {
        if (e.key === 'imagenSeleccionada' && e.newValue) {
            try {
                const datos = JSON.parse(e.newValue);
                actualizarExposicion(datos.imagen, datos.texto);
            } catch (error) {
                console.error("Error al parsear datos:", error);
            }
        }
    });
});