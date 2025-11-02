
document.addEventListener('DOMContentLoaded', function() {
    const polaroidGrid = document.querySelector('.polaroid-grid');

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

    // Verificar si ya se ha visto la sexta polaroid
    const vistoPolaroid6 = localStorage.getItem('vistoPolaroid6');

    // Crear las polaroids
    polaroids.forEach(polaroid => {
        const polaroidElement = document.createElement('div');
        polaroidElement.className = 'polaroid';
        polaroidElement.style.setProperty('--rotation', polaroid.rotation);
        polaroidElement.setAttribute('data-id', polaroid.id);
        
        // Contenido especial para la sexta polaroid si ya fue vista
        if (polaroid.id === 6 && vistoPolaroid6 === 'true') {
            polaroidElement.innerHTML = `
                <div class="polaroid-image" style="background-image: url('${polaroid.image}')"></div>
                <div class="polaroid-caption">${polaroid.title}</div>
                <div class="lado-b-button-container">
                    <button class="lado-b-button" id="btn-lado-b">Ir al Lado B</button>
                </div>
            `;
        } else {
            polaroidElement.innerHTML = `
                <div class="polaroid-image" style="background-image: url('${polaroid.image}')"></div>
                <div class="polaroid-caption">${polaroid.title}</div>
            `;
        }
        
        // Añadir evento de clic para la animación y redirección
        polaroidElement.addEventListener('click', function(e) {
            // Evitar que se active al hacer clic en el botón lado B
            if (e.target.closest('.lado-b-button')) {
                return;
            }
            
            const id = this.getAttribute('data-id');
            
            // Si es la polaroid 6, marcar como vista
            if (id === '6') {
                localStorage.setItem('vistoPolaroid6', 'true');
            }
            
            // Aplicar animación de paso de hoja de libro a toda la pantalla
            document.querySelector('.pantalla-a').classList.add('page-turn');
            
            // Redirigir después de la animación
            setTimeout(() => {
                window.location.href = `b_exp.html?id=${id}`;
            }, 1000);
        });
        
        polaroidGrid.appendChild(polaroidElement);
    });

    // Añadir evento para el botón Lado B (si existe)
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'btn-lado-b') {
            // Aplicar animación de paso de hoja de libro a toda la pantalla
            document.querySelector('.pantalla-a').classList.add('page-turn');
            
            
            setTimeout(() => {
                // Detectar si estamos en GitHub Pages o local
                const isGitHubPages = window.location.hostname.includes('github.io');
                
                if (isGitHubPages) {
                    // Para GitHub Pages
                    window.location.href = '../lado%20b/b.html';
                } else {
                    // Para desarrollo local
                    window.location.href = '../lado b/b.html';
                }
            }, 1000);
        }
    });
});