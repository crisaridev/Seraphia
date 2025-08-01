
import { loginUser } from '../api.js';

document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("form");
	const emailInput = document.getElementById("email");
	const passwordInput = document.getElementById("password");

	form.addEventListener("submit", async function (event) {
		event.preventDefault();

		const email = emailInput.value.trim();
		const password = passwordInput.value.trim();

		if (email === "" || password === "") {
			alert("Completa todos los campos.");
			return;
		}

		try {
			const data = await loginUser(email, password);

			// ✅ Guarda info del usuario
			sessionStorage.setItem("loggedUser", JSON.stringify(data));
			localStorage.setItem("userId", data.id);
			localStorage.setItem("cartId", data.cart?.id || "");

			if (data.token) {
				localStorage.setItem("authToken", data.token);
			}

			alert(`Inicio de sesión exitoso. ¡Bienvenido/a, ${data.name}!`);
			window.location.href = "/index.html";

		} catch (error) {
			console.error("Login error:", error);
			alert(error.message || "Ocurrió un error.");
		}
	});
});
