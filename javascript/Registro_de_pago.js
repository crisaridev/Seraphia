document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registroForm');
  const mensajeGracias = document.getElementById('mensajeGracias');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Detiene el envío clásico del formulario

    // Obtener valores de campos requeridos
    const email = document.getElementById('email').value.trim();
    const nombre = document.getElementById('nombreCompleto').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    // Validar campos requeridos
    if (!email || !nombre || !telefono) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    // Enviar los datos con fetch
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch("https://formsubmit.co/ajax/abril.salmed@gmail.com", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        form.classList.add("d-none"); // Oculta el formulario
        mensajeGracias.classList.remove("d-none"); // Muestra mensaje de gracias
        form.reset(); // Limpia los campos
      } else {
        alert("Hubo un error al enviar el formulario. Intenta de nuevo.");
      }
    })
    .catch(() => {
      alert("Ocurrió un error de red. Por favor, intenta más tarde.");
    });
  });
});