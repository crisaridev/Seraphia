/**ScrollReveal es una libreria de javaScript que permite hacer animaciones */
// ScrollReveal para secciones de vista HOME
document.addEventListener('DOMContentLoaded', function () {
ScrollReveal().reveal('.mision-block', {
  duration: 1000,
  distance: '30px',
  origin: 'bottom',
  easing: 'ease-in-out'
});

ScrollReveal().reveal('.img-card', {
  duration: 1000,
  distance: '40px',
  origin: 'left',
  easing: 'ease-in-out',
  interval: 200
});

ScrollReveal().reveal('.galeria-imagen', {
  duration: 1000,
  origin: 'bottom',
  distance: '20px'
  });
});
    //Parte  JS correspondiente al Footer de Miguel
    document.addEventListener('DOMContentLoaded', function () {
  
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
          
            if (window.innerWidth >= 640) {
                return;
            }

            
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