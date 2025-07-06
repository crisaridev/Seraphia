
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
}


const testItems = new ProductsController();
const probando = testItems.addItem("Vestido rosa", "Vestido de color rosa", "/enlace", "03/07/23");
console.log(testItems.items);

console.log("Este js funciona")