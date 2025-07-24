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



const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  const loginBtnDesktop = document.getElementById("loginBtnDesktop");
  const loginBtnMobile = document.getElementById("loginBtnMobile");

  if (isLoggedIn) {
    const userPageURL = "/html/datospersonales.html";

    if (loginBtnDesktop) {
      loginBtnDesktop.textContent = "Mi cuenta";
      loginBtnDesktop.href = userPageURL;
    }

    if (loginBtnMobile) {
      loginBtnMobile.textContent = "Mi cuenta";
      loginBtnMobile.href = userPageURL;
    }

    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Cerrar sesión";
    logoutBtn.classList.add("btn", "btn-outline-light", "ms-2", "d-none", "d-lg-inline-block");
    logoutBtn.onclick = () => {
      localStorage.removeItem("loggedIn");
      location.reload();
    };

    const navbarRight = document.querySelector(".d-flex.align-items-center.gap-2.ms-auto");
    if (navbarRight) {
      navbarRight.appendChild(logoutBtn);
    }
      }
    });