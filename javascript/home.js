/** ScrollReveal + Carrusel + Footer Toggle */
document.addEventListener('DOMContentLoaded', function () {
  // ScrollReveal para secciones de vista HOME
  ScrollReveal().reveal('.mision-block', {
    duration: 1000,
    distance: '30px',
    origin: 'bottom',
    easing: 'ease-in-out'
  });

ScrollReveal().reveal('.tarjeta-inspiracion', {
  duration: 1000,
  distance: '40px',
  origin: 'bottom',
  easing: 'ease-in-out',
  reset: false, // solo una vez
  viewFactor: 0.2 // empieza cuando 20% es visible
});

  ScrollReveal().reveal('.galeria-imagen', {
    duration: 1000,
    origin: 'bottom',
    distance: '20px'
  });

  // Carrusel: detener en hover y reanudar al salir
const bootstrapCarouselInstance = bootstrap.Carousel.getInstance(heroCarousel) || new bootstrap.Carousel(heroCarousel);

heroCarousel.addEventListener('mouseenter', () => {
  bootstrapCarouselInstance.pause();
});

heroCarousel.addEventListener('mouseleave', () => {
  bootstrapCarouselInstance.cycle();
});

  // Footer Toggle para móviles
  const toggles = document.querySelectorAll('.footer-toggle');
  toggles.forEach(toggle => {
    const menu = toggle.nextElementSibling;
    if (window.innerWidth < 640) {
      menu.style.height = '0px';
    } else {
      menu.style.height = 'auto';
      toggle.classList.add('active');
    }

    toggle.addEventListener('click', () => {
      if (window.innerWidth >= 640) return;

      if (menu.style.height === '0px') {
        menu.style.height = menu.scrollHeight + 'px';
        toggle.classList.add('active');
      } else {
        menu.style.height = '0px';
        toggle.classList.remove('active');
      }
    });
  });

  window.addEventListener('resize', () => {
    toggles.forEach(toggle => {
      const menu = toggle.nextElementSibling;
      if (window.innerWidth >= 640) {
        menu.style.height = 'auto';
        toggle.classList.add('active');
      } else {
        if (!toggle.classList.contains('active')) {
          menu.style.height = '0px';
        }
      }
    });
  });
});