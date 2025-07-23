

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






  


// const testOrder = new ProductsController();
// const probandoOrden = testOrder.addItem("Vestido rosa", "Vestido de color rosa", "/enlace", "03/07/23");
// console.log(testOrder.orders);

console.log("Este js funciona")

// Order card generator

const ordersController = new orderController(0);
function addItemCard(item) {
  const itemHTML =
    '<tr class="selected_table product ' + item.sizes.join(' ') + ' ' + item.type + '">' +
    '<th scope="col">' +
    '<input type="checkbox" class="checkbox">' +
    "</th>" +
    '<td class="product-img">' +
    '<img src="' +
    item.img +
    '" alt="' +
    item.name +
    '">' +
    "</td>" +
    '<td class="product_label text-start product-name">' +
    '<p class="mb-0">' +
    item.name +
    "</p>" +
    '<div class="stock_price_mobile d-flex d-sm-none mt-2">' +
    '<p class="me-3 mb-0">' +
    item.orderNumber +
    "</p>" +
    "<p>•</p>" +
    '<p class="mx-3 mb-0">$' +
    item.netSalesValue +
    "</p>" +
    "</div>" +
    "</td>" +
    '<td class="button_hide fw-bolder edit_btn text-start">' + item.customerName + '</td>' +
    '<td class="d-none d-sm-table-cell">' +
    item.orderNumber +
    "</td>" +
    '<td class="d-none d-sm-table-cell">' +
    "$" +
    item.netSalesValue +
    "</td>" +
    '<td class="button_hide">' +
    item.orderDate +
    "</td>" +
    "</tr>";

  const itemsContainer = document.getElementById("list-items");
  itemsContainer.innerHTML += itemHTML;
}

var sampleProducts = [
  {
    id: "1",
    name: "Probando si esto funciona  con Bordado Floral",
    img: "../assets/images/Products/1.jpg",
    sizes: ["L"],
    type: "Blusa",
    customerName: "Juan Pérez",
    orderNumber: "1001",
    netSalesValue: 400.0,
    orderDate: "05/07/2025"
  },
  {
    id: "2",
    name: "Probando si esto funciona  Bordado Huipil",
    img: "../assets//images/Products/2.jpg",
    sizes: ["M"],
    type: "Blusa",
    customerName: "María López",
    orderNumber: "1002",
    netSalesValue: 450.0,
    orderDate: "05/07/2025"
  },
  {
    id: "3",
    name: "Probando si esto funciona  Bordado de Peces",
    img: "../assets//images/Products/3.jpg",
    sizes: ["M"],
    type: "Blusa",
    customerName: "Carlos García",
    orderNumber: "1003",
    netSalesValue: 450.0,
    orderDate: "05/07/2025"
  },
  {
    id: "4",
    name: "Probando si esto funciona  diseño de triangulos",
    img: "../assets//images/Products/4.jpg",
    sizes: ["S"],
    type: "Blusa",
    customerName: "Ana Fernández",
    orderNumber: "1004",
    netSalesValue: 400.0,
    orderDate: "05/07/2025"
  },
  {
    id: "5",
    name: "Probando si esto funciona n mangas color rojo",
    img: "../assets//images/Products/5.jpg",
    sizes: ["M"],
    type: "Blusa",
    customerName: "Luis Hernández",
    orderNumber: "1005",
    netSalesValue: 450.0,
    orderDate: "05/07/2025"
  },
  {
    id: "6",
    name: "Probando si esto funciona estilo kimono",
    img: "../assets//images/Products/6.jpg",
    sizes: ["L"],
    type: "Blusa",
    customerName: "Sofía Martínez",
    orderNumber: "1006",
    netSalesValue: 500.0,
    orderDate: "05/07/2025"
  },
  {
    id: "7",
    name: "Probando si esto funciona  espalda descubierta",
    img: "../assets//images/Products/7.jpg",
    sizes: ["M"],
    type: "Blusa",
    customerName: "Miguel Torres",
    orderNumber: "1007",
    netSalesValue: 400.0,
    orderDate: "05/07/2025"
  },
  {
    id: "8",
    name: "Probando si esto funciona imétrica con Encaje Floral",
    img: "../assets//images/Products/8.jpg",
    sizes: ["M"],
    type: "Blusa",
    customerName: "Isabel Ruiz",
    orderNumber: "1008",
    netSalesValue: 400.0,
    orderDate: "05/07/2025"
  },
  {
    id: "9",
    name: "Probando si esto funciona aquero",
    img: "../assets//images/Products/9.jpg",
    sizes: ["L"],
    type: "Blusa",
    customerName: "Diego Ramírez",
    orderNumber: "1009",
    netSalesValue: 500.0,
    orderDate: "05/07/2025"
  },
  {
    id: "10",
    name: "Probando si esto funciona n bordado de crochet",
    img: "../assets//images/Products/10.jpg",
    sizes: ["M"],
    type: "Blusa",
    customerName: "Lucía Vega",
    orderNumber: "1010",
    netSalesValue: 450.0,
    orderDate: "05/07/2025"
  }
];


function sampleDataLocalStorage() {
  if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify(sampleProducts));
  }
}

function loadProductController() {
  for (var i = 0, size = ordersController.items.length; i < size; i++) {
    const item = ordersController.items[i];
    addItemCard(item);
  }
}


sampleDataLocalStorage();
ordersController.loadItemsFromLocalStorage();
loadProductController();

