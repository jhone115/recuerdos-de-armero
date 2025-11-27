        // a.js - Lado A Control (Sin persistencia)
        document.addEventListener('DOMContentLoaded', function() {
            const itemsGaleria = document.querySelectorAll('.item-galeria');
            const flechaSiguiente = document.getElementById('flecha-siguiente');
            
            // Array temporal para rastrear imágenes vistas en esta sesión
            let imagenesVistas = [];
            
            // Función para verificar si todas las imágenes han sido vistas
            function verificarTodasVistas() {
                // Obtener todos los textos únicos de las imágenes
                const todosTextos = Array.from(itemsGaleria).map(item => item.getAttribute('data-texto'));
                
                // Verificar si todos los textos están en el array de imágenes vistas
                const todasVistas = todosTextos.every(texto => imagenesVistas.includes(texto));
                
                if (todasVistas) {
                    flechaSiguiente.classList.add('mostrar');
                    console.log("Todas las imágenes han sido vistas. Mostrando flecha de siguiente sección.");
                } else {
                    console.log("Faltan imágenes por ver:", 
                        todosTextos.filter(texto => !imagenesVistas.includes(texto)));
                }
            }
            
            // Verificar si hay datos de sesión previos (solo para esta pestaña)
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
            }
            
            itemsGaleria.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const imagenSrc = this.getAttribute('data-imagen');
                    const texto = this.getAttribute('data-texto');
                    const descripcion = this.getAttribute('data-descripcion');
                    
                    console.log("Datos a guardar:", { imagenSrc, texto, descripcion });
                    
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
                        timestamp: Date.now() // Para evitar cache
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
            
            // Limpiar datos si la página se carga fresh (sin venir de otra página)
            if (performance.navigation.type === performance.navigation.TYPE_NAVIGATE) {
                console.log("Página cargada fresh - limpiando datos temporales");
                // No limpiamos sessionStorage aquí para mantener el estado durante la sesión
            }
        });