
// class ProductsController {
//   constructor(currentId = 0) {
//     items = [];
//     this.currentId = currentId;
//   }


  var items = [];
  
  // addItem(name, img, price, stock, createdAt) {
  //   const product = {
  //   id: this.currentId++,
  //   name,
  //   img,
  //   price,
  //   stock,
  //   createdAt,
  // }
  //   items.push(product);
  // }

function loadItemsFromLocalStorage() {
  const storageItems = localStorage.getItem("items")
  if (storageItems) {
    const items = JSON.parse(storageItems)
    for (var i = 0, size = items.length; i < size; i++) {
      const item = items[i];
      items.push(item);
    }
  }
}

async function loadItemsFromAPI() {
  const API = 'http://localhost:8080/api/products'; // Cambia esto por la URL real
  try {
    const response = await fetch(API);
    const storageData = await response.json();
    items = [];
    storageData.forEach(product => {
      let productCategory = product.category;
      let productSize = product.size;
      let productColor = product.color;
      let productImg = product.imagesList;
      items.push({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        creationDate: product.creationDate,
        size: productSize.sizeName,
        color: productColor.colorName,
        category: productCategory.categoryName,
        imagesList: productImg[0].imageUrl
      });
    console.log(productCategory.categoryName)
    console.log(productSize.sizeName)
    console.log(productColor.colorName)
    console.log(productImg[0].imageUrl)
    console.log(product.description)

    });
  } catch (errorCode) {
    console.error('Error al cargar productos: ', errorCode);
    items = [];
  }
  console.log(items)

}
// }



// const testItems = new ProductsController();
// const probando = testItems.addItem("Vestido rosa", "Vestido de color rosa", "/enlace", "03/07/23");
// console.log(testItems.items);

console.log("Este js funciona")

// testItems.loadItemsFromAPI();










function addItemCard(item) {
  const itemHTML =
    '<tr class="selected_table product ' + item.size + ' ' + item.category + '">' +
    '<th scope="col">' +
    '<input type="checkbox" class="checkbox">' +
    "</th>" +
    '<td class="product-img">' +
    '<img src="' +
    item.imagesList +
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
    item.stock +
    "Disponible(s)</p>" +
    "<p>•</p>" +
    '<p class="mx-3 mb-0">$' +
    item.price +
    "</p>" +
    "</div>" +
    "</td>" +
    '<td class="button_hide fw-bolder edit_btn">' +
    '<a href="./crear-producto.html" class="text-primary-emphasis d-none d-lg-table-cell">Editar</a>' +
    "</td>" +
    '<td class="d-none d-sm-table-cell">' +
    item.stock +
    " Disponibles(s)</td>" +
    '<td class="d-none d-sm-table-cell">' +
    "$" +
    item.price +
    "</td>" +
    '<td class="button_hide">' +
    item.creationDate +
    "</td>" +
    "</tr>";

  const itemsContainer = document.getElementById("list-items");
  itemsContainer.innerHTML += itemHTML;
} 

function loadProductController() {
  for (var i = 0, size = items.length; i < size; i++) {
    const item = items[i];
    addItemCard(item);
  }
}


// Cargar productos desde la API Java y renderizarlos
async function renderProduct() {
  await loadItemsFromAPI();
  loadProductController();
}

// sampleDataLocalStorage();
// productsController.loadItemsFromLocalStorage();
// loadProductController();

renderProduct();

