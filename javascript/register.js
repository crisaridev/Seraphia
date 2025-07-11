document.getElementById('registroForm').addEventListener('submit', function (event) {
  event.preventDefault(); 

  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Validar campos vacíos
  if (!nombre || !telefono || !email || !password || !confirmPassword) {
    mostrarAlerta('Por favor completa todos los campos.', 'danger');
    return;
  }

  // Validar longitud del nombre
  if (nombre.length < 3) {
    mostrarAlerta('El nombre debe tener al menos 3 caracteres.', 'danger');
    return;
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    mostrarAlerta('El correo electrónico no es válido.', 'danger');
    return;
  }

  // Validar teléfono
  const telefonoRegex = /^\d{10,15}$/;
  if (!telefonoRegex.test(telefono)) {
    mostrarAlerta('El número de teléfono debe contener solo dígitos y tener entre 10 y 15 caracteres.', 'danger');
    return;
  }

  // Validar contraseñas
  if (password !== confirmPassword) {
    mostrarAlerta('Las contraseñas no coinciden.', 'danger');
    return;
  }

  // Validar longitud de contraseña
  if (password.length < 8) {
    mostrarAlerta('La contraseña debe tener al menos 8 caracteres.', 'danger');
    return;
  }

  // Obtener usuarios existentes
  let usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];

  // Verificar si el email ya existe
  const existeEmail = usuarios.some(u => u.email === email);
  if (existeEmail) {
    mostrarAlerta('El correo electrónico ya está registrado.', 'danger');
    return;
  }

  // Crear objeto usuario
  const usuario = {
    nombre: nombre,
    telefono: telefono,
    email: email,
    password: password // ⚠️ Recuerda que en producción se debería encriptar
  };

  // Agregar usuario al arreglo y guardar
  usuarios.push(usuario);
  localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));

  // Mostrar alerta de éxito
  mostrarAlerta('Registro exitoso. Usuario creado correctamente.', 'success');

  // Limpiar formulario
  document.getElementById('registroForm').reset();

  console.log('Usuario JSON:', JSON.stringify(usuario));

  // Comentario para fetch futuro
  /*
  fetch('https://mi-servidor.com/api/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuario)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en el servidor');
    }
    return response.json();
  })
  .then(data => {
    console.log('Usuario registrado en el servidor:', data);
  })
  .catch(error => {
    console.error('Error al enviar:', error);
  });
  */
});

// Función para mostrar alertas Bootstrap
function mostrarAlerta(mensaje, tipo) {
  const alertaDiv = document.getElementById('alerta');
  alertaDiv.className = 'alert alert-' + tipo;
  alertaDiv.textContent = mensaje;
  alertaDiv.classList.remove('d-none');
}
