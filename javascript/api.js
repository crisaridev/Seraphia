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

export const deleteProductById = async productId => {
	const responseBasicData = await fetch(`${URLBASE}/products/${productId}`, {
		method: 'DELETE',
	});
	const responseBasicDataJson = await responseBasicData.json();
	return responseBasicDataJson;
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

// ! REGISTRO

export const registerUser = async usuario => {
	try {
		const response = await fetch(`${URLBASE}/users/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(usuario),
		});
		const data = await response.json();

		if (!response.ok) {
			const msg = typeof data === 'string' ? data : data.message || JSON.stringify(data);
			throw new Error(msg);
		}

		return data;
	} catch (error) {
		throw error;
	}
};

// ! LOGIN

export const loginUser = async (email, password) => {
	try {
		const response = await fetch(`${URLBASE}/users/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		const data = await response.json();

		if (!response.ok) {
			const mensaje = data.message || 'Error en el inicio de sesión.';
			throw new Error(mensaje);
		}

		return data;
	} catch (error) {
		throw error;
	}
};

// ! CARRITO

// Obtener carrito por userId o crearlo si no existe
export const getOrCreateCart = async userId => {
	const res = await fetch(`${URLBASE}/carts/user/${userId}`);
	if (res.ok) return await res.json();

	const createRes = await fetch(`${URLBASE}/carts/create/${userId}`, { method: 'POST' });
	if (!createRes.ok) throw new Error('No se pudo crear el carrito.');
	return await createRes.json();
};

// Obtener items del carrito por userId
export const getCartItems = async userId => {
	const res = await fetch(`${URLBASE}/cart-items/user/${userId}`);
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Error ${res.status}: ${text}`);
	}
	return await res.json();
};

// Eliminar item del carrito por itemId
export const deleteCartItem = async itemId => {
	const res = await fetch(`${URLBASE}/cart-items/${itemId}`, { method: 'DELETE' });
	if (!res.ok) throw new Error('No se pudo eliminar el producto.');
	return true;
};

// Agregar item al carrito- Lo hizo Jennifer
//export const addItemToCart = async item => {
//	const res = await fetch(`${URLBASE}/cart-items`, {
//		method: 'POST',
//		headers: { 'Content-Type': 'application/json' },
//		body: JSON.stringify(item)
//	});
//
//	if (!res.ok) {
//		const text = await res.text();
//		throw new Error(`Error ${res.status}: ${text}`);
//	}
//
//	return await res.json();
//};


// Function for api products admin

export const getProductsAdmin = async () => {
	const response = await fetch(`${URLBASE}/products`);
  const storageData = await response.json();
	return storageData;
}

export const getOrdersAdmin = async () => {
	const response = await fetch(`${URLBASE}/orders`);
  const storageData = await response.json();
	return storageData;
}

export const getOrderById = async (orderId) => {
	const response = await fetch(`${URLBASE}/orders/${orderId}`);
  const orderDetail = await response.json();
	return orderDetail;
}