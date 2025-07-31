
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
  const API_URL = 'https://URL_DE_TU_API_JAVA/api/productos'; // Cambia esto por la URL real
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    this.items = [];
    data.forEach(producto => {
      // Ajusta los nombres de los campos según la respuesta de tu API
      this.items.push({
        id: producto.id ?? null,
        name: producto.nombre || 'Nombre',
        img: producto.imagenUrl || '/ruta/por/defecto.png',
        price: producto.precio ?? 0,
        stock: producto.inventario ?? 0,
        createdAt: producto.createdAt || null
      });
    });
  } catch (error) {
    console.error('Error al cargar productos desde la API:', error);
    this.items = [];
  }
}
}


const testItems = new ProductsController();
const probando = testItems.addItem("Vestido rosa", "Vestido de color rosa", "/enlace", "03/07/23");
console.log(testItems.items);

console.log("Este js funciona")