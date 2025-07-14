// ! DOM 
// Esperar a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
  actualizarTotal(); // Calcula y muestra el total inicial de los productos

  // Buscar todos los botones "Eliminar" y asignarles un evento click
  document.querySelectorAll(".btn-eliminar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".card"); // Busca el contenedor del producto (card)
      card.remove(); // Elimina el producto del DOM
      actualizarTotal(); // Vuelve a calcular el total tras la eliminación
    });
  });

  // Buscar todos los botones "Modificar" y asignarles un evento click
  document.querySelectorAll(".btn-modificar").forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("Funcionalidad de modificar aun por hacerse"); // Mensaje placeholder
    });
  });

  // Obtener el botón de "Aplicar descuento"
  const aplicarBtn = document.querySelector(".btn-aplicar-descuento");
  if (aplicarBtn) {
    aplicarBtn.addEventListener("click", () => {
      const codigo = document.getElementById("form1").value.trim().toUpperCase(); // Obtener y normalizar el código ingresado
      if (codigo === "SERAPHIA10") {
        aplicarDescuento(10); // Aplica 10% de descuento si el código es válido
      } else {
        alert("Código inválido."); // Muestra alerta si el código no coincide
      }
    });
  }
});

//! TOTAL DEL CARRITO
// Funcion que hace la suma en automatico de los productos
function actualizarTotal() {
  let total = 0; // Inicia el total en 0

  // Recorre todos los productos (cards)
  document.querySelectorAll(".card").forEach((card) => {
    const precioElement = card.querySelector(".precio-producto"); // Busca el elemento con el precio

    if (precioElement) {
      const precio = parseFloat(precioElement.textContent.replace("$", "")); // Convierte el texto a número

      if (!isNaN(precio)) {
        total += precio; // Suma al total si es un número válido
      }
    }
  });

  // Actualiza el total en el HTML
  const totalElement = document.querySelector(".precio-total");
  if (totalElement) {
    totalElement.textContent = `$${total.toFixed(2)}`; // Muestra el total con 2 decimales
    totalElement.dataset.total = total.toFixed(2); // Guarda el total sin descuento como atributo (para cálculos posteriores)
  }
}

// ! Funcion para cupones

function aplicarDescuento(porcentaje) {
  const totalElement = document.querySelector(".precio-total");
  if (totalElement) {
    const totalOriginal = parseFloat(totalElement.dataset.total || "0"); // Obtiene el total guardado antes del descuento

    const descuento = totalOriginal * (porcentaje / 100); // Calcula el valor del descuento
    const totalConDescuento = totalOriginal - descuento; // Resta el descuento al total original

    totalElement.textContent = `$${totalConDescuento.toFixed(2)}`; // Actualiza el texto con el nuevo total
  }
}
