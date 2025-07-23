
// Search function

const searchItems = () => {
  if (window.matchMedia("(min-width: 793px)").matches) {
    var searchBar = document
      .getElementById("search-bar")
      .value.trim()
      .toUpperCase();
    var form = document.getElementById('searchForm');
  } else {
    var searchBar = document
      .getElementById("search-bar-mobile")
      .value.trim()
      .toUpperCase();
    
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
  })
  const product = document.querySelectorAll(".product");

  for (let i = 0; i < product.length; i++) {
    let match = product[i].getElementsByTagName("p")[0];
    if (match) {
      let text = match.textContent || match.innerHTML;

      if (text.trim().toUpperCase().indexOf(searchBar) > -1) {
        product[i].style.display = "";
      } else {
        product[i].style.display = "none";
      }
    }
  }
};

// Checkbox: Marcar/desmarcar todos en la tabla

function setUpCheckAllCheckbox() {
  // Busca todos los checkboxes principales (por si hay más de una tabla)
  document.querySelectorAll('#checkAllCheckbox').forEach(mainCheckbox => {
    mainCheckbox.addEventListener('change', function () {
      // Encuentra la tabla contenedora
      const table = mainCheckbox.closest('table');
      if (!table) return;
      // Busca todos los checkboxes de la tabla, excepto el principal
      const checkboxes = table.querySelectorAll('tbody input[type="checkbox"].checkbox');
      checkboxes.forEach(cb => {
        cb.checked = mainCheckbox.checked;
      });
    });
  });
}

// Ejecutar al cargar el DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setUpCheckAllCheckbox();
    setUpDeleteTextOnCheckbox();
  });
} else {
  setUpCheckAllCheckbox();
  setUpDeleteTextOnCheckbox();
}

// Mostrar texto "Borrar" al seleccionar al menos un checkbox
function setUpDeleteTextOnCheckbox() {
  // Función para mostrar/ocultar el texto
  function toggleDeleteText() {
    // Buscar todos los checkboxes de las tablas
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"].checkbox');
    const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
    // Buscar el contenedor de filtros
    const filtersContainers = document.querySelectorAll('.filters');
    filtersContainers.forEach(container => {
      let deleteText = container.querySelector('.delete-text-action');
      if (anyChecked) {
        if (!deleteText) {
          deleteText = document.createElement('button');
          deleteText.type = 'button';
          deleteText.className = 'delete-text-action filter filter_btn delete_btn filter_btn justify-content-center d-flex py-3 me-1 me-lg-3';
          deleteText.innerHTML = '<i class="bx  bx-trash"  ></i> ';
          // Insertar como primer hijo del contenedor de filtros
          container.insertBefore(deleteText, container.firstChild);
        }
      } else {
        if (deleteText) {
          deleteText.remove();
        }
      }
    });

    // Agregar listener al botón "Borrar"
    document.querySelectorAll('.delete-text-action').forEach(btn => {
      btn.removeEventListener('click', handleDeleteCheckedRows); // Evitar duplicados
      btn.addEventListener('click', handleDeleteCheckedRows);
    });
  }
  // Agregar listeners a todos los checkboxes
  document.addEventListener('change', function (e) {
    if (e.target.matches('input[type="checkbox"].checkbox')) {
      toggleDeleteText();
      updateTableRowActive();
    }
  });
  // Ejecutar al cargar
  toggleDeleteText();
  updateTableRowActive();
}

// Mantener la fila seleccionada con el efecto hover de Bootstrap
function updateTableRowActive() {
  const checkboxes = document.querySelectorAll('tbody input[type="checkbox"].checkbox');
  checkboxes.forEach(cb => {
    const row = cb.closest('tr');
    if (!row) return;
    if (cb.checked) {
      row.classList.add('table-active');
    } else {
      row.classList.remove('table-active');
    }
  });
}

// Eliminar filas marcadas y del localStorage
function handleDeleteCheckedRows() {
  // Seleccionar todos los checkboxes marcados
  const checked = document.querySelectorAll('tbody input[type="checkbox"].checkbox:checked');
  checked.forEach(cb => {
    // Eliminar del DOM la fila (tr) correspondiente
    const row = cb.closest('tr');
    if (row) {
      // Si la fila tiene un atributo data-id, úsalo para borrar del localStorage
      const dataId = row.getAttribute('data-id');
      if (dataId) {
        // Si tus datos están en un array en localStorage, deberás adaptar este bloque
        localStorage.removeItem(dataId);
      }
      row.remove();
    }
  });
  // Actualizar el estado del botón "Borrar"
  setTimeout(() => {
    // Esperar a que el DOM se actualice antes de volver a chequear
    const event = new Event('change');
    document.dispatchEvent(event);
  }, 50);
}