        // a_exp.js - Lado A Exposición (Versión Corregida)
        document.addEventListener('DOMContentLoaded', function() {
            const fondoExposicion = document.getElementById('fondo-exposicion');
            const tituloImagen = document.getElementById('titulo-imagen');
            const textoImagen = document.getElementById('texto-imagen');
            const flechaSiguiente = document.getElementById('flecha-siguiente');
            
            console.log("Página de exposición cargada - Estado inicial");
            
            // INICIALMENTE ASEGURAR QUE LA FLECHA ESTÉ OCULTA
            flechaSiguiente.style.display = 'none';
            flechaSiguiente.classList.remove('mostrar');
            
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
                };
                img.onerror = function() {
                    console.error("Error al cargar la imagen:", imagenSrc);
                    fondoExposicion.style.backgroundImage = "none";
                    fondoExposicion.style.backgroundColor = "#f0f0f0";
                };
                img.src = imagenSrc;
            }
            
            // Función para verificar si todas las imágenes han sido vistas
            function verificarTodasVistas() {
                const imagenesVistas = JSON.parse(sessionStorage.getItem('imagenesVistasSession')) || [];
                const todasLasImagenes = [
                    "Caja Agraria",
                    "Hospital San Lorenzo", 
                    "Banco Cafetero",
                    "Colegio La Sagrada Familia",
                    "Iglesia del Carmen",
                    "Almacenes Yep"
                ];
                
                console.log("Verificando en exposición:", {
                    imagenesVistas: imagenesVistas,
                    total: imagenesVistas.length,
                    necesarias: 6
                });
                
                // Verificar si todos los textos están en el array de imágenes vistas
                const todasVistas = todasLasImagenes.every(texto => imagenesVistas.includes(texto));
                
                if (todasVistas && imagenesVistas.length === 6) {
                    flechaSiguiente.classList.add('mostrar');
                    flechaSiguiente.style.display = 'block';
                    console.log("✓ Todas las imágenes han sido vistas. Mostrando flecha de siguiente sección.");
                } else {
                    flechaSiguiente.classList.remove('mostrar');
                    flechaSiguiente.style.display = 'none';
                    console.log("✗ Faltan imágenes por ver:", 
                        todasLasImagenes.filter(texto => !imagenesVistas.includes(texto)));
                }
            }
            
            // Cargar imagen inicial si existe
            const datosGuardados = sessionStorage.getItem('imagenSeleccionada');
            if (datosGuardados) {
                try {
                    const datos = JSON.parse(datosGuardados);
                    console.log("Datos recuperados de sessionStorage:", datos);
                    
                    // Verificar que los datos necesarios existen
                    if (datos.imagen && datos.titulo) {
                        actualizarExposicion(datos.imagen, datos.titulo, datos.texto);
                        
                        // Marcar esta imagen como vista en sessionStorage
                        let imagenesVistas = JSON.parse(sessionStorage.getItem('imagenesVistasSession')) || [];
                        if (!imagenesVistas.includes(datos.titulo)) {
                            imagenesVistas.push(datos.titulo);
                            sessionStorage.setItem('imagenesVistasSession', JSON.stringify(imagenesVistas));
                            console.log("Imagen marcada como vista en exposición:", datos.titulo);
                            console.log("Total de imágenes vistas:", imagenesVistas.length);
                        }
                        
                        // Verificar si ya se vieron todas las imágenes
                        verificarTodasVistas();
                    } else {
                        console.error("Datos incompletos en sessionStorage:", datos);
                    }
                } catch (error) {
                    console.error("Error al parsear datos:", error);
                }
            } else {
                console.log("No hay datos guardados en sessionStorage");
            }
            
            // Limpiar datos de imagen seleccionada después de mostrarla
            // Esto evita que se muestre la misma imagen si el usuario recarga
            setTimeout(() => {
                sessionStorage.removeItem('imagenSeleccionada');
                console.log("Datos de imagen seleccionada limpiados");
            }, 100);
            
            // Verificación final
            setTimeout(() => {
                console.log("Verificación final en exposición");
                verificarTodasVistas();
            }, 200);
        });