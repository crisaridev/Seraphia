// Items
  class userController {
  constructor(currentId = 0) {
    this.items = [];
    this.currentId = currentId;
  }
  
  addItem(userName, productName, total, img, createdAt) {
    const user = {
    id: this.currentId++,
    total,
    img,
    userName,
    productName,
    createdAt,
  }
    this.items.push();
  }

loadItemsFromLocalStorage() {
  const storageUsers = localStorage.getItem("users")
  if (storageUsers) {
    const users = JSON.parse(storageUsers)
    for (var i = 0, size = users.length; i < size; i++) {
      const user = users[i];
      this.items.push(user);
    }
  }
}
}