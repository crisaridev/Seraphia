// Items
  class orderController {
  constructor(currentId = 0) {
    this.items = [];
    this.currentId = currentId;
  }
  
  addItem(userfName, productName, total, img, createdAt) {
    const order = {
    id: this.currentId++,
    total,
    img,
    userfName,
    productName,
    createdAt,
  }
    this.items.push(order);
  }

loadItemsFromLocalStorage() {
  const storageOrders = localStorage.getItem("orders")
  if (storageOrders) {
    const orders = JSON.parse(storageOrders)
    for (var i = 0, size = orders.length; i < size; i++) {
      const order = orders[i];
      this.items.push(order);
    }
  }
}
}
