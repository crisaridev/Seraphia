
  // Usuario de prueba en localStorage (solo si no existe checkk)
  const userTest = {
    email: "test@seraphia.com",
    password: "12345678" // 8 caracteres bc lo especifico en html
  };

  // Guardar solo si no existe
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([userTest]));
  }

  // Obtener formulario y campos
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validar campos vacíos
    if (email === "" || password === "") {
      alert("Completa todos los campos.");
      return;
    }

    // Usuarios desde localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar usuario que coincida que haga match
    const userFound = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (userFound) {
      // se guardo en storage que este logeado
      sessionStorage.setItem("loggedUser", JSON.stringify(userFound));

      // redireccionar al inicio
      window.location.href = "/index.html";
    } else {
      alert("Email o contraseña incorrectos.");
    }
  });
