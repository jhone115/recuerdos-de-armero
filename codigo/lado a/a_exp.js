
        // a_exp.js - Lado A Exposición (Sistema de rastreo mejorado)
        document.addEventListener('DOMContentLoaded', function() {
            const fondoExposicion = document.getElementById('fondo-exposicion');
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
                    
                    // Mostrar la imagen
                    tituloImagen.textContent = datos.titulo;
                    textoImagen.textContent = datos.texto;
                    fondoExposicion.style.backgroundImage = `url('${datos.imagen}')`;
                    
                    // Marcar esta imagen como vista (doble verificación)
                    let imagenesVistas = obtenerImagenesVistas();
                    if (!imagenesVistas.includes(datos.titulo)) {
                        imagenesVistas.push(datos.titulo);
                        guardarImagenesVistas(imagenesVistas);
                        console.log("📝 Imagen marcada como vista en exposición:", datos.titulo);
                    }
                    
                    // Verificar estado
                    verificarTodasVistas();
                    
                } catch (error) {
                    console.error("❌ Error al cargar datos:", error);
                }
            } else {
                console.log("⚠️ No hay imagen seleccionada para mostrar");
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