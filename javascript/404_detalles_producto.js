import { getProductById, addItemToCart } from "../javascript/api.js";

let producto = null; // Variable global para usar en la función del carrito

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    alert("No se proporcionó un ID de producto. Serás redirigido.");
    window.location.href = "/html/index.html";
    return;
  }

  try {
    producto = await getProductById(productId);
    console.log("📦 Producto recibido desde la API:", producto);

    if (!producto || Object.keys(producto).length === 0 || !producto.name) {
      alert("Este producto no está disponible. Serás redirigido.");
      window.location.href = "/";
      return;
    }

    // Datos principales
    const nombre = producto.name ?? "Sin nombre";
    const descripcion = producto.description ?? "Sin descripción";
    const precio = producto.netSalesValue ?? producto.price ?? 0;

    document.querySelector("h1").textContent = nombre;
    document.querySelector(".text-muted.h5").textContent = Number(precio).toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });
    document.querySelector(".card p:not(.h5)").textContent = descripcion;

    // Talla
    let talla = "N/A";
    if (Array.isArray(producto.sizes)) {
      talla = producto.sizes[0]?.sizeName ?? "N/A";
    } else if (producto.sizes?.sizeName) {
      talla = producto.sizes.sizeName;
    }

    // Color
    const color = producto.color?.colorName ?? "N/A";

    const detalles = document.querySelector("#contenido-detalles");
    if (detalles) {
      detalles.innerHTML = `<b>Talla:</b> ${talla} <br><b>Color:</b> ${color}`;
    }

    // Carrusel de imágenes
    const carouselInner = document.querySelector(".carousel-inner");
    const miniaturas = document.querySelector(".d-flex.mt-3");

    if (carouselInner) carouselInner.innerHTML = "";
    if (miniaturas) miniaturas.innerHTML = "";

    const imagenes = producto.imageList;
    const placeholder = "https://placehold.co/500x500?text=Sin+imagen";

    if (Array.isArray(imagenes) && imagenes.length > 0) {
      imagenes.forEach((imgObj, index) => {
        const src = imgObj.url || placeholder;

        const slide = document.createElement("div");
        slide.className = `carousel-item${index === 0 ? " active" : ""}`;
        slide.innerHTML = `<img src="${src}" class="d-block w-100 img-ajustada" alt="Producto">`;
        carouselInner?.appendChild(slide);

        const mini = document.createElement("img");
        mini.src = src;
        mini.className = "img-thumbnail miniatura";
        mini.onclick = () => seleccionarSlide(index);
        miniaturas?.appendChild(mini);
      });
    } else {
      const slide = document.createElement("div");
      slide.className = "carousel-item active";
      slide.innerHTML = `<img src="${placeholder}" class="d-block w-100 img-ajustada" alt="Sin imagen">`;
      carouselInner?.appendChild(slide);

      const mini = document.createElement("img");
      mini.src = placeholder;
      mini.className = "img-thumbnail miniatura";
      mini.onclick = () => seleccionarSlide(0);
      miniaturas?.appendChild(mini);
    }

    // 🎯 Conectar botón "Agregar al carrito"
    const btnAgregar = document.querySelector(".btn-carrito");
    if (btnAgregar) {
      btnAgregar.addEventListener("click", sendProductToCart);
    }

  } catch (error) {
    console.error("❌ Error al cargar producto:", error.message);
    alert("Hubo un problema al cargar el producto. Serás redirigido al inicio.");
    window.location.href = "/";
  }
});

// 🛒 Función para agregar al carrito
const sendProductToCart = async () => {
  try {
    const cartFromSS = JSON.parse(sessionStorage.getItem("cart"));
    if (!producto?.id || !cartFromSS?.cart?.id) {
      alert("No se puede agregar el producto. Verifica tu sesión.");
      return;
    }

    const cartItem = {
      cartId: cartFromSS.cart.id,
      productId: producto.id,
    };

    const response = await addItemToCart(cartItem);
    if (!response.ok) {
      console.error("⚠️ Error al agregar producto:", response);
      alert("No se pudo agregar al carrito.");
      return;
    }

    alert("✅ Producto agregado al carrito");

  } catch (error) {
    console.error("❌ Error al agregar al carrito:", error);
    alert("Ocurrió un error inesperado.");
  }
};

// 🎞️ Carrusel
function seleccionarSlide(index) {
  const carousel = bootstrap.Carousel.getOrCreateInstance(document.querySelector("#carouselProducto"));
  carousel.to(index);
}
