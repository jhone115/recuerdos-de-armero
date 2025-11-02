const urlParams = new URLSearchParams(window.location.search);
const imageId = urlParams.get('id');

// Detectar si estamos en GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

const imageData = {
    1: {
        image: "../../recursos/imagenes/IMG-20251005-WA0010.jpg",
        description: "“Estábamos en la carrera 17 con calle octava y dos cuadras abajo ya era un charco de la acequia, que es un canal de riego que llevaba el agua a las haciendas, a la zona donde se formó la avalancha. Esa acequia era grande y llevaba un agua helada que bajaba directamente del volcán, de sus nieves, al Lagunilla. Entonces pues en este calor tan bravo que hace acá y uno poderse meter en aguas tan heladas… Eso fue toda una experiencia muy sabrosa”"
    },
    2: {
        image: "../../recursos/imagenes/IMG-20251005-WA0012.jpg",
        description: "“Me regresé y me quedé acompañando a mi familia: mi tía y mi mamá, que fueron quienes se salvaron porque no estaban en Armero. Es algo muy interesante que ellas, cuatro meses antes de la avalancha presintieron todo: estaban seguras de que iba a pasar ese evento y de que iba a ser de esa magnitud por diferentes motivos que supieron leer y se fueron a vivir con un tío en Guaduas”"
    },
    3: {
        image: "../../recursos/imagenes/IMG-20251005-WA0014.jpg",
        description: "“Se diseñó el proyecto Armero Parque de la Vida y un memorial en el centro del parque. Uno de los temas de este proyecto era destapar el parque principal, la iglesia, algunas calles y el trazado urbano en lo que más se pudiera para volver a tener esa dimensión física y urbana del pueblo y saber cómo era de grande. Que la gente lo pudiera recorrer. Es importante saber cómo era de grande Armero para que uno pueda dimensionar la ciudad y la catástrofe del lahar y cómo fue de grande esa avalancha haber destruido una ciudad de esas dimensiones”"
    },
    4: {
        image: "../../recursos/imagenes/IMG-20251005-WA0013.jpg",
        description: "“Ahí están los edificios, las casas, las calles y el paisaje en unas perspectivas que permiten hacer ese ejercicio para los de Armero. Tienen una función de apropiación porque están colocados a una altura que le permite a la gente tocarlos. Para los sobrevivientes es muy interesante y muy bonito tocarlos y decir 'Aquí era mi casa', 'Aquí en el teatro…'. Pienso que la única manera de poder volver a tangibilizar, a tener en físico eso que ya no hay, porque hoy son árboles y ese vacío solo está en la memoria”"
    },
    5: {
        image: "../../recursos/imagenes/IMG-20251005-WA0004.jpg",
        description: "“Luego hicimos otros trabajos que han sido en Guayabal, en un mural que hay en la casa cultural de Guayabal donde se trabaja el tema de patrimonio y memoria haciendo un recorrido por toda la historia de la región hasta la actualidad”."
    },
    6: {
        image: "../../recursos/imagenes/IMG-20251005-WA0008.jpg",
        description: "“Hoy en día hay unos muros, pero estos muros están en un grave riesgo porque la misma naturaleza va retomando. Así que hay árboles que han crecido y como no los hemos sabido controlar a tiempo, ya son árboles inmensos que han crecido dentro de las habitaciones y los espacios de las casas y pues estas empiezan a caerse. A veces incluso se caen los mismos árboles, que no pueden arraigarse porque encuentran los pisos y se expanden pero no se arraigan en profundidad y cualquier viento viene, los tumba y tumba los muros”, advierte."
    }
};

// Función para manejar las polaroids vistas
const getVistoPolaroids = () => {
    const visto = localStorage.getItem('vistoPolaroids');
    console.log(' En a_exp - Polaroids vistas:', visto);
    return visto ? JSON.parse(visto) : [];
};

const setVistoPolaroid = (id) => {
    const visto = getVistoPolaroids();
    if (!visto.includes(id)) {
        visto.push(id);
        localStorage.setItem('vistoPolaroids', JSON.stringify(visto));
        console.log(' En a_exp - Polaroid marcada como vista:', id);
    }
};

// Función para guardar estado de pantalla completa
const guardarEstadoFullscreen = (estado) => {
    localStorage.setItem('fullscreen', estado ? 'true' : 'false');
};

// Cargar los datos correspondientes al ID
document.addEventListener('DOMContentLoaded', function() {
    console.log(' a_exp.html cargado - ID:', imageId);
    
    // Verificar y restaurar pantalla completa
    const fullscreenEstado = localStorage.getItem('fullscreen');
    console.log(' En a_exp - Estado fullscreen:', fullscreenEstado);
    
    if (fullscreenEstado === 'true' && !document.fullscreenElement) {
        console.log(' En a_exp - Intentando restaurar pantalla completa...');
        // En GitHub Pages no podemos activar automáticamente, necesita interacción del usuario
    }

    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const data = imageData[imageId] || imageData[1];
    
    console.log('🔍 En a_exp - Datos cargados para ID:', imageId, data);
    
    // Establecer la imagen de fondo para cubrir toda la pantalla
    const body = document.getElementById('main-body');
    if (body && data.image) {
        body.style.backgroundImage = `url('${data.image}')`;
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundAttachment = "fixed";
        console.log(' En a_exp - Imagen de fondo establecida:', data.image);
    }
    
    // Establecer la descripción
    const descElement = document.getElementById('detail-description');
    if (descElement) {
        descElement.textContent = data.description;
        console.log(' En a_exp - Descripción establecida');
    }

    if (imageId) {
        setVistoPolaroid(parseInt(imageId));
        console.log(' En a_exp - Polaroid marcada como vista:', imageId);
        
        // Verificar estado actual de todas las polaroids
        const vistoActual = getVistoPolaroids();
        console.log(' En a_exp - Estado actual de polaroids vistas:', vistoActual);
        console.log(' En a_exp - Todas las polaroids vistas?', vistoActual.length === 6);
    }
    
    // Guardar estado de pantalla completa
    guardarEstadoFullscreen(!!document.fullscreenElement);

    // Configurar botón de pantalla completa si existe
    if (fullscreenBtn) {
        console.log(' En a_exp - Configurando botón de pantalla completa');
        
        fullscreenBtn.addEventListener("click", () => {
            if (!document.fullscreenElement) {
                console.log(' En a_exp - Activando pantalla completa');
                document.documentElement.requestFullscreen().catch(err => {
                    console.error(' En a_exp - Error activando pantalla completa:', err);
                });
                guardarEstadoFullscreen(true);
            } else {
                console.log(' En a_exp - Saliendo de pantalla completa');
                document.exitFullscreen();
                guardarEstadoFullscreen(false);
            }
        });

        // Cambiar imagen según el estado de pantalla completa
        document.addEventListener("fullscreenchange", () => {
            const isFullscreen = !!document.fullscreenElement;
            console.log(' En a_exp - Cambio de pantalla completa:', isFullscreen);
            guardarEstadoFullscreen(isFullscreen);
            
            if (isFullscreen) {
                fullscreenBtn.src = "../../recursos/imagenes/menos.png";
            } else {
                fullscreenBtn.src = "../../recursos/imagenes/mas.png";
            }
        });

        // Establecer imagen inicial del botón
        if (document.fullscreenElement) {
            fullscreenBtn.src = "../../recursos/imagenes/menos.png";
        } else {
            fullscreenBtn.src = "../../recursos/imagenes/mas.png";
        }
    }
});

// Botón de atrás con animación reversa
document.addEventListener('DOMContentLoaded', function() {
    const btnAtras = document.getElementById('btn-atras');
    if (btnAtras) {
        console.log(' En a_exp - Configurando botón atrás');
        
        btnAtras.addEventListener('click', function() {
            console.log(' En a_exp - Clic en botón atrás');
            
            // Guardar estado actual antes de redirigir
            guardarEstadoFullscreen(!!document.fullscreenElement);
            console.log(' En a_exp - Guardando estado fullscreen para volver');
            
            // Aplicar animación reversa
            const mainBody = document.getElementById('main-body');
            if (mainBody) {
                mainBody.classList.add('page-turn-reverse');
            }
            
            // Redirigir después de la animación
            setTimeout(() => {
                console.log(' En a_exp - Redirigiendo a a.html');
                window.location.href = 'a.html';
            }, 1200);
        });
    } else {
        console.log(' En a_exp - Botón atrás no encontrado');
    }
});

// También mantener el código antiguo por compatibilidad
document.addEventListener('DOMContentLoaded', function() {
    // Código antiguo para marcar polaroid 6 como vista (compatibilidad)
    if (imageId === '6') {
        localStorage.setItem('vistoPolaroid6', 'true');
        console.log(' En a_exp - Marcado vistoPolaroid6 (compatibilidad)');
    }
});