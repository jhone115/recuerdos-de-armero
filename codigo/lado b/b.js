        // b.js - Lado B Control (Sistema de rastreo mejorado)
        document.addEventListener('DOMContentLoaded', function() {
            const itemsGaleria = document.querySelectorAll('.item-galeria');
            const flechaSiguiente = document.getElementById('flecha-siguiente');
            
            // Lista de todas las imágenes que deben ser vistas (identificadores)
            const TODAS_LAS_IMAGENES_B = ["B1", "B2", "B3", "B4", "B5", "B6"];
            
            console.log("=== INICIALIZANDO SISTEMA DE RASTREO LADO B ===");
            
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
                
                console.log("=== VERIFICANDO IMÁGENES VISTAS LADO B ===");
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
                    console.log("✅ TODAS LAS IMÁGENES VISTAS LADO B - Flecha activada");
                } else {
                    flechaSiguiente.classList.remove('mostrar');
                    flechaSiguiente.style.display = 'none';
                    
                    // Mostrar cuáles faltan
                    const faltantes = TODAS_LAS_IMAGENES_B.filter(imagen => 
                        !imagenesVistas.includes(imagen)
                    );
                    console.log("❌ Faltan por ver en lado B:", faltantes);
                }
                
                return todasVistas;
            }
            
            // Verificar estado al cargar la página
            verificarTodasVistas();
            
            // Configurar event listeners para cada imagen
            itemsGaleria.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const imagenSrc = this.getAttribute('data-imagen');
                    const texto = this.getAttribute('data-texto'); // Ahora tenemos data-texto
                    const descripcion = this.getAttribute('data-descripcion');
                    
                    console.log("🖱️ Clic en imagen lado B:", texto);
                    
                    // Validar datos
                    if (!imagenSrc || !texto) {
                        console.error("❌ Datos incompletos en:", this);
                        return;
                    }
                    
                    // Preparar datos para la exposición
                    const datosExposicion = {
                        titulo: "", // Sin título para el lado B
                        imagen: imagenSrc,
                        texto: descripcion,
                        timestamp: Date.now()
                    };
                    
                    try {
                        // Guardar datos para la exposición
                        sessionStorage.setItem('imagenSeleccionadaB', JSON.stringify(datosExposicion));
                        console.log("📤 Datos guardados para exposición lado B:", datosExposicion);
                        
                        // Actualizar lista de imágenes vistas
                        let imagenesVistas = obtenerImagenesVistas();
                        if (!imagenesVistas.includes(texto)) {
                            imagenesVistas.push(texto);
                            guardarImagenesVistas(imagenesVistas);
                            console.log("📝 Imagen lado B agregada a vistas:", texto);
                        }
                        
                        // Verificar estado actual
                        verificarTodasVistas();
                        
                        // Redirigir a exposición
                        console.log("🔄 Redirigiendo a exposición lado B...");
                        window.location.href = this.getAttribute('href');
                        
                    } catch (error) {
                        console.error("❌ Error crítico lado B:", error);
                    }
                });
            });
            
            // Depuración: mostrar estado completo
            console.log("=== ESTADO FINAL INICIAL LADO B ===");
            console.log("Total de imágenes en galería lado B:", itemsGaleria.length);
            console.log("Imágenes vistas actualmente lado B:", obtenerImagenesVistas().length);
            console.log("Flecha visible lado B:", flechaSiguiente.classList.contains('mostrar'));
        });