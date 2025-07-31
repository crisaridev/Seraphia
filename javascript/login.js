document.addEventListener("DOMContentLoaded", () => {
  // Verifica si el usuario ya está logueado
  const loggedUser = sessionStorage.getItem("loggedUser");
  if (loggedUser) {
    const user = JSON.parse(loggedUser);
    alert(`Ya estás logueado como: ${user.name} (${user.email})`);
    // Puedes redirigir al home automáticamente si quieres:
    // window.location.href = "/index.html";
    return;
  }

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
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        const mensaje = data.message || "Error en el inicio de sesión.";
        throw new Error(mensaje);
      }

      // ✅ Guarda info del usuario
      sessionStorage.setItem("loggedUser", JSON.stringify(data));
      localStorage.setItem("userId", data.id); //  Guarda el ID del usuario
      localStorage.setItem("cartId", data.cart?.id || ""); //  Guarda el ID del carrito si existe

      // ✅ Guarda token si lo usas
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
