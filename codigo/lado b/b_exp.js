        // b_exp.js - Lado B Exposición (Sistema de rastreo mejorado)
        document.addEventListener('DOMContentLoaded', function() {
            const fondoExposicion = document.getElementById('fondo-exposicion');
            const textoImagen = document.getElementById('texto-imagen');
            const flechaSiguiente = document.getElementById('flecha-siguiente');
            
            console.log("=== EXPOSICIÓN LADO B INICIADA ===");
            
            // Lista de todas las imágenes que deben ser vistas (identificadores)
            const TODAS_LAS_IMAGENES_B = ["B1", "B2", "B3", "B4", "B5", "B6"];
            
            // Inicializar la flecha como oculta
            flechaSiguiente.style.display = 'none';
            flechaSiguiente.classList.remove('mostrar');
            
            // Función para obtener imágenes vistas
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
            
            // Función para guardar imágenes vistas
            function guardarImagenesVistas(vistas) {
                try {
                    sessionStorage.setItem('imagenesVistasSessionB', JSON.stringify(vistas));
                    console.log("Imágenes vistas lado B guardadas:", vistas);
                } catch (error) {
                    console.error("Error al guardar imágenes vistas lado B:", error);
                }
            }
            
            // Función para verificar si todas las imágenes han sido vistas
            function verificarTodasVistas() {
                const imagenesVistas = obtenerImagenesVistas();
                
                console.log("=== VERIFICANDO EN EXPOSICIÓN LADO B ===");
                console.log("Imágenes requeridas:", TODAS_LAS_IMAGENES_B);
                console.log("Imágenes vistas:", imagenesVistas);
                
                // Verificar que todas las imágenes requeridas estén en las vistas
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
                    
                    // Mostrar cuáles faltan
                    const faltantes = TODAS_LAS_IMAGENES_B.filter(imagen => 
                        !imagenesVistas.includes(imagen)
                    );
                    console.log("❌ Faltan por ver en lado B:", faltantes);
                }
            }
            
            // Cargar y mostrar la imagen seleccionada
            const datosGuardados = sessionStorage.getItem('imagenSeleccionadaB');
            if (datosGuardados) {
                try {
                    const datos = JSON.parse(datosGuardados);
                    console.log("🖼️ Cargando imagen lado B:", datos);
                    
                    // Mostrar la imagen
                    textoImagen.textContent = datos.texto;
                    fondoExposicion.style.backgroundImage = `url('${datos.imagen}')`;
                    
                    // Marcar esta imagen como vista (doble verificación)
                    let imagenesVistas = obtenerImagenesVistas();
                    // Pero note: en el lado B, no tenemos el data-texto en los datos de exposición, así que no podemos marcarlo aquí.
                    // En su lugar, el marcado se hace en la galería (b.html) cuando se hace clic. 
                    // Pero por si acaso, podríamos intentar obtener el identificador de la imagen actual? 
                    // No lo tenemos en los datos guardados. Así que no podemos marcarlo aquí.
                    // Por lo tanto, confiamos en que se marcó en la galería.
                    
                    // Verificar estado
                    verificarTodasVistas();
                    
                } catch (error) {
                    console.error("❌ Error al cargar datos lado B:", error);
                }
            } else {
                console.log("⚠️ No hay imagen seleccionada para mostrar en lado B");
            }
            
            // Limpiar datos de imagen seleccionada después de mostrarla
            setTimeout(() => {
                sessionStorage.removeItem('imagenSeleccionadaB');
                console.log("🧹 Datos de imagen seleccionada lado B limpiados");
            }, 100);
            
            // Verificación final
            setTimeout(() => {
                console.log("=== ESTADO FINAL EN EXPOSICIÓN LADO B ===");
                console.log("Imágenes vistas total lado B:", obtenerImagenesVistas().length);
                console.log("Flecha visible lado B:", flechaSiguiente.classList.contains('mostrar'));
            }, 200);
        });