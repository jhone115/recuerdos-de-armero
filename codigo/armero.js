document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const contenido = document.getElementById("contenido");
  const texto = contenido.querySelector(".texto");
  const titulo = intro.querySelector(".titulo");
  const subtitulo = intro.querySelector(".subtitulo");
  const fullscreenBtn = document.getElementById("fullscreen-btn");
  
  // Botones de navegación
  const btnAtras = document.getElementById("btn-atras");
  const btnAdelante = document.getElementById("btn-adelante");

  // Guardar estado de pantalla completa
  const guardarEstadoFullscreen = (estado) => {
    localStorage.setItem('fullscreen', estado ? 'true' : 'false');
  };

  // Función para cambiar de pantalla (intro -> contenido)
  const cambiarPantalla = () => {
    // Reiniciar estilos de intro antes de la animación
    intro.style.opacity = "1";
    intro.style.transform = "scale(1)";
    
    // Aplicar animación de salida
    intro.style.opacity = "0";
    intro.style.transform = "scale(1.05)";

    setTimeout(() => {
      intro.classList.add("oculto");
      contenido.classList.remove("oculto");
      
      // Reiniciar estilos de contenido antes de mostrarlo
      contenido.style.opacity = "0";
      contenido.style.transform = "scale(1)";
      
      // Forzar reflow para asegurar que la transición funcione
      contenido.offsetHeight;

      setTimeout(() => {
        contenido.style.opacity = "1";
        contenido.classList.add("mostrar");
        texto.classList.add("mostrar");
      }, 50);
    }, 1000);
  };

  // Función para volver a la portada (contenido -> intro)
  const volverPortada = () => {
    // Reiniciar estilos de contenido antes de la animación
    contenido.style.opacity = "1";
    contenido.style.transform = "scale(1)";
    
    // Aplicar animación de salida
    contenido.style.opacity = "0";
    contenido.style.transform = "scale(1.05)";

    setTimeout(() => {
      contenido.classList.add("oculto");
      contenido.classList.remove("mostrar");
      texto.classList.remove("mostrar");
      intro.classList.remove("oculto");
      
      // Reiniciar estilos de intro antes de mostrarlo
      intro.style.opacity = "0";
      intro.style.transform = "scale(1)";
      
      // Forzar reflow para asegurar que la transición funcione
      intro.offsetHeight;

      setTimeout(() => {
        intro.style.opacity = "1";
        intro.style.transform = "scale(1)";
      }, 50);
    }, 1000);
  };

  // Añadir evento a título y subtítulo
  titulo.addEventListener("click", cambiarPantalla);
  subtitulo.addEventListener("click", cambiarPantalla);

  // Eventos para botones de navegación
  btnAtras.addEventListener("click", volverPortada);
  
  btnAdelante.addEventListener("click", () => {
    // Guardar estado actual antes de redirigir
    guardarEstadoFullscreen(!!document.fullscreenElement);
    // Redirigir a otro HTML
    window.location.href = "codigo/lado a/a.html";
  });
  
  // Función para pantalla completa
  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error al activar pantalla completa: ${err.message}`);
      });
      guardarEstadoFullscreen(true);
    } else {
      document.exitFullscreen();
      guardarEstadoFullscreen(false);
    }
  });

  // Cambiar imagen según el estado de pantalla completa
  document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
      fullscreenBtn.src = "../recursos/imagenes/menos.png";
      guardarEstadoFullscreen(true);
    } else {
      fullscreenBtn.src = "../recursos/imagenes/mas.png";
      guardarEstadoFullscreen(false);
    }
  });

  // Verificar estado al cargar la página
  const fullscreenEstado = localStorage.getItem('fullscreen');
  if (fullscreenEstado === 'true' && !document.fullscreenElement) {
    // Intentar restaurar pantalla completa
    setTimeout(() => {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error al restaurar pantalla completa: ${err.message}`);
      });
    }, 500);
  }
});