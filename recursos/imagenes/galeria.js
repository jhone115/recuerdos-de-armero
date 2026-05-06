        const imagenes = {
            antiguo: [
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.15.04_d19f2e06.jpg", nombre: "Armero Antiguo 1" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.15.05_0ff53dc5.jpg", nombre: "Armero Antiguo 2" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.15.05_a57c3283.jpg", nombre: "Armero Antiguo 3" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.15.05_b69ebf4a.jpg", nombre: "Armero Antiguo 4" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.15.45_272b41c1.jpg", nombre: "Armero Antiguo 5" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.15.45_dda914bd.jpg", nombre: "Hospital San Lorenzo" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.15.46_ec8e91e1.jpg", nombre: "Armero Antiguo 7" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.15.46_f57227c0.jpg", nombre: "Armero Antiguo 8" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.16.19_3e14b68d.jpg", nombre: "Almacenes Yep" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.16.50_506bcccd.jpg", nombre: "Iglesia del Carmen" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.17.21_92cf4e4d.jpg", nombre: "Armero Antiguo 11" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.17.22_61721af0.jpg", nombre: "Armero Antiguo 12" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.17.51_3a27fd43.jpg", nombre: "Caja Agraria" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.18.24_5999160f.jpg", nombre: "Armero Antiguo 14" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.18.24_b2b69ac9.jpg", nombre: "Armero Antiguo 15" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.19.02_c7a58df8.jpg", nombre: "Armero Antiguo 16" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.19.39_471001c1.jpg", nombre: "Armero Antiguo 17" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.20.11_e9c0b00e.jpg", nombre: "Armero Antiguo 18" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.20.51_c9ed9e92.jpg", nombre: "Armero Antiguo 19" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.21.16_989302a0.jpg", nombre: "Armero Antiguo 20" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.21.59_4acd384c.jpg", nombre: "Armero Antiguo 21" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.21.59_58b529e0.jpg", nombre: "Armero Antiguo 22" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.22.22_45ff1e78.jpg", nombre: "Banco Cafetero" },
                { src: "../../recursos/imagenes/galeria armero antiguo/Imagen de WhatsApp 2025-10-24 a las 20.22.50_4f551465.jpg", nombre: "Armero Antiguo 24" }
            ],
            destruido: [
                { src: "../../recursos/imagenes/imagenes armero destruido/DSC_0001.jpg", nombre: "Armero Destruido 1" },
                { src: "../../recursos/imagenes/imagenes armero destruido/DSC_0008.jpg", nombre: "Armero Destruido 2" },
                { src: "../../recursos/imagenes/imagenes armero destruido/DSC_0011.jpg", nombre: "Armero Destruido 3" },
                { src: "../../recursos/imagenes/imagenes armero destruido/P1090856.jpg", nombre: "Armero Destruido 4" },
                { src: "../../recursos/imagenes/imagenes armero destruido/P1090887.jpg", nombre: "Armero Destruido 5" },
                { src: "../../recursos/imagenes/imagenes armero destruido/pagina 6 fotografia 2.png", nombre: "Armero Destruido 6" }
            ],
            nuevo: [
                { src: "../../recursos/imagenes/imagenes armero nuevo/instalaciones-del-cva.jpg", nombre: "Instalaciones CVA" }
            ]
        };

        document.addEventListener('DOMContentLoaded', function() {
            const galeriaAntiguo = document.getElementById('galeria-antiguo');
            const galeriaDestruido = document.getElementById('galeria-destruido');
            const galeriaNuevo = document.getElementById('galeria-nuevo');
            
            const modal = document.getElementById('modal-fullscreen');
            const imagenModal = document.getElementById('imagen-modal');
            const cerrarModal = document.getElementById('cerrar-modal');
            const btnAnterior = document.getElementById('btn-anterior');
            const btnSiguiente = document.getElementById('btn-siguiente');
            const contadorModal = document.getElementById('contador-modal');
            
            let todasLasImagenes = [];
            let indiceActual = 0;
            
            console.log("🖼️ Inicializando galería completa con", 
                imagenes.antiguo.length + imagenes.destruido.length + imagenes.nuevo.length, 
                "imágenes");
            
            function crearPolaroid(imagen, categoria, indexGlobal) {
                const polaroid = document.createElement('div');
                polaroid.className = 'polaroid-completa';
                polaroid.setAttribute('data-indice', indexGlobal);
                
                const img = document.createElement('img');
                img.src = imagen.src;
                img.alt = imagen.nombre;
                
                const nombre = document.createElement('p');
                nombre.textContent = imagen.nombre;
                
                polaroid.appendChild(img);
                polaroid.appendChild(nombre);
                
                todasLasImagenes.push({
                    src: imagen.src,
                    nombre: imagen.nombre
                });
                
                return polaroid;
            }
            
            function cargarGalerias() {
                let indiceGlobal = 0;
                
                imagenes.antiguo.forEach(imagen => {
                    const polaroid = crearPolaroid(imagen, 'antiguo', indiceGlobal);
                    galeriaAntiguo.appendChild(polaroid);
                    indiceGlobal++;
                });
                
                imagenes.destruido.forEach(imagen => {
                    const polaroid = crearPolaroid(imagen, 'destruido', indiceGlobal);
                    galeriaDestruido.appendChild(polaroid);
                    indiceGlobal++;
                });
                
                // Cargar Armero Nuevo
                imagenes.nuevo.forEach(imagen => {
                    const polaroid = crearPolaroid(imagen, 'nuevo', indiceGlobal);
                    galeriaNuevo.appendChild(polaroid);
                    indiceGlobal++;
                });
                
                console.log("✅ Galerías cargadas. Total de imágenes:", todasLasImagenes.length);
            }
            
            // Función para abrir el modal con una imagen específica
            function abrirModal(indice) {
                if (indice < 0 || indice >= todasLasImagenes.length) return;
                
                indiceActual = indice;
                imagenModal.src = todasLasImagenes[indice].src;
                actualizarContador();
                modal.classList.add('mostrar');
                
                console.log("🔍 Abriendo imagen:", todasLasImagenes[indice].src, "Índice:", indice);
                
                // Prevenir scroll del body cuando el modal está abierto
                document.body.style.overflow = 'hidden';
            }
            
            // Función para cerrar el modal
            function cerrarModalFunc() {
                modal.classList.remove('mostrar');
                document.body.style.overflow = 'auto';
                console.log("❌ Modal cerrado");
            }
            
            // Función para actualizar el contador
            function actualizarContador() {
                contadorModal.textContent = `${indiceActual + 1} / ${todasLasImagenes.length}`;
            }
            
            // Función para navegar a la imagen anterior
            function imagenAnterior() {
                let nuevoIndice = indiceActual - 1;
                if (nuevoIndice < 0) nuevoIndice = todasLasImagenes.length - 1; // Circular
                abrirModal(nuevoIndice);
            }
            
            // Función para navegar a la imagen siguiente
            function imagenSiguiente() {
                let nuevoIndice = indiceActual + 1;
                if (nuevoIndice >= todasLasImagenes.length) nuevoIndice = 0; // Circular
                abrirModal(nuevoIndice);
            }
            
            // Event listeners para controles del modal
            cerrarModal.addEventListener('click', cerrarModalFunc);
            btnAnterior.addEventListener('click', imagenAnterior);
            btnSiguiente.addEventListener('click', imagenSiguiente);
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    cerrarModalFunc();
                }
            });
            
            document.addEventListener('keydown', (e) => {
                if (!modal.classList.contains('mostrar')) return;
                
                switch(e.key) {
                    case 'Escape':
                        cerrarModalFunc();
                        break;
                    case 'ArrowLeft':
                        imagenAnterior();
                        break;
                    case 'ArrowRight':
                        imagenSiguiente();
                        break;
                }
            });
            
            document.addEventListener('click', (e) => {
                const polaroid = e.target.closest('.polaroid-completa');
                if (polaroid) {
                    const indice = parseInt(polaroid.getAttribute('data-indice'));
                    abrirModal(indice);
                }
            });
            
            function precargarImagenes() {
                console.log("🔄 Precargando imágenes...");
                todasLasImagenes.forEach(imagen => {
                    const img = new Image();
                    img.src = imagen.src;
                });
            }
            
            cargarGalerias();
            
            setTimeout(precargarImagenes, 1000);
            
            console.log("✅ Galería completa inicializada y lista");
        });

        // Auto-pantalla completa en móvil al cargar
window.addEventListener('load', function() {
    if (isMobileDevice()) {
        setTimeout(() => {
            activateFullscreen();
        }, 1000);
    }
});

function forceLandscape() {
    if (isMobileDevice() && window.innerHeight > window.innerWidth) {
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape').catch(function(error) {
                console.log('Orientación no se puede bloquear: ', error);
            });
        }
    }
}

document.addEventListener('fullscreenchange', function() {
    if (isFullscreen()) {
        forceLandscape();
    }
});