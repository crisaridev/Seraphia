import { registerUser } from '../api.js';

document.getElementById('registroForm').addEventListener('submit', async function (event) {
	event.preventDefault();

	const nombre = document.getElementById('nombre').value.trim();
	const telefono = document.getElementById('telefono').value.trim();
	const email = document.getElementById('email').value.trim();
	const password = document.getElementById('password').value;
	const confirmPassword = document.getElementById('confirm-password').value;

	// Validaciones locales
	if (!nombre || !telefono || !email || !password || !confirmPassword) {
		return mostrarAlerta('Por favor completa todos los campos.', 'danger');
	}
	if (nombre.length < 3) {
		return mostrarAlerta('El nombre debe tener al menos 3 caracteres.', 'danger');
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return mostrarAlerta('El correo electrónico no es válido.', 'danger');
	}
	const telefonoRegex = /^\d{10,15}$/;
	if (!telefonoRegex.test(telefono)) {
		return mostrarAlerta('El número de teléfono debe tener entre 10 y 15 dígitos.', 'danger');
	}
	if (password !== confirmPassword) {
		return mostrarAlerta('Las contraseñas no coinciden.', 'danger');
	}
	if (password.length < 8) {
		return mostrarAlerta('La contraseña debe tener al menos 8 caracteres.', 'danger');
	}

	const usuario = { name: nombre, phone: telefono, email, password };

	try {
		const data = await registerUser(usuario);

		localStorage.setItem('userId', data.id);
		mostrarAlerta('Registro exitoso. Redirigiendo...', 'success');
		setTimeout(() => {
			window.location.href = '/html/login.html';
		}, 1500);

	} catch (error) {
		console.error('Error:', error);
		mostrarAlerta(error.message || 'Hubo un error al registrar. Intenta más tarde.', 'danger');
	}
});

// Función para mostrar alertas Bootstrap
function mostrarAlerta(mensaje, tipo) {
	const alertaDiv = document.getElementById('alerta');
	alertaDiv.className = `alert alert-${tipo}`;
	alertaDiv.textContent = mensaje;
	alertaDiv.classList.remove('d-none');
}
