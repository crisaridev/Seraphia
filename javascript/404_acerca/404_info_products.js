import { getAllProductsWithStock } from '../api.js';

const noProductCard = document.querySelector('#no-product-card');
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
		const url = './detalles-del-producto.html?id=' + product.id;
		const size = product.size.sizeName;
		const type = product.category.categoryName;
		const color = product.color.colorName;
		const alt = product.description;
		const name = product.name;
		const price = product.price.toFixed(2);
		let image = '';
		for (const imageElement of product.imagesList) {
			if (imageElement.imageOrder === 1) {
				image = imageElement.imageUrl;
			}
		}

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

	const [url, localSize, type, color, image, alt, name, price] = formatData(product);

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
	//Informacion del back
	productConozcaMas.setAttribute('href', url);
	productConozcaMas.classList.add('btn-conozca-mas');
	productConozcaMas.textContent = 'Conozca más';

	const productActions = document.createElement('div');
	productActions.classList.add('product-actions');
	productActions.appendChild(productConozcaMas);
	productActions.appendChild(productAgregarACarrito);

	const productPrice = document.createElement('p');
	productPrice.classList.add('product-price');
	//Informacion del back
	productPrice.textContent = '$' + price;

	const productName = document.createElement('p');
	productName.classList.add('product-name');
	//Informacion del back
	productName.textContent = name;

	const productInfo = document.createElement('div');
	productInfo.classList.add('product-info');
	productInfo.appendChild(productName);
	productInfo.appendChild(productPrice);
	productInfo.appendChild(productActions);

	const productImage = document.createElement('img');
	//Informacion del back
	productImage.setAttribute('src', image);
	productImage.setAttribute('alt', alt);
	productImage.classList.add('img-fluid');

	const productCard = document.createElement('div');
	productCard.classList.add('product-card');
	productCard.appendChild(productImage);
	productCard.appendChild(productInfo);

	const productItem = document.createElement('div');
	//Informacion del back
	productItem.setAttribute('data-size', localSize);
	//Informacion del back
	productItem.setAttribute('data-type', type);
	//Informacion del back
	productItem.setAttribute('data-color', color);
	productItem.classList.add('col', 'product-item');
	productItem.append(productCard);

	productsContainer.appendChild(productItem);
};

const getProducts = async () => {
	try {
		const responseProductsWithStock = await getAllProductsWithStock();
		if (responseProductsWithStock.length == 0) noProductCard.classList.remove('d-none');
		responseProductsWithStock.forEach(product => createAndAppendProductCard(product));
	} catch (error) {
		noProductCard.classList.remove('d-none');
		console.log('Ocurrio un error: ' + error);
	}
};

getProducts();
