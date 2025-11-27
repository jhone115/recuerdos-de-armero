        // a_exp.js - Lado A Exposición
        document.addEventListener('DOMContentLoaded', function() {
            const fondoExposicion = document.getElementById('fondo-exposicion');
            const tituloImagen = document.getElementById('titulo-imagen');
            const textoImagen = document.getElementById('texto-imagen');
            const flechaSiguiente = document.getElementById('flecha-siguiente');
            
            // Función para actualizar la exposición
            function actualizarExposicion(imagenSrc, titulo, texto) {
                console.log("Actualizando exposición:", imagenSrc, titulo);
                
                // Establecer la imagen como fondo
                fondoExposicion.style.backgroundImage = `url('${imagenSrc}')`;
                
                // Actualizar título y texto
                tituloImagen.textContent = titulo;
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
            
            // Función para verificar si todas las imágenes han sido vistas
            function verificarTodasVistas() {
                const imagenesVistas = JSON.parse(localStorage.getItem('imagenesVistas')) || [];
                const todasLasImagenes = [
                    "Caja Agraria",
                    "Hospital San Lorenzo", 
                    "Banco Cafetero",
                    "Colegio La Sagrada Familia",
                    "Iglesia del Carmen",
                    "Almacenes Yep"
                ];
                
                // Verificar si todos los textos están en el array de imágenes vistas
                const todasVistas = todasLasImagenes.every(texto => imagenesVistas.includes(texto));
                
                if (todasVistas) {
                    flechaSiguiente.classList.add('mostrar');
                    console.log("Todas las imágenes han sido vistas. Mostrando flecha de siguiente sección.");
                }
            }
            
            // Cargar imagen inicial si existe
            const datosGuardados = localStorage.getItem('imagenSeleccionada');
            if (datosGuardados) {
                try {
                    const datos = JSON.parse(datosGuardados);
                    actualizarExposicion(datos.imagen, datos.titulo, datos.texto);
                    
                    // Marcar esta imagen como vista
                    let imagenesVistas = JSON.parse(localStorage.getItem('imagenesVistas')) || [];
                    if (!imagenesVistas.includes(datos.titulo)) {
                        imagenesVistas.push(datos.titulo);
                        localStorage.setItem('imagenesVistas', JSON.stringify(imagenesVistas));
                        console.log("Imagen marcada como vista en exposición:", datos.titulo);
                    }
                    
                    // Verificar si ya se vieron todas las imágenes
                    verificarTodasVistas();
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
                        actualizarExposicion(datos.imagen, datos.titulo, datos.texto);
                    } catch (error) {
                        console.error("Error al parsear datos:", error);
                    }
                }
            });
        });