        // a.js - Lado A Control (Versión Corregida)
        document.addEventListener('DOMContentLoaded', function() {
            const itemsGaleria = document.querySelectorAll('.item-galeria');
            const flechaSiguiente = document.getElementById('flecha-siguiente');
            
            console.log("Página cargada - Estado inicial");
            console.log("Flecha siguiente:", flechaSiguiente);
            
            // INICIALMENTE ASEGURAR QUE LA FLECHA ESTÉ OCULTA
            flechaSiguiente.style.display = 'none';
            flechaSiguiente.classList.remove('mostrar');
            
            // Array temporal para rastrear imágenes vistas en esta sesión
            let imagenesVistas = [];
            
            // Función para verificar si todas las imágenes han sido vistas
            function verificarTodasVistas() {
                // Obtener todos los textos únicos de las imágenes
                const todosTextos = Array.from(itemsGaleria).map(item => item.getAttribute('data-texto'));
                
                // Verificar si todos los textos están en el array de imágenes vistas
                const todasVistas = todosTextos.every(texto => imagenesVistas.includes(texto));
                
                console.log("Verificando imágenes vistas:", {
                    imagenesVistas: imagenesVistas,
                    todasLasImagenes: todosTextos,
                    todasVistas: todasVistas
                });
                
                if (todasVistas && imagenesVistas.length === 6) {
                    flechaSiguiente.classList.add('mostrar');
                    flechaSiguiente.style.display = 'block';
                    console.log("✓ Todas las imágenes han sido vistas. Mostrando flecha de siguiente sección.");
                } else {
                    flechaSiguiente.classList.remove('mostrar');
                    flechaSiguiente.style.display = 'none';
                    console.log("✗ Faltan imágenes por ver:", 
                        todosTextos.filter(texto => !imagenesVistas.includes(texto)));
                }
            }
            
            // LIMPIAR CUALQUIER DATO PREVIO AL CARGAR LA PÁGINA
            console.log("Limpiando datos de sesión previos...");
            sessionStorage.removeItem('imagenesVistasSession');
            sessionStorage.removeItem('imagenSeleccionada');
            
            // Verificar si hay datos de sesión previos (solo para depuración)
            const sessionData = sessionStorage.getItem('imagenesVistasSession');
            if (sessionData) {
                try {
                    imagenesVistas = JSON.parse(sessionData);
                    console.log("Datos de sesión recuperados:", imagenesVistas);
                    verificarTodasVistas();
                } catch (error) {
                    console.error("Error al parsear datos de sesión:", error);
                    imagenesVistas = [];
                }
            } else {
                console.log("No hay datos de sesión previos - empezando desde cero");
                imagenesVistas = [];
            }
            
            itemsGaleria.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const imagenSrc = this.getAttribute('data-imagen');
                    const texto = this.getAttribute('data-texto');
                    const descripcion = this.getAttribute('data-descripcion');
                    
                    console.log("Clic en imagen:", texto);
                    
                    // Verificar que todos los datos necesarios existen
                    if (!imagenSrc || !texto) {
                        console.error("Datos incompletos en el elemento de galería:", this);
                        alert("Error: Datos de imagen incompletos. Verifica la configuración.");
                        return;
                    }
                    
                    // Guardar datos temporales para la exposición (solo para esta navegación)
                    const datos = {
                        titulo: texto,
                        imagen: imagenSrc,
                        texto: descripcion,
                        timestamp: Date.now()
                    };
                    
                    try {
                        // Usar sessionStorage en lugar de localStorage
                        sessionStorage.setItem('imagenSeleccionada', JSON.stringify(datos));
                        console.log("Datos guardados en sessionStorage:", datos);
                        
                        // Agregar esta imagen a las vistas si no está ya
                        if (!imagenesVistas.includes(texto)) {
                            imagenesVistas.push(texto);
                            // Guardar en sessionStorage para persistir durante la sesión
                            sessionStorage.setItem('imagenesVistasSession', JSON.stringify(imagenesVistas));
                            console.log("Imagen agregada a vistas:", texto);
                            console.log("Total de imágenes vistas:", imagenesVistas.length);
                        }
                        
                        // Verificar si ya se vieron todas las imágenes
                        verificarTodasVistas();
                        
                        // Redirigir a la página de exposición
                        window.location.href = this.getAttribute('href');
                    } catch (error) {
                        console.error("Error al guardar en sessionStorage:", error);
                        alert("Error al guardar los datos. Verifica la consola para más detalles.");
                    }
                });
            });
            
            // Verificación final al cargar
            setTimeout(() => {
                console.log("Verificación final al cargar la página");
                verificarTodasVistas();
            }, 100);
        });