




//* Filtros

// 1) Variables globales para estado de filtros
let actualSizeSelected = 'Talla';
let actualTypeSelected = 'Tipo de prenda';
const originalSizeSelected = 'Talla';
const originalTypeSelected = 'Tipo de prenda';

// 2) Referencias a los botones (para actualizar su texto)
const sizeFilterBtn = document.querySelector('.size_filter');
const typeFilterBtn = document.querySelector('.type_filter');

// 3) Función que aplica los dos filtros simultáneamente
function filterProductsCard() {
  // Selecciona todas las tarjetas
  const products = document.querySelectorAll('.product');

  products.forEach(prod => {
    // Comprueba cada criterio
    const matchSize = actualSizeSelected === 'Talla'
      || prod.classList.contains(actualSizeSelected);
    const matchType = actualTypeSelected === 'Tipo de prenda'
      || prod.classList.contains(actualTypeSelected);

    // Muestra si cumple ambos, oculta si no
    if (matchSize && matchType) {
      prod.classList.remove('hide-filter');
    } else {
      prod.classList.add('hide-filter');
    }
  });
}

// 4) Funciones que actualizan cada filtro y relanzan el filtrado
function setSizeFilter(size) {
  actualSizeSelected = size;
  sizeFilterBtn.innerText   = size;
  filterProductsCard();
}

function setTypeFilter(type) {
  actualTypeSelected = type;
  typeFilterBtn.innerText   = type;
  filterProductsCard();
}

// 5) Para que los 'onclick' inline puedan llamar a estas funciones:
window.setSizeFilter = setSizeFilter;
window.setTypeFilter = setTypeFilter;

// 6) Opcional: hacer un filtrado inicial (por si quieres ocultar algo al cargar)
document.addEventListener('DOMContentLoaded', () => {
  filterProductsCard();
});

  let filterBtnsSize = document.querySelectorAll(".filter-buttons-size");
  let filterBtnsType = document.querySelectorAll(".filter-buttons-type");

  filterBtnsSize.forEach(button => {
    
  button.addEventListener('click', () => {
        if (actualSizeSelected != originalSizeSelected) {
      sizeFilterBtn.classList.add('selected-filter')
      console.log("Se ha seleccionado un filtro")
    } else {
      sizeFilterBtn.classList.remove('selected-filter')
    }
  })
  });

    filterBtnsType.forEach(button => {
    
  button.addEventListener('click', () => {
        if (actualTypeSelected != originalTypeSelected) {
      typeFilterBtn.classList.add('selected-filter')
      console.log("Se ha seleccionado un filtro")
    } else {
      typeFilterBtn.classList.remove('selected-filter')
    }
  })
  });

