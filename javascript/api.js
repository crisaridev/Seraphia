const URLBASE = 'http://localhost:8080/api';

//get product by id
export const getProductById = async productId => {
	const responseProduct = await fetch(`${URLBASE}/products/${productId}`);
	const responseProductData = await responseProduct.json();
	return responseProductData;
};

//get all products that have stock
export const getAllProductsWithStock = async () => {
	const responseProducts = await fetch(`${URLBASE}/products/all/products-with-stock`);
	const responseProductsData = await responseProducts.json();
	return responseProductsData;
};

//add product basic data
export const addProductBasicData = async productBasicData => {
	const responseBasicData = await fetch(`${URLBASE}/products`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(productBasicData),
	});
	const responseBasicDataJson = await responseBasicData.json();
	return responseBasicDataJson.id;
};

//add product color, size and category (foreign keys)
export const addProductColorSizeCategory = async (productId, productColorSizeCategory) => {
	const responseColorSizeCategory = await fetch(`${URLBASE}/products/${productId}/add-color-size-category`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(productColorSizeCategory),
	});
	return responseColorSizeCategory;
};

//add product images (foreign key)
export const addProductImages = async (productId, images) => {
	const responseImages = await fetch(`${URLBASE}/products/${productId}/add-images`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(images),
	});
	return responseImages;
};

//update product basic data by id
export const updateProductById = async (productId, productBasicData) => {
	const responseBasicData = await fetch(`${URLBASE}/products/${productId}/change-product`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(productBasicData),
	});
	const responseBasicDataJson = await responseBasicData.json();
	return responseBasicDataJson.id;
};

/*
cartItem contiene
{
	"cartId": 1,
	"productId": 1
}
*/
export const addItemToCart = async cartItem => {
	const responseItem = await fetch(`${URLBASE}/cart-items`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(cartItem),
	});
	const responseItemJson = await responseItem.json();
	return responseItemJson;
};
