        // a_exp.js - Lado A Exposición (Versión Mejorada)
        document.addEventListener('DOMContentLoaded', function() {
            const fondoExposicion = document.getElementById('fondo-exposicion');
            const tituloImagen = document.getElementById('titulo-imagen');
            const textoImagen = document.getElementById('texto-imagen');
            const flechaSiguiente = document.getElementById('flecha-siguiente');
            const mensajeError = document.getElementById('mensaje-error');
            
            // Función para actualizar la exposición
            function actualizarExposicion(imagenSrc, titulo, texto) {
                console.log("Actualizando exposición:", {imagenSrc, titulo, texto});
                
                // Actualizar título y texto
                tituloImagen.textContent = titulo || "Título no disponible";
                textoImagen.textContent = texto || "Descripción no disponible";
                
                // Precargar la imagen para evitar problemas de carga
                const img = new Image();
                img.onload = function() {
                    console.log("Imagen cargada correctamente:", imagenSrc);
                    // Establecer la imagen como fondo una vez cargada
                    fondoExposicion.style.backgroundImage = `url('${imagenSrc}')`;
                    mensajeError.style.display = 'none';
                };
                img.onerror = function() {
                    console.error("Error al cargar la imagen:", imagenSrc);
                    fondoExposicion.style.backgroundImage = "none";
                    fondoExposicion.style.backgroundColor = "#f0f0f0";
                    mensajeError.style.display = 'block';
                    
                    // Intentar cargar una imagen alternativa
                    cargarImagenAlternativa(imagenSrc);
                };
                img.src = imagenSrc;
            }
            
            // Función para intentar cargar una imagen alternativa
            function cargarImagenAlternativa(imagenSrc) {
                console.log("Intentando cargar imagen alternativa...");
                
                // Verificar si la ruta tiene problemas comunes
                let rutaAlternativa = imagenSrc;
                
                // Posibles correcciones de ruta
                if (imagenSrc.includes(" ")) {
                    // Reemplazar espacios por %20
                    rutaAlternativa = imagenSrc.replace(/ /g, "%20");
                    console.log("Intentando con espacios codificados:", rutaAlternativa);
                }
                
                // Intentar con ruta relativa diferente
                if (imagenSrc.startsWith("../../")) {
                    rutaAlternativa = imagenSrc.substring(6); // Quitar "../../"
                    console.log("Intentando con ruta relativa:", rutaAlternativa);
                }
                
                // Cargar imagen alternativa si es diferente
                if (rutaAlternativa !== imagenSrc) {
                    const imgAlt = new Image();
                    imgAlt.onload = function() {
                        console.log("Imagen alternativa cargada:", rutaAlternativa);
                        fondoExposicion.style.backgroundImage = `url('${rutaAlternativa}')`;
                        mensajeError.style.display = 'none';
                    };
                    imgAlt.src = rutaAlternativa;
                }
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
                } else {
                    console.log("Faltan imágenes por ver:", 
                        todasLasImagenes.filter(texto => !imagenesVistas.includes(texto)));
                }
            }
            
            // Cargar imagen inicial si existe
            const datosGuardados = localStorage.getItem('imagenSeleccionada');
            if (datosGuardados) {
                try {
                    const datos = JSON.parse(datosGuardados);
                    console.log("Datos recuperados:", datos);
                    
                    // Verificar que los datos necesarios existen
                    if (datos.imagen && datos.titulo) {
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
                    } else {
                        console.error("Datos incompletos en localStorage:", datos);
                        mensajeError.innerHTML = "<p>Error: Datos de imagen incompletos.</p><button onclick=\"document.getElementById('mensaje-error').style.display='none'\">Cerrar</button>";
                        mensajeError.style.display = 'block';
                    }
                } catch (error) {
                    console.error("Error al parsear datos:", error);
                    mensajeError.innerHTML = "<p>Error al cargar los datos de la imagen.</p><button onclick=\"document.getElementById('mensaje-error').style.display='none'\">Cerrar</button>";
                    mensajeError.style.display = 'block';
                }
            } else {
                console.log("No hay datos guardados en localStorage");
                mensajeError.innerHTML = "<p>No se ha seleccionado ninguna imagen.</p><button onclick=\"document.getElementById('mensaje-error').style.display='none'\">Cerrar</button>";
                mensajeError.style.display = 'block';
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