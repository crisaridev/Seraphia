console.log("Dashboard Admin Page Loaded");
const expandIcon = document.getElementById("icon")
const expandButton = document.querySelector(".toggle-btn");
const expandedSidebar = document.getElementById("sidebar_expand_btn");
const screenSize = window.matchMedia("(min-width: 768px)");

const checkScreenSize = () => {
  if (window.matchMedia('(min-width: 792px)').matches) {
  document.querySelector("#sidebar").classList.toggle("expanded");
  expandIcon.classList.toggle("bx-caret-right");
  expandIcon.classList.toggle("bx-caret-left")
  console.log("Hola mundo se desplego el desktop")
} else {
  document.querySelector("#sidebar").classList.toggle("expanded_mobile");
  document.querySelector("#toggle-btn").classList.toggle("expanded_btn");
  expandIcon.classList.toggle("bx-caret-right");
  expandIcon.classList.toggle("bx-caret-left");
  console.log("Hola mundo se desplego el mobile y el boton mediante el contenedor")
  };
};

checkScreenSize(screenSize);
expandedSidebar.removeEventListener("click", checkScreenSize);
expandedSidebar.addEventListener("click", checkScreenSize);



expandButton.addEventListener("click",() => {
  document.querySelector("#sidebar").classList.toggle("expanded_mobile");
  console.log("Hola mundo, sidebar de movil expandido con boton")
});

expandButton.addEventListener("click",() => {
  document.querySelector("#toggle-btn").classList.toggle("expanded_btn");
  console.log("Hola mundo, el boton se movera")
});

expandButton.addEventListener("click",() => {
  expandIcon.classList.toggle("bx-caret-right");
  expandIcon.classList.toggle("bx-caret-left")
  console.log("Hola mundo cambio de icono")
});

// Full block url

document.getElementById('dashboard-sidebar').addEventListener( 'click', () => {
  window.location.href = '/html/dashboard_admin_page.html'
  console.log('boton presionado')
});
document.getElementById('products-sidebar').addEventListener( 'click', () => {
  window.location.href = '/html/products_admin_page.html'
  console.log('boton presionado')
});
document.getElementById('orders-sidebar').addEventListener( 'click', () => {
  window.location.href = '/html/orders_admin_page.html'
  console.log('boton presionado')
});
document.getElementById('users-sidebar').addEventListener( 'click', () => {
  window.location.href = '/html/users_admin_page.html'
  console.log('boton presionado')
})

