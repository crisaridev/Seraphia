document.addEventListener('DOMContentLoaded', function() {


  const form = document.getElementById('contacto-form');
  const statusDiv = document.getElementById('status');


  form.addEventListener('submit', function(event) {
    

    event.preventDefault();


    statusDiv.innerHTML = 'Enviando...';
    statusDiv.style.color = '#333';


    const formData = new FormData(form);

    
    fetch('https://formspree.io/f/xyzjvlww', {
      method: 'POST',
      body: formData,
      // 👇 
      headers: {
          'Accept': 'application/json'
      }
    })
    .then(response => {
        
        if (response.ok) {
          
          statusDiv.innerHTML = '✅ ¡Mensaje enviado con éxito!';
          statusDiv.style.color = 'green';
          form.reset(); 
        } else {

          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              statusDiv.innerHTML = `❌ Error: ${data.errors.map(error => error.message).join(", ")}`;
            } else {
              statusDiv.innerHTML = '❌ Ups! Hubo un problema al enviar tu formulario.';
            }
            statusDiv.style.color = 'red';
          })
        }
    })
    .catch(error => {
      console.error('Error:', error);
      statusDiv.innerHTML = '❌ Hubo un problema con la conexión. Intenta de nuevo.';
      statusDiv.style.color = 'red';
    });
  });
});