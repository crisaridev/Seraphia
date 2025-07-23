// Order card generator

const usersController = new userController(0);
function addItemCard(item) {
  const itemHTML =
    '<tr class="selected_table product">' +
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
    '<p class="mb-0">' +
    item.role +
    "</p>" +
    "</div>" +
    "</td>" +
    '<td class="d-none d-sm-table-cell">' +
    item.email +
    "</td>" +
    '<td class="d-none d-sm-table-cell">' +
    item.role +
    "</td>" +
    "</tr>";

  const itemsContainer = document.getElementById("list-items");
  itemsContainer.innerHTML += itemHTML;
}

var sampleProducts = [
  {
    id: "1",
    name: "Alejandro Cruz",
    img: "/assets/img/placeholder.jpg",
    email: "alejandro.cruz@example.com",
    role: "Administrador"
  },
  {
    id: "2",
    name: "María González",
    img: "/assets/img/placeholder.jpg",
    email: "maria.gonzalez@example.com",
    role: "Cliente"
  },
  {
    id: "3",
    name: "José Ramírez",
    img: "/assets/img/placeholder.jpg",
    email: "jose.ramirez@example.com",
    role: "Cliente"
  },
  {
    id: "4",
    name: "Lucía Morales",
    img: "/assets/img/placeholder.jpg",
    email: "lucia.morales@example.com",
    role: "Cliente"
  },
  {
    id: "5",
    name: "Carlos Herrera",
    img: "/assets/img/placeholder.jpg",
    email: "carlos.herrera@example.com",
    role: "Cliente"
  }
];



function sampleDataLocalStorage() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(sampleProducts));
  }
}

function loadProductController() {
  for (var i = 0, size = usersController.items.length; i < size; i++) {
    const item = usersController.items[i];
    addItemCard(item);
  }
}


sampleDataLocalStorage();
usersController.loadItemsFromLocalStorage();
loadProductController();

