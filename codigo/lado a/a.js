// a.js - Lado A Control
document.addEventListener('DOMContentLoaded', function() {
    const itemsGaleria = document.querySelectorAll('.item-galeria');
    const flechaSiguiente = document.getElementById('flecha-siguiente');
    
    // Inicializar el array de imágenes vistas si no existe
    let imagenesVistas = JSON.parse(localStorage.getItem('imagenesVistas')) || [];
    
    // Función para verificar si todas las imágenes han sido vistas
    function verificarTodasVistas() {
        // Obtener todos los textos únicos de las imágenes
        const todosTextos = Array.from(itemsGaleria).map(item => item.getAttribute('data-texto'));
        
        // Verificar si todos los textos están en el array de imágenes vistas
        const todasVistas = todosTextos.every(texto => imagenesVistas.includes(texto));
        
        if (todasVistas) {
            flechaSiguiente.classList.add('mostrar');
        }
    }
    
    // Verificar al cargar la página si ya se vieron todas las imágenes
    verificarTodasVistas();
    
    itemsGaleria.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const imagenSrc = this.getAttribute('data-imagen');
            const texto = this.getAttribute('data-texto');
            const descripcion = this.getAttribute('data-descripcion');
            
            console.log("Datos a guardar:", { imagenSrc, texto, descripcion });
            
            // Guardar en localStorage para que se refleje en a_exp
            const datos = {
                titulo: texto,
                imagen: imagenSrc,
                texto: descripcion
            };
            
            try {
                localStorage.setItem('imagenSeleccionada', JSON.stringify(datos));
                console.log("Datos guardados en localStorage");
                
                // Agregar esta imagen a las vistas si no está ya
                if (!imagenesVistas.includes(texto)) {
                    imagenesVistas.push(texto);
                    localStorage.setItem('imagenesVistas', JSON.stringify(imagenesVistas));
                    console.log("Imagen agregada a vistas:", texto);
                }
                
                // Verificar si ya se vieron todas las imágenes
                verificarTodasVistas();
                
                // Redirigir a la página de exposición
                window.location.href = this.getAttribute('href');
            } catch (error) {
                console.error("Error al guardar en localStorage:", error);
            }
        });
    });
});