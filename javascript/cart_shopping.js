document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Debes iniciar sesión para ver tu carrito.");
    window.location.href = "/html/login.html";
    return;
  }

  inicializarCarrito(userId);

  // Confirmar compra
  const btnConfirmar = document.getElementById("btnConfirmar");
  if (btnConfirmar) {
    btnConfirmar.addEventListener("click", () => {
      btnConfirmar.classList.add("boton-pulse");
      setTimeout(() => window.location.href = "/html/Registro_de_Pago.html", 600);
    });
  }
});

function inicializarCarrito(userId) {
  // 1. Intenta obtener el carrito existente
  fetch(`http://localhost:8080/api/carts/user/${userId}`)
    .then(res => {
      if (res.ok) return res.json();

      // 2. Si no existe, lo crea
      return fetch(`http://localhost:8080/api/carts/create/${userId}`, {
        method: "POST"
      }).then(res => {
        if (!res.ok) throw new Error("No se pudo crear el carrito.");
        return res.json();
      });
    })
    .then(cart => {
      localStorage.setItem("cartId", cart.id);
      cargarCarrito(userId);
    })
    .catch(err => {
      console.error("❌ Error inicializando carrito:", err.message);
      alert("No se pudo inicializar el carrito.");
    });
}

function cargarCarrito(userId) {
  const cartContainer = document.getElementById("cart-items-container");
  const totalElement = document.querySelector(".precio-total");

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

        const img = (item.product.imagesList && item.product.imagesList.length > 0)
          ? item.product.imagesList[0].imageUrl
          : "/img/placeholder.png";

        const card = document.createElement("div");
        card.className = "card rounded-3 mb-4";
        card.innerHTML = `
          <div class="card-body p-4">
            <div class="row d-flex justify-content-between align-items-center">
              <div class="col-md-3">
                <img src="${img}" class="img-fluid rounded-3 cart-product-image" alt="${item.product.name}">
              </div>
              <div class="col-md-5">
                <div class="d-flex align-items-baseline justify-content-between">
                  <p class="lead fw-normal mb-2">${item.product.name}</p>
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
}

function addEventListeners() {
  document.querySelectorAll(".btn-eliminar").forEach(btn =>
    btn.addEventListener("click", () => eliminarItem(btn))
  );

  document.querySelectorAll(".btn-modificar").forEach(btn =>
    btn.addEventListener("click", () =>
      alert("Funcionalidad de modificar aún por implementarse")
    )
  );

  const aplicarBtn = document.querySelector(".btn-aplicar-descuento");
  if (aplicarBtn) {
    aplicarBtn.addEventListener("click", () => {
      const codigo = document.getElementById("form1").value.trim().toUpperCase();
      codigo === "SERAPHIA10"
        ? aplicarDescuento(10)
        : alert("Código inválido.");
    });
  }
}

function eliminarItem(button) {
  const itemId = button.dataset.itemId;
  const userId = localStorage.getItem("userId");

  if (!confirm("¿Seguro que deseas eliminar este producto del carrito?")) return;

  fetch(`http://localhost:8080/api/cart-items/${itemId}`, { method: "DELETE" })
    .then(resp => {
      if (!resp.ok) throw new Error("No se pudo eliminar");
      cargarCarrito(userId);
    })
    .catch(err => alert("Error al eliminar producto: " + err.message));
}

function aplicarDescuento(porcentaje) {
  const totalElement = document.querySelector(".precio-total");
  const totalOriginal = parseFloat(totalElement.dataset.total || "0");
  const totalConDescuento = totalOriginal * (1 - porcentaje / 100);
  totalElement.textContent = `$${totalConDescuento.toFixed(2)}`;
}

function addItemToCartDesdeFront() {
  const cartId = localStorage.getItem("cartId");
  const userId = localStorage.getItem("userId");
  if (!cartId || !userId) return alert("No hay sesión activa.");

  const nuevoItem = {
    productId: 1,
    cartId: parseInt(cartId)
  };

  fetch("http://localhost:8080/api/cart-items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoItem)
  })
    .then(res => {
      if (!res.ok) {
        return res.text().then(text => { throw new Error(`Error ${res.status}: ${text}`); });
      }
      return res.json();
    })
    .then(() => {
      alert("✅ Producto agregado al carrito.");
      cargarCarrito(userId);
    })
    .catch(err => {
      console.error("❌ Error al agregar producto:", err.message);
      alert("No se pudo agregar al carrito.");
    });
}
