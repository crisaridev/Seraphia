//fetch functions
import { addProductBasicData, addProductColorSizeCategory, addProductImages, getProductById, updateProductById } from './api.js';
const submitBtn = document.querySelector('.submit-btn');

/*
imgTracker is used to store the images and its positions. Images are stored as a file object
This is necessary because if you upload 2 images, one at a time, the first one will be deleted from the form input type=file that holds the images
If the position of an image is updated or an image is deleted from the html, those changes will be reflected on the imgTracker variable as well
*/
const imgTracker = [];

//Variable used to store the product if retrieved from the url, used to fetch the api
let urlProductId = null;

/*
Initialize swiper carousel
*/
var swiper = new Swiper('.mySwiper', {
	slidesPerView: 1,
	breakpoints: {
		650: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		1000: {
			slidesPerView: 3,
			spaceBetween: 50,
		},
	},
	spaceBetween: 30,
	freeMode: true,
	pagination: {
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

/*
-getCardPositions
Get all the positions that are being used by the cards inside the swiper, each card use 1 and it is linked to the 
number chosen in the select element. No two cards can have the same position at the same time
*/
const getCardPositions = () => {
	const cardSelectElements = document.querySelectorAll('.card-select');
	const cardPositions = [];
	cardSelectElements.forEach(cardSelectElement => cardPositions.push(cardSelectElement.value));
	return [...cardPositions];
};

/*
-createSwiperCard:
Creates a new card and appends it to the swiper. If the img is a file, create an URL with the URL API from JS
Updates the globar variable imgTracker

	-updateCardPosition:
	When the position of a card changes, find the position it is going to, if that position is already taken by another card then
	switch positions between these two cards and update the imgTracker
	If that position is not taken, update the imgTracker to reflect this change

		-switchImgTrackerPos:
		Exchange the position of two images in the imgTracker variable
		This function is called when one card is switching to a position that is being used by another card

		-updateImgTracker:
		Update the position of one image in the imgTracker variable
		This function is called when one card is switching to a position that is not being used by another card

		-updateDOMCardPos:
		When we change the position of a card manually and that position is already being used by another card, we switch the
		position of the 2nd card in the HTML to the position that the card #1 previously had

-updateImgTracker:
Adds or deletes images and its position from the imgTracker variable

-deleteCard:
Deletes the selected card from the DOM calls the function updateImgTracker to delete the card img from the imgTracker

-createAndAppendCard:
Creates a card, fills its content and attaches eventlisteners

	Structure:
	Replicate this card structure and append it to the html.
	<div class="swiper-slide">
		<div class="card">
			<img src="..." class="card-img" alt="Imagen del carrusel" />
			<div class="card-footer">
				<select class="form-select card-select" name="card-1" aria-label="Card Selector" required>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
				</select>
				<button type="button" class="btn btn-warning card-btn">Borrar</button>
			</div>
		</div>
	</div>

*/
const createSwiperCard = (cardNumber, cardPos, img) => {
	const updateCardPosition = cardSelectEvent => {
		const switchImgTrackerPos = (currentPositionIndex, switchWithPositionIndex) => {
			const temporalVariable = imgTracker[currentPositionIndex].position;
			imgTracker[currentPositionIndex].position = imgTracker[switchWithPositionIndex].position;
			imgTracker[switchWithPositionIndex].position = temporalVariable;
		};

		const updateImgTrackerPos = (currentPositionIndex, newPosition) => {
			imgTracker[currentPositionIndex].position = newPosition;
		};

		const updateDOMCardPos = (positionIndex, positionValue) => {
			const cardElements = document.querySelectorAll('.card-select');
			cardElements[positionIndex].value = positionValue;
		};

		const getPositionChangeIndex = cardsPosition => {
			for (let i = 0; i < cardsPosition.length; i++) {
				if (cardsPosition[i] != imgTrackerPositions[i]) {
					return i;
				}
			}
		};

		const cardsPosition = getCardPositions();
		const duplicatedPos = cardsPosition.filter((selectPos, index) => cardsPosition.indexOf(selectPos) !== index);
		const newPosition = Number(cardSelectEvent.target.value);
		const imgTrackerPositions = imgTracker.map(imgData => imgData.position);
		let positionChangeIndex = getPositionChangeIndex(cardsPosition, imgTrackerPositions);
		if (duplicatedPos.length > 0) {
			let outdatedPositionIndex = imgTrackerPositions.indexOf(newPosition);
			updateDOMCardPos(outdatedPositionIndex, imgTrackerPositions[positionChangeIndex]);
			switchImgTrackerPos(positionChangeIndex, outdatedPositionIndex);
		} else {
			updateImgTrackerPos(positionChangeIndex, newPosition);
		}
	};

	const toBase64 = imgData => {
		const reader = new FileReader();
		reader.onloadend = () => {
			// Use a regex to remove data url part
			// const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
			const base64String = reader.result;
			// console.log(base64String);
			imgTracker.push({ position: imgData.position, img: base64String });
			// console.log(imgTracker);
			// Logs wL2dvYWwgbW9yZ...
		};

		base64Img = reader.readAsDataURL(imgData.img);
	};

	const updateImgTracker = (action, imgData) => {
		if (action === 'add') {
			if (typeof imgData.img == 'string') {
				imgTracker.push(imgData);
			} else {
				toBase64(imgData);
			}
		} else if (action === 'delete') {
			const toDeleteIndex = imgTracker.findIndex(trackerData => trackerData.position == imgData.position);
			imgTracker.splice(toDeleteIndex, 1);
		}
	};

	const deleteCard = cardButton => {
		const cardPos = cardButton.target.previousSibling.value;
		updateImgTracker('delete', { position: cardPos });
		cardButton.target.closest('.swiper-slide').remove();
		swiper.update();
	};

	const createAndAppendCard = (cardNumber, position, url) => {
		const cardSelect = document.createElement('select');
		for (let i = 1; i <= 6; i++) {
			const selectOptions = document.createElement('option');
			selectOptions.value = i;
			selectOptions.textContent = i;
			position == i ? (selectOptions.selected = true) : (selectOptions.selected = false);
			cardSelect.appendChild(selectOptions);
		}

		cardSelect.classList.add('form-select', 'card-select');
		cardNumber ? cardSelect.setAttribute('name', `card-${cardNumber}`) : cardSelect.setAttribute('name', `card-${position}`);
		cardSelect.setAttribute('aria-label', 'Card Selector');
		cardSelect.setAttribute('required', '');
		cardSelect.addEventListener('change', updateCardPosition);

		const cardButton = document.createElement('button');
		cardButton.classList.add('btn', 'btn-warning', 'card-btn');
		cardButton.setAttribute('type', 'button');
		cardButton.textContent = 'Borrar';
		cardButton.addEventListener('click', deleteCard);

		const cardFooter = document.createElement('div');
		cardFooter.classList.add('card-footer');

		const cardImg = document.createElement('img');
		cardImg.classList.add('card-img');
		cardImg.setAttribute('alt', `Imagen del carrusel`);
		cardImg.setAttribute('aria-label', `Imagen del carrusel`);
		cardImg.setAttribute('src', url);

		const card = document.createElement('div');
		card.classList.add('card');

		const swiperSlide = document.createElement('div');
		swiperSlide.classList.add('swiper-slide');

		cardFooter.appendChild(cardSelect);
		cardFooter.appendChild(cardButton);

		card.appendChild(cardImg);
		card.appendChild(cardFooter);

		swiperSlide.appendChild(card);

		const swiperWrapper = document.querySelector('.swiper-wrapper');
		swiperWrapper.appendChild(swiperSlide);
	};

	let imgURL;
	if (typeof img === 'object') {
		imgURL = URL.createObjectURL(img);
	} else {
		imgURL = img;
	}
	createAndAppendCard(cardNumber, cardPos, imgURL);
	updateImgTracker('add', { position: cardPos, img: img });
	swiper.update();
};

/*
-sortImgData:
Receive an array of objects
Each object has a position and an image
Sort the array based on the position, from lower to higher
Overwrite the previous stored position for each img. Assign position 1 to the first img, 2nd to the 2nd img and so on
Example input:
[
	{position: 2 , img: "/img1.jpg"}
	{position: 5 , img: "/img2.jpg"}
	{position: 1 , img: "/img3.jpg"}
]
Expected output:
[
	{position: 1 , img: "/img3.jpg"}	
	{position: 2 , img: "/img1.jpg"}
	{position: 3 , img: "/img2.jpg"}
]
*/
const sortImgData = images => {
	let unsortedImgPos = [];
	let sortedImgPos = [];
	let sortedImages = [];
	let targetIndex = -1;
	for (const image of images) {
		unsortedImgPos.push(image.position);
	}
	sortedImgPos = [...unsortedImgPos].sort();
	for (let i = 0; i < images.length; i++) {
		targetIndex = unsortedImgPos.indexOf(sortedImgPos[i]);
		sortedImages.push({ position: i + 1, img: images[targetIndex].img });
	}
	return sortedImages;
};

/*
-getDBData
Fetch data from the database (currently using a variable, to be implemented once we learn mysql)
Populate the swiper inputs and populate the form swiper with one card per each image, each image has a position

	-populateFormData
	Populate every input of the form with the data retrieved from the database

	-populateSwiper
	Sort swiper images' positions and override position so that they start from 1
	call createSwiperCard function to create a card for each image

	-formatDataFromServer
	Take the data from the server and format it the way we want to use it

*/
const getDBData = async productId => {
	const populateFormData = (title, price, color, size, category, description) => {
		const formTitle = document.querySelector('#title-input');
		const formPrice = document.querySelector('#price-input');
		const formColor = document.querySelector('#color-input');
		const formSize = document.querySelector('#size-input');
		const formCategory = document.querySelector('#category-input');
		const formDescription = document.querySelector('#description-input');
		formTitle.value = title;
		formPrice.value = price;
		formColor.value = color;
		formSize.value = size;
		formCategory.value = category;
		formDescription.value = description;
	};

	const populateSwiper = images => {
		const sortedImgData = sortImgData(images);
		for (let image of sortedImgData) {
			createSwiperCard('', image.position, image.img);
		}
	};

	const formatDataFromServer = responseProduct => {
		const title = responseProduct.name;
		const price = responseProduct.price;
		const color = responseProduct.color.colorName;
		const size = responseProduct.size.sizeName;
		const category = responseProduct.category.categoryName;
		const description = responseProduct.description;
		const images = responseProduct.imagesList.map(imageElement => ({ position: imageElement.imageOrder, img: imageElement.imageUrl }));
		return [title, price, color, size, category, description, images];
	};

	try {
		const responseProduct = await getProductById(productId);
		if (!responseProduct) throw new Error(`No se encontro el producto solicitado`);
		const [title, price, color, size, category, description, images] = formatDataFromServer(responseProduct);
		populateFormData(title, price, color, size, category, description);
		populateSwiper(images);
		urlProductId = productId;
	} catch (error) {
		console.log(error);
		alert('No se encontró producto. Se redireccionara a pagina de administrador');
		location.replace('./products_admin_page.html');
	}
};

/*
Add an event listener to the whole document, listen for DOMContentLoad
Handle drag and drop img file uploads
Handle file upload events when click on the upload image element

	-handleFileSelect
	Prevents default event when dropping an image over the upload container
	Calls handleImgUpload

	-handleDragOver
	Prevent default event when dragging an image over the upload container
	Show legend "copy" around the cursor when dragging a file over the upload container

	-getAvailableCardNumbers
	Get the card numbers that are not being used by other cards. The card number is used 
	to name the cards with the format card-1, card-2, etc depending on the number
	The form retrieves the data using this name
	No two cards can have the same number

	-getAvailablePositions
	Get the positions that are not being used by other cards, no two cards can have the same position

	-handleImgUpload
	If the aggregate of the images already in the page and the ones that are being uploaded are greater than 6
	prevent the upload and show an alert
	If the aggregate is lesser than 6 cards, call createSwiperCard, one time for each image being uploaded

Drag&Drop implementation retrieved from
https://stackoverflow.com/questions/78387155/how-can-i-add-drag-drop-functionality-to-my-file-input-html-tag-which-i-have-c
*/

document.addEventListener('DOMContentLoaded', () => {
	const fileUploadElement = document.getElementById('file-upload');
	const fileDropArea = document.getElementById('file-drop-area');

	const handleFileSelect = function (event) {
		event.stopPropagation();
		event.preventDefault();
		const files = event.dataTransfer.files;
		handleImgUpload(files);
	};

	const handleDragOver = function (event) {
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = 'copy';
	};

	const getAvailableCardNumbers = () => {
		const cardSelectElements = document.querySelectorAll('.card-select');
		const usedNumbers = [];
		const availableNumbers = [];
		cardSelectElements.forEach(cardSelect => usedNumbers.push(cardSelect.name));
		for (let i = 0; i < 6; i++) {
			if (usedNumbers.indexOf(`card-${i + 1}`) < 0) availableNumbers.push(i + 1);
		}
		return availableNumbers;
	};

	const getAvailablePositions = () => {
		const cardPositions = getCardPositions();
		const availablePositions = [];
		for (let i = 0; i < 6; i++) {
			if (cardPositions.indexOf(String(i + 1)) < 0) availablePositions.push(i + 1);
		}
		return availablePositions;
	};

	const handleImgUpload = files => {
		const uploadLimitAlert = document.querySelector('.alert-img-max');
		const usedCardPositions = getCardPositions();
		const availableCardNumbers = getAvailableCardNumbers();
		const availableCardPositions = getAvailablePositions();
		if (usedCardPositions.length + files.length > 6) {
			uploadLimitAlert.classList.remove('hidden');
		} else if (files.length > 0) {
			uploadLimitAlert.classList.add('hidden');
			for (const file of files) {
				createSwiperCard(availableCardNumbers[0], availableCardPositions[0], file);
				availableCardNumbers.shift();
				availableCardPositions.shift();
			}
		} else {
			console.log('no file chosen');
		}
	};

	fileDropArea.addEventListener('dragover', handleDragOver, false);
	fileDropArea.addEventListener('drop', handleFileSelect, false);

	fileUploadElement.addEventListener('change', function () {
		handleImgUpload(this.files);
	});
});

/*
-handleSubmit
Process the data and send it to the server (right now it only prints the data in the console)
If an error occurs grab it and display it on the console

	-getFormData
	Get the form data
	Find if the data has empty fields and if we dont have any image for our product, if so handle this as an error
	If we find an error throw an error and display an error on the html
	If we dont find errors format the data and return it

		-formHasImages
		Find if the form has images by checking if a position is already being used by a card

		-formHasEmptyFields
		Find if the form has an empty field, ignore the file-upload element
		We ignore the file-upload because we can be modifying a product that already has images and
		if we dont upload new images the file-upload container should be empty

		-buildAlertMessage
		Build the message that is shown in the alert that is going to be displayed in case the form has no images
		and/or in case the form has empty fields

		-handleSubmitAlerts
		If we dont upload an image or if a field is empty display the alert element in the HTML

		-validateFormData
		Calls the formHasImages and formHasEmptyFields functions, if those send an error we return true otherwise we send false

		-formatFormData
		Attach the data from the form and the imgTracker in an json format
	
	-sendRequestToServer
	Right now it prints the form data to the console, it will later handle the call to the backend
*/

const handleSubmit = () => {
	const getFormData = () => {
		const formHasImages = () => {
			const usedCardPositions = getCardPositions();
			if (usedCardPositions.length > 0) return true;
			return false;
		};

		const formHasEmptyFields = formData => {
			for (const singleFormField of formData.entries()) {
				const key = singleFormField[0];
				const value = singleFormField[1];
				if (key != 'file-upload' && value === '') {
					return true;
				}
			}
			return false;
		};

		const buildAlertMessage = (hasImages, hasEmptyFields) => {
			let alertMessage = 'Ha sucedido un error, ';
			if (!hasImages && hasEmptyFields) {
				alertMessage += 'necesitas cargar por lo menos 1 imagen por producto y necesitas llenar todos los campos del formulario';
			} else if (!hasImages && !hasEmptyFields) {
				alertMessage += 'necesitas cargar por lo menos 1 imagen por producto';
			} else if (hasImages && hasEmptyFields) {
				alertMessage += 'necesitas llenar todos los campos del formulario';
			}
			return alertMessage;
		};

		const handleSubmitAlerts = (hasImages, hasEmptyFields) => {
			const submitAlertElement = document.querySelector('.alert-submit');
			const maxImgAlertElement = document.querySelector('.alert-img-max');
			maxImgAlertElement.classList.add('hidden');
			if (!hasImages || hasEmptyFields) {
				const alertMessage = buildAlertMessage(hasImages, hasEmptyFields);
				submitAlertElement.textContent = alertMessage;
				submitAlertElement.classList.remove('hidden');
			} else {
				submitAlertElement.classList.add('hidden');
			}
		};

		const validateFormData = formData => {
			const hasImages = formHasImages();
			const hasEmptyFields = formHasEmptyFields(formData);
			handleSubmitAlerts(hasImages, hasEmptyFields);
			if (!hasImages || hasEmptyFields) return true;
			return false;
		};

		const formatFormData = formData => {
			const productBasicData = {
				name: formData.get('title-input'),
				description: formData.get('description-input'),
				price: formData.get('price-input'),
			};

			const productColorSizeCategory = {
				colorName: formData.get('color-input'),
				sizeName: formData.get('size-input'),
				categoryName: formData.get('category-input'),
			};

			const images = [];
			imgTracker.forEach(image => {
				images.push({ imageUrl: image.img, imageOrder: image.position });
			});

			// const imagesformatted = ;

			return [productBasicData, productColorSizeCategory, { images: [...images] }];
		};

		const formElement = document.querySelector('#form-container');
		const formData = new FormData(formElement);
		const hasErrors = validateFormData(formData);
		if (hasErrors) throw 'Error: Valida que el producto cuente por lo menos con 1 imagen y que ningun campo del formulario este vacio';
		return formatFormData(formData);
	};

	const sendNewProductToServer = async formData => {
		const [productBasicData, productColorSizeCategory, images] = formData;

		try {
			const productId = await addProductBasicData(productBasicData);
			if (!productId) console.log('Error al agregar informacion basica del producto');
			const responseColorSizeCategory = await addProductColorSizeCategory(productId, productColorSizeCategory);
			if (!responseColorSizeCategory) console.log('Error al agregar color, tamaño y categoria del producto');
			const responseProductImages = await addProductImages(productId, images);
			if (!responseProductImages) console.log('Error al agregar las imagenes');

			alert('Se agregó producto con éxito');
			document.getElementById('form-container').reset();
			location.reload();
		} catch (error) {
			console.error('Hubo un error: ', error);
		}
	};

	const sendUpdateProductToServer = async formData => {
		const [productBasicData, productColorSizeCategory, images] = formData;
		try {
			const productId = await updateProductById(urlProductId, productBasicData);
			if (!productId) console.log('Error al agregar informacion basica del producto');
			const responseColorSizeCategory = await addProductColorSizeCategory(urlProductId, productColorSizeCategory);
			if (!responseColorSizeCategory) console.log('Error al agregar color, tamaño y categoria del producto');
			const responseProductImages = await addProductImages(urlProductId, images);
			if (!responseProductImages) console.log('Error al agregar las imagenes');

			alert('Se modificó producto con éxito');
			document.getElementById('form-container').reset();
			location.replace('./products_admin_page.html');
		} catch (error) {
			console.log('Error: ', error);
		}
	};

	const formData = getFormData();
	if (urlProductId == null) {
		sendNewProductToServer(formData);
	} else {
		sendUpdateProductToServer(formData);
	}
};

/*
Event listener for the submit button, handles the submit event
If there is an error, displays the error
*/
submitBtn.addEventListener('click', event => {
	// event.preventDefault();
	handleSubmit();
});

/*
Bootstrap form validation
*/
(() => {
	'use strict';
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	const forms = document.querySelectorAll('.needs-validation');
	// Loop over them and prevent submission
	Array.from(forms).forEach(form => {
		form.addEventListener(
			'submit',
			event => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}

				form.classList.add('was-validated');
				event.preventDefault();
			},
			false,
		);
	});
})();

/*
Get the URL parameters to extract the product id. If a product id is found then make a call to the backend.
When a product id is found in the URL parameters is found, the data that is sent to the background will modify the product with said id
*/
const getUrlParams = () => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const productId = urlParams.get('productid');
	if (productId) {
		getDBData(productId);
		submitBtn.textContent = 'Modificar Producto';
	}
};

getUrlParams();
