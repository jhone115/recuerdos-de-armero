        // a.js - Lado A Control (Sistema de rastreo mejorado)
        document.addEventListener('DOMContentLoaded', function() {
            const itemsGaleria = document.querySelectorAll('.item-galeria');
            const flechaSiguiente = document.getElementById('flecha-siguiente');
            
            // Lista de todas las imágenes que deben ser vistas
            const TODAS_LAS_IMAGENES = [
                "Caja Agraria",
                "Hospital San Lorenzo", 
                "Banco Cafetero",
                "Colegio La Sagrada Familia",
                "Iglesia del Carmen",
                "Almacenes Yep"
            ];
            
            console.log("=== INICIALIZANDO SISTEMA DE RASTREO ===");
            
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
                    
                    // Mostrar cuáles faltan
                    const faltantes = TODAS_LAS_IMAGENES.filter(imagen => 
                        !imagenesVistas.includes(imagen)
                    );
                    console.log("❌ Faltan por ver:", faltantes);
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
                    const texto = this.getAttribute('data-texto');
                    const descripcion = this.getAttribute('data-descripcion');
                    
                    console.log("🖱️ Clic en imagen:", texto);
                    
                    // Validar datos
                    if (!imagenSrc || !texto) {
                        console.error("❌ Datos incompletos en:", this);
                        return;
                    }
                    
                    // Preparar datos para la exposición
                    const datosExposicion = {
                        titulo: texto,
                        imagen: imagenSrc,
                        texto: descripcion,
                        timestamp: Date.now()
                    };
                    
                    try {
                        // Guardar datos para la exposición
                        sessionStorage.setItem('imagenSeleccionada', JSON.stringify(datosExposicion));
                        console.log("📤 Datos guardados para exposición:", datosExposicion);
                        
                        // Actualizar lista de imágenes vistas
                        let imagenesVistas = obtenerImagenesVistas();
                        if (!imagenesVistas.includes(texto)) {
                            imagenesVistas.push(texto);
                            guardarImagenesVistas(imagenesVistas);
                            console.log("📝 Imagen agregada a vistas:", texto);
                        }
                        
                        // Verificar estado actual
                        verificarTodasVistas();
                        
                        // Redirigir a exposición
                        console.log("🔄 Redirigiendo a exposición...");
                        window.location.href = this.getAttribute('href');
                        
                    } catch (error) {
                        console.error("❌ Error crítico:", error);
                    }
                });
            });
            
            // Depuración: mostrar estado completo
            console.log("=== ESTADO FINAL INICIAL ===");
            console.log("Total de imágenes en galería:", itemsGaleria.length);
            console.log("Imágenes vistas actualmente:", obtenerImagenesVistas().length);
            console.log("Flecha visible:", flechaSiguiente.classList.contains('mostrar'));
        });