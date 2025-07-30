document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    alert("No se proporcionó un ID de producto.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/products/${productId}`);
    if (!response.ok) throw new Error("Producto no encontrado");

    const producto = await response.json();

    // Título y precio
    document.querySelector("h1").textContent = producto.nombre;
    document.querySelector(".text-muted.h5").textContent = `$${producto.precio}.00`;
    document.querySelector(".card p:not(.h5)").textContent = producto.descripcion;

    // Materiales y talla
    document.querySelector("#detalles").innerHTML = `<b>Talla:</b> ${producto.talla || 'N/A'} <br><b>Materiales:</b> ${producto.materiales || 'N/A'}`;

    // Carousel
    const carouselInner = document.querySelector(".carousel-inner");
    const miniaturas = document.querySelector(".d-flex.mt-3");

    carouselInner.innerHTML = "";
    miniaturas.innerHTML = "";

    // Validación de imágenes
    const imagenes = Array.isArray(producto.imagenes) ? producto.imagenes : [];

    if (imagenes.length === 0) {
      const placeholder = document.createElement("div");
      placeholder.className = "carousel-item active";
      placeholder.innerHTML = `<img src="https://via.placeholder.com/500x500?text=Sin+imagen" class="d-block w-100 img-ajustada" alt="Sin imagen">`;
      carouselInner.appendChild(placeholder);
    } else {
      imagenes
        .sort((a, b) => a.imageOrder - b.imageOrder)
        .forEach((img, index) => {
          // Slide
          const slide = document.createElement("div");
          slide.className = `carousel-item${index === 0 ? " active" : ""}`;
          slide.innerHTML = `<img src="${img.imageUrl}" class="d-block w-100 img-ajustada" alt="Imagen ${index + 1}">`;
          carouselInner.appendChild(slide);

          // Miniatura
          const mini = document.createElement("img");
          mini.src = img.imageUrl;
          mini.className = "img-thumbnail miniatura";
          mini.onclick = () => seleccionarSlide(index);
          miniaturas.appendChild(mini);
        });
    }
  } catch (error) {
    alert("Hubo un problema al cargar el producto: " + error.message);
    console.error(error);
  }
});

// Función para mover el carrusel
function seleccionarSlide(index) {
  const carousel = bootstrap.Carousel.getOrCreateInstance(document.querySelector("#carouselProducto"));
  carousel.to(index);
}
