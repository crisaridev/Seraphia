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
