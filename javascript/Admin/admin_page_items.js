

const productsController = new ProductsController(0);

function addItemCard(item){
    const itemHTML =     
  '<div class="card product border-0">\n' +
  '  <div class="row g-0 align-items-center">\n' +
  '    <div class="col-2 d-flex justify-content-center justify-content-lg-start mx-lg-3 align-items-center py-3 product-img">\n' +
  '      <input type="checkbox" class="checkbox align-items-center mx-1 mx-lg-3">\n' +
  '      <img src="'+item.img+'" alt="'+item.name+'">\n' +
  '    </div>\n' +
  '    <div class="col-xl-3 col-md-5 col-4 text-nowrap product_name">\n' +
  '      <h6 class="card-title mb-0 ms-lg-3 m-0 product_name_label text-black fw-bold mx-1">'+item.name+'</h6>\n' +
  '    </div>\n' +
  '    <div class="col d-flex flex-row align-items-center me-sm-0 me-1 justify-content-center text-nowrap row">\n' +
  '      <div class="col-lg text-center p-0 d-none d-xl-block">\n' +
  '        <button class="btn btn-primary btn-sm bg-transparent border-0 text-secondary fw-bolder fs-5 edit_button text-decoration-underline justify-content-center">Editar</button>\n' +
  '      </div>\n' +
  '      <div class="col-6 col-lg text-center p-0">\n' +
  '        <span class="text-dark product_info d-flex align-items-center justify-content-center">'+item.stock+'</span>\n' +
  '      </div>\n' +
  '      <div class="col-6 col-lg text-center p-0 d-flex align-items-center justify-content-center">\n' +
  '        <span class="text-dark product_info">$'+item.price+'</span>\n' +
  '      </div>\n' +
  '      <div class="col-lg text-center p-0 d-none d-xl-block">\n' +
  '        <span class="text-dark date_label product_info justify-content-center">'+item.createdAt+'</span>\n' +
  '      </div>\n' +
  '    </div>\n' +
  '  </div>\n' +
  '</div>\n' +
  '<hr class="m-0 mx-auto product_hr">\n';

  const itemsContainer = document.getElementById("list-items");
  itemsContainer.innerHTML += itemHTML;
}


function sampleDataLocalStorage() {
  if(!localStorage.getItem("items")) {
    const sampleProducts = [{
        id: '1',
        name: 'Blusa Amarilla con Bordado Floral',
        img: '../assets/images/Products/1.jpg',
        price: 400.00,
        description: 'Blusa ligera con bordado artesanal de motivos florales tradicionales. Con manga corto, cuello redondo y delicados olanes en mangas y pecho. Una prenda que celebra la herencia textil mexicana a través del color y los detalles hechos a mano.',
        sizes: ['L'],
        type: 'Blusa',
        stock: 'Disponible',
        createdAt: '05/07/2025'
    },
    {
        id: '2',
        name: 'Blusa Azul con Bordado Huipil',
        img: '../assets//images/Products/2.jpg',
        price: 450.00,
        description: 'Blusa de manga corta confeccionada en tela azul con líneas verticales blancas. El detalle principal es una aplicación de bordado estilo huipil en el pecho, que aporta carácter y valor cultural. Una prenda fresca con un diseño contemporáneo.',
        sizes: ['M'],
        type: 'Blusa',
        stock: 'Disponible',
        createdAt: '05/07/2025'
    },
    {
        id: '3',
        name: 'Blusa Azul con Bordado de Peces',
        img: '../assets//images/Products/3.jpg',
        price: 450.00,
        description: 'Blusa azul de silueta amplia, con cuello redondo y manga corta decoradas con tela de lunares en azul claro. El diseño destaca por un bordado artesanal de figuras de peces en el frente, complementado con retazos de tela estampada que aportan textura y un toque creativo.',
        sizes: ['M'],
        type: 'Blusa',
        stock: 'Disponible',
        createdAt: '05/07/2025'
    },
    {
        id: '4',
        name: 'Blusa tipo top diseño de triangulos',
        img: '../assets//images/Products/4.jpg',
        price: 400.00,
        description: 'Top corto confeccionado en algodón ligero con un llamativo patrón de líneas en zigzag color azul. Su diseño halter incorpora un cordón que se anuda detrás del cuello, dejando la espalda al descubierto para un acabado fresco y elegante. Una prenda ideal para climas cálidos.',
        sizes: ['S'],
        type: 'Blusa',
        stock: 'Disponible',
        createdAt: '05/07/2025'
    },
    {
        id: '5',
        name: 'Blusa corta sin mangas color rojo',
        img: '../assets//images/Products/5.jpg',
        price: 450.00,
        description: 'Blusa ligera confeccionada en algodón color rojo, perfecta para climas cálidos. Su diseño sin mangas y espalda cruzada estiliza la silueta y brinda libertad de movimiento. Bordado artesanal en forma de pluma, hecho a mano con hilos multicolor, que aporta un toque único y artístico.',
        sizes: ['M'],
        type: 'Blusa',
        stock: 'Disponible',
        createdAt: '05/07/2025'
    },
    {
        id: '6',
        name: 'Blusa abierta estilo kimono',
        img: '../assets//images/Products/6.jpg',
        price: 500.00,
        description: 'Blusa abierta de inspiración kimono, confeccionada en algodón color beige. De corte relajado y manga corta, esta prenda destaca por sus acabados delicados: un fino encaje blanco aplicado a mano en las mangas y el ruedo, que aporta un toque artesanal y femenino.',
        sizes: ['L'],
        type: 'Blusa',
        stock: 'Disponible',
        createdAt: '05/07/2025'
    },
    {
        id: '7',
        name: 'Blusa rosa con espalda descubierta',
        img: '../assets//images/Products/7.jpg',
        price: 400.00,
        description: 'Blusa corta confeccionada en algodón color rosa. Presenta un diseño sin mangas con espalda completamente descubierta, que se ajusta en la parte posterior del cuello. El frente incorpora un delicado bordado en forma de ondas.',
        sizes: ['M'],
        type: 'Blusa',
        stock: 'Disponible',
        createdAt: '05/07/2025'
    },
    {
        id: '8',
        name: 'Blusa Negra Asimétrica con Encaje Floral',
        img: '../assets//images/Products/8.jpg',
        price: 400.00,
        description: '"Blusa negra de un solo hombro, confeccionada en algodón ligero con delicado encaje floral calado. Se anuda en el hombro con un lazo de la misma tela. El borde inferior presenta un acabado ondulado que añade movimiento y realza el diseño de la prenda.',
        sizes: ['M'],
        type: 'Blusa',
        stock: 'Disponible',
        createdAt: '05/07/2025'
    },
    {
        id: '9',
        name: 'Blusa estilo vaquero',
        img: '../assets//images/Products/9.jpg',
        price: 500.00,
        description: 'Blusa de inspiración vaquera confeccionada en algodón color beige. Presenta manga corta y corte estructurado. El diseño incorpora un bordado artesanal en el pecho y un bordado distintivo en la parte alta de la espalda: una serpiente elaborada a mano con gran detalle. Una prenda que combina tradición textil con un estilo auténtico y atemporal.',
        sizes: ['L'],
        type: 'Blusa',
        stock: 'Disponible',
        createdAt: '05/07/2025',
    },
    {
        id: '10',
        name: 'Blusa negra con bordado de crochet',
        img: '../assets//images/Products/10.jpg',
        price: 450.00,
        description: 'Blusa de corte amplio confeccionada en suave algodón negro, ideal para un estilo relajado y contemporáneo. El diseño presenta cuello redondo y destaca por un delicado bordado de flores a crochet en el pecho, que aporta un toque artesanal y femenino.',
        sizes: ['M'],
        type: 'Blusa',
        stock: 'Disponible',
        createdAt: '05/07/2025',

    },]
  localStorage.setItem("items", JSON.stringify(sampleProducts));
  }
}

function loadProductController() {
    for(var i = 0, size = productsController.items.length; i < size ; i++) {
      const item = productsController.items[i];
      addItemCard(item);
    }
}

sampleDataLocalStorage();
productsController.loadItemsFromLocalStorage();
loadProductController();