
class ProductsController {
  constructor(currentId = 0) {
    this.items = [];
    this.currentId = currentId;
  }
  
  addItem(name, img, price, stock, createdAt) {
    const product = {
    id: this.currentId++,
    name,
    img,
    price,
    stock,
    createdAt,
  }
    this.items.push(product);
  }

loadItemsFromLocalStorage() {
  const storageItems = localStorage.getItem("items")
  if (storageItems) {
    const items = JSON.parse(storageItems)
    for (var i = 0, size = items.length; i < size; i++) {
      const item = items[i];
      this.items.push(item);
    }
  }
}

// Nuevo: Cargar productos desde la API Java
async loadItemsFromAPI() {
  const API = 'http://localhost:8080/api/products'; // Cambia esto por la URL real
  try {
    const response = await fetch(API);
    const storageData = await response.json();
    this.items = [];
    storageData.forEach(product => {
      let productCategory = product.category;
      let productSize = product.size;
      let productColor = product.color;
      let productImg = product.imagesList;
      this.items.push({
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
    this.items = [];
  }
  console.log(this.items)

}
}



const testItems = new ProductsController();
const probando = testItems.addItem("Vestido rosa", "Vestido de color rosa", "/enlace", "03/07/23");
console.log(testItems.items);

console.log("Este js funciona")

testItems.loadItemsFromAPI();
