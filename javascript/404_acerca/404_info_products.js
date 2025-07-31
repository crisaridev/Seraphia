const URLBASE = 'http://localhost:8080/api';
//js de 14 de julio para filtro
document.addEventListener('DOMContentLoaded', function () {
	const filterToggleButton = document.getElementById('filterToggleButton');
	const filterPanel = document.getElementById('filterPanel');
	const productsContainer = document.getElementById('productsContainer'); //checar que parte es me falta checar pero ya sirve el filtro
	const sizeCheckboxes = document.querySelectorAll('input[data-filter-type="size"]');
	const typeCheckboxes = document.querySelectorAll('input[data-filter-type="type"]');
	const colorCheckboxes = document.querySelectorAll('input[data-filter-type="color"]');
	const applyFilterButton = document.getElementById('appliedfilter');
	const clearFilterButton = document.getElementById('clearFilterButton');
	const allProducts = document.querySelectorAll('.product-item'); // Selecciona todos los elementos de producto
	const noProductMessage = document.getElementById('noProductMessage'); //mensaje de "no disponible"

	// Alternar la visibilidad del panel de filtro para pantallas pequeñas
	if (filterToggleButton && filterPanel) {
		filterToggleButton.addEventListener('click', function () {
			filterPanel.classList.toggle('d-none');
			filterPanel.classList.toggle('d-md-block'); // visible en pantallas medianas y grandes
		});
	}

	// Función para aplicar filtros
	function applyFilters() {
		const selectedSizes = Array.from(sizeCheckboxes)
			.filter(checkbox => checkbox.checked)
			.map(checkbox => checkbox.value.toLowerCase());

		const selectedTypes = Array.from(typeCheckboxes)
			.filter(checkbox => checkbox.checked)
			.map(checkbox => checkbox.value.toLowerCase());

		const selectedColors = Array.from(colorCheckboxes)
			.filter(checkbox => checkbox.checked)
			.map(checkbox => checkbox.value.toLowerCase());

		let visibleCount = 0; //contador para saber cuantos productos quedan visibles

		allProducts.forEach(product => {
			const productSize = product.dataset.size ? product.dataset.size.toLowerCase() : '';
			const productType = product.dataset.type ? product.dataset.type.toLowerCase() : '';
			const productColor = product.dataset.color ? product.dataset.color.toLowerCase() : '';

			// Verifica si el producto coincide con los filtros seleccionados
			// Si no se selecciona ningún filtro de talla, todos los productos de cualquier talla coinciden.
			const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(productSize);
			// Si no se selecciona ningún filtro de tipo, todos los productos de cualquier tipo coinciden.
			const matchesType = selectedTypes.length === 0 || selectedTypes.includes(productType);
			const matchesColor = selectedColors.length === 0 || selectedColors.includes(productColor);

			if (matchesSize && matchesType && matchesColor) {
				product.style.display = 'block'; // Muestra el producto
				visibleCount++;
			} else {
				product.style.display = 'none'; // Oculta el producto
			}
		});

		//si no hay productos visibles, mostrar mensaje
		if (noProductMessage) {
			if (visibleCount === 0) {
				noProductMessage.style.display = 'block';
			} else {
				noProductMessage.style.display = 'none';
			}
		}
	}

	// Escucha el evento click del botón "Aplicar"
	if (applyFilterButton) {
		applyFilterButton.addEventListener('click', applyFilters);
	}

	// Escucha el evento click del botón "Borrar"
	if (clearFilterButton) {
		clearFilterButton.addEventListener('click', function () {
			// Desmarca todas las casillas de verificación
			sizeCheckboxes.forEach(checkbox => (checkbox.checked = false));
			typeCheckboxes.forEach(checkbox => (checkbox.checked = false));
			colorCheckboxes.forEach(checkbox => (checkbox.checked = false));
			// Muestra todos los productos
			allProducts.forEach(product => (product.style.display = 'block'));
			//oculta mensaje de "producto no disponible"
			if (noProductMessage) {
				noProductMessage.style.display = 'none';
			}
		});
	}
});

//js de productos este no se deja pero no lo borres bc aún no se a donde se va a mover

// --- 1. DATOS DE PRODUCTOS DE MUESTRA ---
// definir de donde vienen los datos AAAAAA de la base de datos
const allProducts = [
	{
		id: '1',
		name: 'Blusa Amarilla con Bordado Floral',
		img: '/assets/images/404/product/1.jpg',
		price: 400.0,
		description:
			'Blusa ligera con bordado artesanal de motivos florales tradicionales. Con manga corto, cuello redondo y delicados olanes en mangas y pecho. Una prenda que celebra la herencia textil mexicana a través del color y los detalles hechos a mano.',
		sizes: ['L'],
		type: 'Blusa',
	},
	{
		id: '2',
		name: 'Blusa Azul con Bordado Huipil',
		img: '/assets/images/404/product/2.jpg',
		price: 450.0,
		description:
			'Blusa de manga corta confeccionada en tela azul con líneas verticales blancas. El detalle principal es una aplicación de bordado estilo huipil en el pecho, que aporta carácter y valor cultural. Una prenda fresca con un diseño contemporáneo.',
		sizes: ['M'],
		type: 'Blusa',
	},
	{
		id: '3',
		name: 'Blusa Azul con Bordado de Peces',
		img: '/assets/images/404/product/3.jpg',
		price: 450.0,
		description:
			'Blusa azul de silueta amplia, con cuello redondo y manga corta decoradas con tela de lunares en azul claro. El diseño destaca por un bordado artesanal de figuras de peces en el frente, complementado con retazos de tela estampada que aportan textura y un toque creativo.',
		sizes: ['M'],
		type: 'Blusa',
	},
	{
		id: '4',
		name: 'Blusa tipo top diseño de triangulos',
		img: '/assets/images/404/product/4.jpg',
		price: 400.0,
		description:
			'Top corto confeccionado en algodón ligero con un llamativo patrón de líneas en zigzag color azul. Su diseño halter incorpora un cordón que se anuda detrás del cuello, dejando la espalda al descubierto para un acabado fresco y elegante. Una prenda ideal para climas cálidos.',
		sizes: ['S'],
		type: 'Blusa',
	},
	{
		id: '5',
		name: 'Blusa corta sin mangas color rojo',
		img: '/assets/images/404/product/5.jpg',
		price: 450.0,
		description:
			'Blusa ligera confeccionada en algodón color rojo, perfecta para climas cálidos. Su diseño sin mangas y espalda cruzada estiliza la silueta y brinda libertad de movimiento. Bordado artesanal en forma de pluma, hecho a mano con hilos multicolor, que aporta un toque único y artístico.',
		sizes: ['M'],
		type: 'Blusa',
	},
	{
		id: '6',
		name: 'Blusa abierta estilo kimono',
		img: '/assets/images/404/product/6.jpg',
		price: 500.0,
		description:
			'Blusa abierta de inspiración kimono, confeccionada en algodón color beige. De corte relajado y manga corta, esta prenda destaca por sus acabados delicados: un fino encaje blanco aplicado a mano en las mangas y el ruedo, que aporta un toque artesanal y femenino.',
		sizes: ['L'],
		type: 'Blusa',
	},
	{
		id: '7',
		name: 'Blusa rosa con espalda descubierta',
		img: '/assets/images/404/product/7.jpg',
		price: 400.0,
		description:
			'Blusa corta confeccionada en algodón color rosa. Presenta un diseño sin mangas con espalda completamente descubierta, que se ajusta en la parte posterior del cuello. El frente incorpora un delicado bordado en forma de ondas.',
		sizes: ['M'],
		type: 'Blusa',
	},
	{
		id: '8',
		name: 'Blusa Negra Asimétrica con Encaje Floral',
		img: '/assets/images/404/product/8.jpg',
		price: 400.0,
		description:
			'"Blusa negra de un solo hombro, confeccionada en algodón ligero con delicado encaje floral calado. Se anuda en el hombro con un lazo de la misma tela. El borde inferior presenta un acabado ondulado que añade movimiento y realza el diseño de la prenda.',
		sizes: ['M'],
		type: 'Blusa',
	},
	{
		id: '9',
		name: 'Blusa estilo vaquero',
		img: '/assets/images/404/product/9.jpg',
		price: 500.0,
		description:
			'Blusa de inspiración vaquera confeccionada en algodón color beige. Presenta manga corta y corte estructurado. El diseño incorpora un bordado artesanal en el pecho y un bordado distintivo en la parte alta de la espalda: una serpiente elaborada a mano con gran detalle. Una prenda que combina tradición textil con un estilo auténtico y atemporal.',
		sizes: ['L'],
		type: 'Blusa',
	},
	{
		id: '10',
		name: 'Blusa negra con bordado de crochet',
		img: '/assets/images/404/product/10.jpg',
		price: 450.0,
		description:
			'Blusa de corte amplio confeccionada en suave algodón negro, ideal para un estilo relajado y contemporáneo. El diseño presenta cuello redondo y destaca por un delicado bordado de flores a crochet en el pecho, que aporta un toque artesanal y femenino.',
		sizes: ['M'],
		type: 'Blusa',
	},
];

/*
Estructura a seguir. Reemplazar informacion dinamica con informacion del back
<div class="col product-item" data-size="L" data-type="blusa" data-color="blanco">
    <div class="product-card">
        <img src="/assets/images/404/product/9.jpg" class="img-fluid" alt="Blusa estilo vaquero" />
        <div class="product-info">
            <p class="product-name">Blusa estilo vaquero</p>
            <p class="product-price">$500.00</p>
            <div class="product-actions">
                <a href="/detalles_del_producto/index.html" class="btn-conozca-mas">Conozca más</a>
                <a href="/html/cart_shopping.html" class="btn-shop">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                        <path
                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                        />
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>
*/

const createAndAppendProductCard = product => {
	const formatData = product => {
		console.log(product);
		const url = './detalles_del_producto.html?id=' + product.id;
		const size = product.size.sizeName;
		const type = product.category.categoryName;
		const color = product.color.colorName;
		const image = product.imagesList[0].imageUrl;
		const alt = product.description;
		const name = product.name;
		const price = product.price.toFixed(2);

		let localSize = '';
		if (size === 'Chica') {
			localSize = 'S';
		} else if (size === 'Mediana') {
			localSize = 'M';
		} else if (size === 'Grande') {
			localSize = 'L';
		}

		return [url, localSize, type, color, image, alt, name, price];
	};

	[url, localSize, type, color, image, alt, name, price] = formatData(product);

	const AgregarACarritoIconPath = document.createElement('path');
	AgregarACarritoIconPath.setAttribute(
		'd',
		'M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z',
	);

	const AgregarACarritoIconContainer = document.createElement('svg');
	AgregarACarritoIconContainer.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	AgregarACarritoIconContainer.setAttribute('width', '16');
	AgregarACarritoIconContainer.setAttribute('height', '16');
	AgregarACarritoIconContainer.setAttribute('fill', 'currentColor');
	AgregarACarritoIconContainer.setAttribute('viewBox', '0 0 16 16');
	AgregarACarritoIconContainer.classList.add('bi', 'bi-cart-fill');
	AgregarACarritoIconContainer.appendChild(AgregarACarritoIconPath);

	//Agregar event listener para agregar a carrito
	const productAgregarACarrito = document.createElement('button');
	productAgregarACarrito.classList.add('btn-shop');
	productAgregarACarrito.appendChild(AgregarACarritoIconContainer);

	const productConozcaMas = document.createElement('a');
	//Modificar con back
	productConozcaMas.setAttribute('href', url);
	productConozcaMas.classList.add('btn-conozca-mas');
	productConozcaMas.textContent = 'Conozca más';

	const productActions = document.createElement('div');
	productActions.classList.add('product-actions');
	productActions.appendChild(productConozcaMas);
	productActions.appendChild(productAgregarACarrito);

	const productPrice = document.createElement('p');
	productPrice.classList.add('product-price');
	//Modificar con back
	productPrice.textContent = '$' + price;

	const productName = document.createElement('p');
	productName.classList.add('product-name');
	//Modificar con back
	productName.textContent = name;

	const productInfo = document.createElement('div');
	productInfo.classList.add('product-info');
	productInfo.appendChild(productName);
	productInfo.appendChild(productPrice);
	productInfo.appendChild(productActions);

	const productImage = document.createElement('img');
	//Modificar con back
	productImage.setAttribute('src', image);
	productImage.setAttribute('alt', alt);
	productImage.classList.add('img-fluid');

	const productCard = document.createElement('div');
	productCard.classList.add('product-card');
	productCard.appendChild(productImage);
	productCard.appendChild(productInfo);

	const productItem = document.createElement('div');
	//Modificar con back
	productItem.setAttribute('data-size', localSize);
	//Modificar con back
	productItem.setAttribute('data-type', type);
	//Modificar con back
	productItem.setAttribute('data-color', color);
	productItem.classList.add('col', 'product-item');
	productItem.append(productCard);

	productsContainer.appendChild(productItem);
	// console.log(productItem);
};

const getProducts = async () => {
	try {
		const responseProduct = await fetch(`${URLBASE}/products/all/products-with-stock`);
		if (!responseProduct.ok) throw new Error(`No se encontro el producto solicitado`);
		const responseProductJson = await responseProduct.json();
		// console.log(responseProductJson);
		responseProductJson.forEach(product => createAndAppendProductCard(product));
	} catch (error) {
		console.log('Ocurrio un error: ' + error);
	}
};

getProducts();
