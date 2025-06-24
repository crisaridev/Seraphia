document.addEventListener("DOMContentLoaded", function() {

  const mediaQuery = window.matchMedia('(max-width: 991.98px)');
  let observer; 
  function setupObserver() {
    const elementosAnimados = document.querySelectorAll('.animada');

    if (elementosAnimados.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        
        if (entry.isIntersecting) {
          
          entry.target.classList.add('es-visible');
        } else {
          entry.target.classList.remove('es-visible');
        }
      });
    }, observerOptions);

    elementosAnimados.forEach(elemento => {
      observer.observe(elemento);
    });
  }

  function teardownObserver() {
    if (observer) {
      observer.disconnect();
    }
  }

 
  function handleDeviceChange(e) {
    if (e.matches) {
     
      setupObserver();
    } else {
     
      teardownObserver();
      document.querySelectorAll('.animada').forEach(el => el.classList.remove('es-visible'));
    }
  }

  handleDeviceChange(mediaQuery);

  
  mediaQuery.addEventListener('change', handleDeviceChange);

});