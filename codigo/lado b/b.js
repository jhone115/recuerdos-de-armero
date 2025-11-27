// b.js - Lado B Control
document.addEventListener('DOMContentLoaded', function() {
    const itemsGaleria = document.querySelectorAll('.item-galeria');
    
    itemsGaleria.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const imagenSrc = this.getAttribute('data-imagen');
            const descripcion = this.getAttribute('data-descripcion');
            
            console.log("Datos a guardar:", { imagenSrc, descripcion });
            
            // Guardar en localStorage para que se refleje en b_exp
            const datos = {
                titulo: "", // Sin título para el lado B
                imagen: imagenSrc,
                texto: descripcion
            };
            
            try {
                localStorage.setItem('imagenSeleccionada', JSON.stringify(datos));
                console.log("Datos guardados en localStorage");
                
                // Redirigir a la página de exposición
                window.location.href = this.getAttribute('href');
            } catch (error) {
                console.error("Error al guardar en localStorage:", error);
            }
        });
    });
});