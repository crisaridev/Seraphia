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
    // Comprueba cada criterio
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
// hi
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

console.log("Este js funciona")

// Order card generator

const ordersController = new orderController(0);
function addItemCard(item) {
  const itemHTML =
    '<tr class="selected_table product ' + item.sizes.join(' ') + ' ' + item.type + '" ' +
    'data-order-id="' + item.id + '" style="cursor:pointer;" onclick="goToOrderDetail(\'' + item.id + '\')">'  +
    '<td class="product-img">' +
    '<img src="' + item.img + '" alt="' + item.name + '">' +
    '</td>' +
    '<td class="product_label text-start product-name">' +
    '<p class="mb-0">' + item.name + '</p>' +
    '<div class="stock_price_mobile d-flex d-sm-none mt-2">' +
    '<p class="me-3 mb-0">' + item.orderStatus + '</p>' +
    '<p>•</p>' +
    '<p class="mx-3 mb-0">$' + item.netSalesValue + '</p>' +
    '</div>' +
    '</td>' +
    '<td class="button_hide fw-bolder edit_btn text-start">' + item.customerName + '</td>' +
    '<td class="d-none d-sm-table-cell">' + item.orderStatus + '</td>' +
    '<td class="d-none d-sm-table-cell">$' + item.netSalesValue + '</td>' +
    '<td class="button_hide">' + item.orderDate + '</td>' +
    '<td class="button_hide fw-bolder edit_btn">' + item.orderNumber + '</td>' +
    '</tr>';

  const itemsContainer = document.getElementById("list-items");
  itemsContainer.innerHTML += itemHTML;
}

function goToOrderDetail(orderId) {
  window.location.href = '/html/orders_details_admin.html?id=' + orderId;
}
window.goToOrderDetail = goToOrderDetail;

var sampleProducts = [
  {
    id: "1",
    name: "Probando si esto funciona  con Bordado Floral",
    img: "../assets/images/Products/1.jpg",
    sizes: ["L"],
    type: "Blusa",
    customerName: "Juan Pérez",
    email: "juan.perez@example.com",
    phoneNumber: "999-123-4567",
    street: "Av. Reforma",
    numInt: "3B",
    numExt: "102",
    suburb: "Centro",
    zipCode: "97000",
    city: "Mérida",
    state: "Yucatán",
    orderNumber: "1001",
    netSalesValue: 400.0,
    orderDate: "05/07/2025",
    orderStatus: "Pagado"
    
  },
  {
    id: "2",
    name: "Probando si esto funciona  Bordado Huipil",
    img: "../assets/images/Products/2.jpg",
    sizes: ["M"],
    type: "Blusa",
    customerName: "María López",
    email: "maria.lopez@example.com",
    phoneNumber: "999-234-5678",
    street: "Calle 60",
    numInt: "2A",
    numExt: "200",
    suburb: "Montecristo",
    zipCode: "97133",
    city: "Mérida",
    state: "Yucatán",
    orderNumber: "1002",
    netSalesValue: 450.0,
    orderDate: "05/07/2025",
    orderStatus: "Pendiente"
  },
  {
    id: "3",
    name: "Probando si esto funciona  Bordado de Peces",
    img: "../assets/images/Products/3.jpg",
    sizes: ["M"],
    type: "Blusa",
    customerName: "Carlos García",
    email: "carlos.garcia@example.com",
    phoneNumber: "999-345-6789",
    street: "Calle 47",
    numInt: "",
    numExt: "15",
    suburb: "García Ginerés",
    zipCode: "97070",
    city: "Mérida",
    state: "Yucatán",
    orderNumber: "1003",
    netSalesValue: 450.0,
    orderDate: "05/07/2025",
    orderStatus: "Entregado"
  },
  {
    id: "4",
    name: "Probando si esto funciona  diseño de triangulos",
    img: "../assets/images/Products/4.jpg",
    sizes: ["S"],
    type: "Blusa",
    customerName: "Ana Fernández",
    email: "ana.fernandez@example.com",
    phoneNumber: "999-456-7890",
    street: "Paseo de Montejo",
    numInt: "1",
    numExt: "50",
    suburb: "Paseo de Montejo",
    zipCode: "97010",
    city: "Mérida",
    state: "Yucatán",
    orderNumber: "1004",
    netSalesValue: 400.0,
    orderDate: "05/07/2025",
    orderStatus: "Enviado"
  },
  {
    id: "5",
    name: "Probando si esto funciona n mangas color rojo",
    img: "../assets/images/Products/5.jpg",
    sizes: ["M"],
    type: "Blusa",
    customerName: "Luis Hernández",
    email: "luis.hernandez@example.com",
    phoneNumber: "999-567-8901",
    street: "Calle 42",
    numInt: "",
    numExt: "75",
    suburb: "Santa Ana",
    zipCode: "97000",
    city: "Mérida",
    state: "Yucatán",
    orderNumber: "1005",
    netSalesValue: 450.0,
    orderDate: "05/07/2025",
    orderStatus: "Entregado"
  },
  {
    id: "6",
    name: "Probando si esto funciona estilo kimono",
    img: "../assets/images/Products/6.jpg",
    sizes: ["L"],
    type: "Blusa",
    customerName: "Sofía Martínez",
    email: "sofia.martinez@example.com",
    phoneNumber: "999-678-9012",
    street: "Calle 33",
    numInt: "5",
    numExt: "120",
    suburb: "Itzimná",
    zipCode: "97110",
    city: "Mérida",
    state: "Yucatán",
    orderNumber: "1006",
    netSalesValue: 500.0,
    orderDate: "05/07/2025",
    orderStatus: "Entregado"
  },
  {
    id: "7",
    name: "Probando si esto funciona  espalda descubierta",
    img: "../assets/images/Products/7.jpg",
    sizes: ["M"],
    type: "Blusa",
    customerName: "Miguel Torres",
    email: "miguel.torres@example.com",
    phoneNumber: "999-789-0123",
    street: "Calle 20",
    numInt: "",
    numExt: "18",
    suburb: "Chuburná",
    zipCode: "97118",
    city: "Mérida",
    state: "Yucatán",
    orderNumber: "1007",
    netSalesValue: 400.0,
    orderDate: "05/07/2025",
    orderStatus: "Cancelado"
  },
  {
    id: "8",
    name: "Probando si esto funciona imétrica con Encaje Floral",
    img: "../assets/images/Products/8.jpg",
    sizes: ["M"],
    type: "Blusa",
    customerName: "Isabel Ruiz",
    email: "isabel.ruiz@example.com",
    phoneNumber: "999-890-1234",
    street: "Calle 29",
    numInt: "4",
    numExt: "40",
    suburb: "La Mejorada",
    zipCode: "97060",
    city: "Mérida",
    state: "Yucatán",
    orderNumber: "1008",
    netSalesValue: 400.0,
    orderDate: "05/07/2025",
    orderStatus: "Pendiente"
  },
  {
    id: "9",
    name: "Probando si esto funciona aquero",
    img: "../assets/images/Products/9.jpg",
    sizes: ["L"],
    type: "Blusa",
    customerName: "Diego Ramírez",
    email: "diego.ramirez@example.com",
    phoneNumber: "999-901-2345",
    street: "Av. Cúpules",
    numInt: "7",
    numExt: "9",
    suburb: "Bojórquez",
    zipCode: "97402",
    city: "Mérida",
    state: "Yucatán",
    orderNumber: "1009",
    netSalesValue: 500.0,
    orderDate: "05/07/2025",
    orderStatus: "Pagado"

  },
  {
    id: "10",
    name: "Probando si esto funciona n bordado de crochet",
    img: "../assets/images/Products/10.jpg",
    sizes: ["M"],
    type: "Blusa",
    customerName: "Lucía Vega",
    email: "lucia.vega@example.com",
    phoneNumber: "999-012-3456",
    street: "Calle 58",
    numInt: "",
    numExt: "22",
    suburb: "San Sebastián",
    zipCode: "97050",
    city: "Mérida",
    state: "Yucatán",
    orderNumber: "1010",
    netSalesValue: 450.0,
    orderDate: "05/07/2025",
    orderStatus: "Pagado"
  }
];


function sampleDataLocalStorage() {
  if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify(sampleProducts));
  }
}


  const orders = JSON.parse(localStorage.getItem('orders') || '[]');

    function getOrderIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id')}

    function getOrderById(orderId) {
      return orders.find(o => o.id === orderId);
    }

  const orderIdUrl = getOrderIdFromUrl()
  const orderObj = getOrderById(orderIdUrl)
  const statusDropdown = document.getElementById('dropdown_status')

function loadProductController() {
  for (var i = 0, size = ordersController.items.length; i < size; i++) {
    const item = ordersController.items[i];
    addItemCard(item);
  }
}

// Order details

// Actualizar estado

const statusBtns = document.querySelectorAll('.status_btns')

statusBtns.forEach(statusBtn => {
  
statusBtn.addEventListener('click', () => { 
function updateStatus() {







  if(statusBtn.classList.contains('Pendiente')) {
    console.log('Seleccionaste el boton que asigna el status Pendiente')
    orderObj.orderStatus = 'Pendiente'
    localStorage.setItem('orders', JSON.stringify(orders));
  } else if(statusBtn.classList.contains('Pagado')) {
    console.log('Seleccionaste el boton que asigna el status Pagado')
    orderObj.orderStatus = 'Pagado'
    localStorage.setItem('orders', JSON.stringify(orders));
  } else if(statusBtn.classList.contains('Enviado')) {
    console.log('Seleccionaste el boton que asigna el status Enviado')
    orderObj.orderStatus = 'Enviado'
    localStorage.setItem('orders', JSON.stringify(orders));
  } else if(statusBtn.classList.contains('Entregado')) {
    console.log('Seleccionaste el boton que asigna el status Entregado')
    orderObj.orderStatus = "Entregado"
    localStorage.setItem('orders', JSON.stringify(orders));
  } else if(statusBtn.classList.contains('Cancelado')) {
    console.log('Seleccionaste el boton que asigna el status Cancelado')
    orderObj.orderStatus = "Cancelado"
    localStorage.setItem('orders', JSON.stringify(orders));
  }

    statusDropdown.innerHTML = orderObj.orderStatus

  console.log('El listener funciona, boton seleccionado: ' + statusBtn.innerHTML)
  console.log(getOrderIdFromUrl())
  
}
updateStatus()

})
});

if (window.location.pathname === '/html/orders_details_admin.html') {
    statusDropdown.innerHTML = orderObj.orderStatus 
}


// Primero un listener, va a escuchar al boton seleccionado de status
// Una vez que tiene el boton seleccionado
// if el boton seleccionado 


if (window.location.pathname === '/html/orders_admin_page.html') {
  sampleDataLocalStorage();
ordersController.loadItemsFromLocalStorage();
loadProductController();
}


