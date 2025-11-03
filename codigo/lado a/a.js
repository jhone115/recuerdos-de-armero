document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DEBUG a.html INICIADO ===');
    
    const polaroidGrid = document.querySelector('.polaroid-grid');
    console.log('Polaroid grid encontrado:', !!polaroidGrid);

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

    // Sistema para rastrear TODAS las polaroids vistas
    const getVistoPolaroids = () => {
        const visto = localStorage.getItem('vistoPolaroids');
        console.log('📋 Polaroids en localStorage:', visto);
        return visto ? JSON.parse(visto) : [];
    };

    const todasVistas = () => {
        const visto = getVistoPolaroids();
        const todas = polaroids.every(polaroid => visto.includes(polaroid.id));
        console.log('🎯 ¿Todas las polaroids vistas?', todas);
        console.log('📊 Polaroids vistas actualmente:', visto);
        console.log('📊 Total de polaroids requeridas:', polaroids.length);
        return todas;
    };

    // Crear las polaroids
    polaroids.forEach(polaroid => {
        const polaroidElement = document.createElement('div');
        polaroidElement.className = 'polaroid';
        polaroidElement.style.setProperty('--rotation', polaroid.rotation);
        polaroidElement.setAttribute('data-id', polaroid.id);
        
        // Verificar si mostrar flecha
        const mostrarFlecha = (polaroid.id === 6 && todasVistas());
        console.log(`🔍 Polaroid ${polaroid.id} - Mostrar flecha:`, mostrarFlecha);
        
        if (mostrarFlecha) {
            console.log('🎯 CREANDO POLAROID 6 CON FLECHA');
            polaroidElement.innerHTML = `
                <div class="polaroid-image" style="background-image: url('${polaroid.image}')">
                    <div class="continue-arrow">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </div>
                </div>
                <div class="polaroid-caption">${polaroid.title}</div>
            `;
            polaroidElement.classList.add('polaroid-with-arrow');
        } else {
            polaroidElement.innerHTML = `
                <div class="polaroid-image" style="background-image: url('${polaroid.image}')"></div>
                <div class="polaroid-caption">${polaroid.title}</div>
            `;
        }
        
        // Añadir evento de clic
        polaroidElement.addEventListener('click', function(e) {
            const id = this.getAttribute('data-id');
            console.log('🖱️ CLIC en polaroid:', id);
            console.log('🔍 Tiene clase polaroid-with-arrow:', this.classList.contains('polaroid-with-arrow'));
            
            // Guardar estado de pantalla completa
            localStorage.setItem('fullscreen', document.fullscreenElement ? 'true' : 'false');
            
            // Si es la polaroid 6 CON FLECHA, ir al Lado B
            if (id === '6' && this.classList.contains('polaroid-with-arrow')) {
                console.log('🚀 REDIRIGIENDO AL LADO B');
                document.querySelector('.pantalla-a').classList.add('page-turn');
                setTimeout(() => {
                    const isGitHubPages = window.location.hostname.includes('github.io');
                    if (isGitHubPages) {
                        window.location.href = '../lado%20b/b.html';
                    } else {
                        window.location.href = '../lado b/b.html';
                    }
                }, 1000);
            } 
            // Para TODAS las otras polaroids (incluida la 6ta SIN flecha), ir a a_exp.html
            else {
                console.log('📄 REDIRIGIENDO A a_exp.html con id:', id);
                document.querySelector('.pantalla-a').classList.add('page-turn');
                setTimeout(() => {
                    window.location.href = `a_exp.html?id=${id}`;
                }, 1000);
            }
        });
        
        polaroidGrid.appendChild(polaroidElement);
    });

    console.log('=== DEBUG a.html FINALIZADO ===');
});