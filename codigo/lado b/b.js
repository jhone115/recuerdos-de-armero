document.addEventListener('DOMContentLoaded', function() {
    console.log('=== INICIANDO DEBUGGING B.JS ===');
    
    const polaroidGrid = document.querySelector('.polaroid-grid');
    console.log('1. polaroidGrid:', polaroidGrid);
    console.log('2. Ubicación actual:', window.location.href);

    const polaroids = [
        { 
            id: 1, 
            title: "", 
            image: "../../recursos/imagenes/IMG-20251005-WA0010.jpg",
            description: "",
            rotation: "-3deg"
        },
        { 
            id: 2, 
            title: "", 
            image: "../../recursos/imagenes/IMG-20251005-WA0012.jpg",
            description: "",
            rotation: "2deg"
        },
        { 
            id: 3, 
            title: "", 
            image: "../../recursos/imagenes/IMG-20251005-WA0014.jpg",
            description: "",
            rotation: "-1deg"
        },
        { 
            id: 4, 
            title: "", 
            image: "../../recursos/imagenes/IMG-20251005-WA0013.jpg",
            description: "",
            rotation: "3deg"
        },
        { 
            id: 5, 
            title: "", 
            image: "../../recursos/imagenes/IMG-20251005-WA0004.jpg",
            description: "",
            rotation: "-2deg"
        },
        { 
            id: 6, 
            title: "", 
            image: "../../recursos/imagenes/IMG-20251005-WA0008.jpg",
            description: "",
            rotation: "1deg"
        }
    ];

    console.log('3. Polaroids definidas:', polaroids.length);

    // TEST: Verificar si las imágenes existen
    console.log('4. === TEST DE IMÁGENES ===');
    polaroids.forEach(polaroid => {
        const testImg = new Image();
        testImg.onload = function() {
            console.log(`✅ Imagen ${polaroid.id} CARGA: ${polaroid.image}`);
        };
        testImg.onerror = function() {
            console.log(`❌ Imagen ${polaroid.id} NO CARGA: ${polaroid.image}`);
            console.log(`   Ruta completa sería: ${window.location.origin}/${polaroid.image}`);
        };
        testImg.src = polaroid.image;
    });

    // Crear las polaroids
    console.log('5. === CREANDO POLAROIDS ===');
    polaroids.forEach(polaroid => {
        const polaroidElement = document.createElement('div');
        polaroidElement.className = 'polaroid';
        polaroidElement.style.transform = `rotate(${polaroid.rotation})`;
        polaroidElement.setAttribute('data-id', polaroid.id);
        
        polaroidElement.innerHTML = `
            <div class="polaroid-image" style="background-image: url('${polaroid.image}')"></div>
            <div class="polaroid-caption">${polaroid.title}</div>
        `;
        
        console.log(`   Polaroid ${polaroid.id} creada con imagen: ${polaroid.image}`);
        
        // Evento clic simple para testing
        polaroidElement.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            console.log(`📍 CLICK en polaroid ${id}`);
            alert(`Click en polaroid ${id} - Revisa la consola para más detalles`);
        });
        
        polaroidGrid.appendChild(polaroidElement);
    });

    console.log('6. === VERIFICACIÓN FINAL ===');
    console.log('   Polaroids en grid:', polaroidGrid.children.length);
    console.log('   Estilos aplicados:', document.querySelector('.polaroid')?.className);
});

// Sistema de audio
function initAudio() {
    const audio = document.getElementById('backgroundio');
    if (!audio) {
        console.log('❌ Audio no encontrado');
        return;
    }
    
    console.log('✅ Audio encontrado');
    audio.volume = 0.3;
    
    document.addEventListener('click', function() {
        if (audio.paused) {
            audio.play().catch(error => {
                console.log('Audio requiere interacción del usuario');
            });
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAudio);
} else {
    initAudio();
}