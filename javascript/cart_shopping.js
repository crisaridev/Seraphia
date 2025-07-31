document.addEventListener("DOMContentLoaded", () => {
  const userId = 1; // Cambia esto por el ID real del usuario
  const cartContainer = document.getElementById("cart-items-container");
  const totalElement = document.querySelector(".precio-total");

  // 1️⃣ Cargar carrito desde backend
  fetch(`http://localhost:8080/api/cart-items/user/${userId}`)
    .then(res => {
      if (!res.ok) {
        return res.text().then(text => {
          throw new Error(`Error ${res.status}: ${text}`);
        });
      }
      return res.json();
    })
    .then(items => {
      cartContainer.innerHTML = "";
      let total = 0;

      items.forEach(item => {
        const precioItem = item.product.price * item.quantity;
        total += precioItem;

        const card = document.createElement("div");
        card.className = "card rounded-3 mb-4";
        card.innerHTML = `
          <div class="card-body p-4">
            <div class="row d-flex justify-content-between align-items-center">
              <div class="col-md-3">
                <img src="${item.product.imageUrl || ''}" class="img-fluid rounded-3 cart-product-image" alt="${item.product.productName}">
              </div>
              <div class="col-md-5">
                <div class="d-flex align-items-baseline justify-content-between">
                  <p class="lead fw-normal mb-2">${item.product.productName}</p>
                  <h5 class="mb-0 precio-producto">$${precioItem.toFixed(2)}</h5>
                </div>
                <p><span class="text-muted">Talla:</span> ${item.size?.sizeName || 'N/A'}</p>
                <p><span class="text-muted">Color:</span> ${item.color?.colorName || 'N/A'}</p>
              </div>
              <div class="col-md-3 d-flex justify-content-end align-items-center">
                <button class="btn btn-danger btn-sm btn-eliminar" data-item-id="${item.id}">Eliminar</button>
                <button class="btn btn-secondary btn-sm ms-2 btn-modificar">Modificar</button>
              </div>
            </div>
          </div>
        `;
        cartContainer.appendChild(card);
      });

      totalElement.textContent = `$${total.toFixed(2)}`;
      totalElement.dataset.total = total.toFixed(2);

      addEventListeners();
    })
    .catch(err => console.error("❌ Error cargando carrito:", err.message));

  // 2️⃣ Botón confirmar
  const btnConfirmar = document.getElementById("btnConfirmar");
  if (btnConfirmar) {
    btnConfirmar.addEventListener("click", () => {
      btnConfirmar.classList.add("boton-pulse");
      setTimeout(() => window.location.href = '/html/Registro_de_Pago.html', 600);
    });
  }
});

// ✅ FUNCIONES

function addEventListeners() {
  document.querySelectorAll(".btn-eliminar").forEach(btn =>
    btn.addEventListener("click", () => eliminarItem(btn))
  );
  document.querySelectorAll(".btn-modificar").forEach(btn =>
    btn.addEventListener("click", () =>
      alert("Funcionalidad de modificar aún por hacerse")
    )
  );
  const aplicarBtn = document.querySelector(".btn-aplicar-descuento");
  if (aplicarBtn) {
    aplicarBtn.addEventListener("click", () => {
      const codigo = document.getElementById("form1").value.trim().toUpperCase();
      codigo === "SERAPHIA10" ? aplicarDescuento(10) : alert("Código inválido.");
    });
  }
}

function eliminarItem(button) {
  const itemId = button.dataset.itemId;
  if (!confirm("¿Seguro quieres eliminar este producto?")) return;

  fetch(`http://localhost:8080/api/cart-items/${itemId}`, { method: "DELETE" })
    .then(resp => {
      if (!resp.ok) throw new Error("No se pudo eliminar");
      button.closest(".card").remove();
      actualizarTotal();
    })
    .catch(err => alert("Error al eliminar producto: " + err.message));
}

function actualizarTotal() {
  let total = 0;
  document.querySelectorAll(".precio-producto").forEach(el => {
    const precio = parseFloat(el.textContent.replace("$", ""));
    if (!isNaN(precio)) total += precio;
  });
  const totalElement = document.querySelector(".precio-total");
  totalElement.textContent = `$${total.toFixed(2)}`;
  totalElement.dataset.total = total.toFixed(2);
}

function aplicarDescuento(porcentaje) {
  const totalElement = document.querySelector(".precio-total");
  const totalOriginal = parseFloat(totalElement.dataset.total || "0");
  const totalDescuento = totalOriginal * (1 - porcentaje / 100);
  totalElement.textContent = `$${totalDescuento.toFixed(2)}`;
}

// ✅ Agregar producto al carrito desde botón de prueba
function addItemToCartDesdeFront() {
  const nuevoItem = {
    productId: 1,
    colorId: 1,
    sizeId: 1,
    cartId: 1,         // ⚠️ Asegúrate de actualizar esto dinámicamente si es necesario
    category: "ropa",
    quantity: 1
  };

  fetch("http://localhost:8080/api/cart-items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nuevoItem)
  })
    .then(res => {
      if (!res.ok) {
        return res.text().then(text => {
          throw new Error(`Error ${res.status}: ${text}`);
        });
      }
      return res.json();
    })
    .then(data => {
      alert("✅ Producto agregado al carrito.");
      location.reload();
    })
    .catch(err => {
      console.error("❌ Error al agregar producto:", err.message);
      alert("No se pudo agregar al carrito.");
    });
}

// ! PARA PROBAR 

// ✅ Crear carrito desde botón
function crearCarritoDesdeFront() {
  const requestData = { userId: 1 };

  fetch("http://localhost:8080/api/carts/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData)
  })
    .then(res => {
      if (!res.ok) return res.text().then(text => { throw new Error(`Error ${res.status}: ${text}`); });
      return res.json();
    })
    .then(cart => {
      alert("✅ Carrito creado o recuperado correctamente.");
      // Cargar productos si hay
      fetch(`http://localhost:8080/api/cart-items/user/${cart.userId}`)
        .then(res => res.json())
        .then(items => {
          location.reload(); 
        });
    })
    .catch(err => {
      console.error("❌ Error al crear carrito:", err.message);
      alert("No se pudo crear el carrito.");
    });
}