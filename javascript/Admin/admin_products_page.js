




//* Filtros

let actualSizeSelected = 'Talla';
let actualTypeSelected = 'Tipo de prenda';
const originalSizeSelected = 'Talla';
const originalTypeSelected = 'Tipo de prenda';

const sizeFilterBtn = document.querySelector('.size_filter');
const typeFilterBtn = document.querySelector('.type_filter');

function filterProductsCard() {

  const products = document.querySelectorAll('.product');

  products.forEach(prod => {

    const matchSize = actualSizeSelected === 'Talla'
      || prod.classList.contains(actualSizeSelected);
    const matchType = actualTypeSelected === 'Tipo de prenda'
      || prod.classList.contains(actualTypeSelected);

    if (matchSize && matchType) {
      prod.classList.remove('hide-filter');
    } else {
      prod.classList.add('hide-filter');
    }
  });
}

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

window.setSizeFilter = setSizeFilter;
window.setTypeFilter = setTypeFilter;

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

