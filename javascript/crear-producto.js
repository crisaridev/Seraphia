const swiperEl = document.querySelector('.swiper');
const uploadBtn = document.querySelector('input');
const submitBtn = document.querySelector('.submit-btn');

// const formNames = [
// 	'title-input',
// 	'price-input',
// 	'color-input',
// 	'size-input',
// 	'category-input',
// 	'description-input',
// 	'file-upload',
// ]; //names of the elements on the form, useful to know which element is missing
const cardSelectorNames = ['card-1-selector', 'card-2-selector', 'card-3-selector', 'card-4-selector', 'card-5-selector', 'card-6-selector'];
const cardSelectorPositions = ['1', '2', '3', '4', '5', '6'];
// const formInputsNames = ['title-input', 'price-input', 'color-input', 'size-input', 'category-input', 'description-input'];

//Initialize swiper (carousel wrapper)
var swiper = new Swiper('.mySwiper', {
	slidesPerView: 1,
	breakpoints: {
		//more than 700px
		550: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		//more than 1200px
		1000: {
			slidesPerView: 3,
			spaceBetween: 50,
		},
	},
	spaceBetween: 30,
	// freeMode: true,
	// loop: true,
	// centeredSlides: true,
	pagination: {
		// el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

//Add eventlisteners to all the buttons that live inside the swiper's cards
const initiateCardBtn = () => {
	const cardBtn = document.querySelectorAll('.card-btn');
	cardBtn.forEach(e => {
		// When the button is clicked, delete the selected swiper-slide (card) and update the swiper
		e.addEventListener('click', e => {
			e.target.parentNode.parentNode.parentNode.remove();
			swiper.update();
			// update cardsData
			const cardName = e.target.previousElementSibling.name;
			// console.log([...cardsData]);
			cardsData.splice(
				cardsData.findIndex(e => e.name === cardName),
				1,
			);
			// console.log(cardsData);
		});
	});
};

const initiateCardSelector = () => {
	const cardSelectorElements = document.querySelectorAll('.card-select');
	cardSelectorElements.forEach(cardSelectorEl => {
		cardSelectorEl.addEventListener('change', e => {
			const eventPos = e.target.value;
			const eventName = e.target.name;
			const switchPositiongWithIndex = cardsData.findIndex(e => e.position === eventPos);
			const thisElementIndex = cardsData.findIndex(e => e.name === eventName);
			// console.log(thisElementIndex);
			// console.log(switchPositiongWithIndex);
			if (switchPositiongWithIndex === thisElementIndex) {
				//if the index of the event position === current position then we didnt switch position
			} else if (switchPositiongWithIndex >= 0) {
				//if then index of the event position is 0 or greater and different from the current index position then we need to swith positions between two cards
				const thisElementCopy = { ...cardsData[thisElementIndex] };
				//update the copy in js
				cardsData[thisElementIndex].position = cardsData[switchPositiongWithIndex].position;
				cardsData[switchPositiongWithIndex].position = thisElementCopy.position;
				//update the html with the values stored in the js
				document.querySelector(`#${cardsData[thisElementIndex].id}`).value = cardsData[thisElementIndex].position;
				document.querySelector(`#${cardsData[switchPositiongWithIndex].id}`).value = cardsData[switchPositiongWithIndex].position;
			} else {
				//if the index of the event is negative that means we selected an option that no other card has. No need to update the HTML, we just update the copy on js
				cardsData[thisElementIndex].position = eventPos;
			}
		});
	});
};

//add event listeners to the buttons inside the carousel cards
initiateCardBtn();
//add event listeners to the selectors inside the carousel cards
initiateCardSelector();

//Get the form data
const getSwiperFormData = () => {
	const formEl = document.querySelector('#form-container');
	return new FormData(formEl);
};

//Get swiper's cards data
const getCardsData = () => {
	const cardsEl = document.querySelectorAll('.swiper-slide');
	const cardsData = [];
	let name = '';
	let id = '';
	let position = '';
	let img = '';
	for (const card of cardsEl) {
		img = card.firstElementChild.firstElementChild.src;
		name = card.firstElementChild.lastElementChild.firstElementChild.name;
		id = card.firstElementChild.lastElementChild.firstElementChild.id;
		position = card.firstElementChild.lastElementChild.firstElementChild.value;
		cardsData.push({ name, id, position, img });
	}
	return cardsData;
};

const cardsData = getCardsData();

// handle upload file click and drag&drop, accepts multiple files
// https://stackoverflow.com/questions/78387155/how-can-i-add-drag-drop-functionality-to-my-file-input-html-tag-which-i-have-c
document.addEventListener('DOMContentLoaded', () => {
	const fileUploadElement = document.getElementById('file-upload');
	const fileDropArea = document.getElementById('file-drop-area');
	const swiperWrapper = document.querySelector('.swiper-wrapper');

	// handle click event as well as the drop event, the latter is the result of dragging an element over the container and dropping it
	const handleFileSelect = function (event) {
		event.stopPropagation();
		event.preventDefault(); //Prevents the browser from changin the url of the current page to the location of the file being dropped. Only works when file is dropped inside the upload img box
		const files = event.dataTransfer.files;
		addCardManually(files);
	};

	// handle drag over event
	const handleDragOver = function (event) {
		event.stopPropagation();
		event.preventDefault(); //Prevents the browser from changin the url of the current page to the location of the file being dropped. Only works when file is dropped inside the upload img box
		event.dataTransfer.dropEffect = 'copy'; //when dragging an element over the upload container it will show a 'copy' legend
	};

	// insert cards, 1 for each uploaded file
	const addCardManually = function (files) {
		const alertImgEl = document.querySelector('.alert-img-max');
		//find a CardSelectoName that is not in the cardsData, store those
		const availableCardNames = cardSelectorNames.filter(cardName => !cardsData.some(e => e.name === cardName));
		const availableCardPosition = cardSelectorPositions.filter(cardPosition => !cardsData.some(e => e.position === cardPosition));
		// If the current slides + new slides are 7 or higher, send error; otherwhise, upload img
		if (cardsData.length + files.length > 6) {
			alertImgEl.classList.remove('hidden');
		} else if (files.length > 0) {
			// If a file is detected, remove alert and create a new slide with said file
			alertImgEl.classList.add('hidden');
			// Find available cardOrderNames and available cardOrderNumbers, create a new slide with said names, numbers and file
			for (const file of files) {
				const cardOrderName = availableCardNames[0];
				const cardOrder = availableCardPosition[0];
				const cardOrderId = cardOrderName.slice(0, 7) + 'id';
				cardsData.push({ name: cardOrderName, id: cardOrderId, position: cardOrder, img: file });
				availableCardNames.shift();
				availableCardPosition.shift();
				swiperWrapper.insertAdjacentHTML(
					'beforeend',
					`
			    		<div class="swiper-slide">
							<div class="card">
								<img src="${URL.createObjectURL(file)}" class="card-img" alt="Card Image" />
								<div class="card-footer">
									<select class="form-select card-select" name="${cardOrderName}" id="${cardOrderId}" aria-label="Select Component" required>
										<option value="${cardOrder}" selected hidden>${cardOrder}</option>
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
						</div>`,
				);
			}
			swiper.update(); //update swiper with new card
			initiateCardBtn(); //add event listener to all buttons inside the carousel cards
			initiateCardSelector(); //add event listener to all selectors inside the carousel cards
			// console.log(cardsData);
		} else {
			console.log('no file chosen');
		}
	};
	// handles drag&drop
	fileDropArea.addEventListener('dragover', handleDragOver, false);
	fileDropArea.addEventListener('drop', handleFileSelect, false);
	// handles button click
	fileUploadElement.addEventListener('change', function () {
		addCardManually(this.files);
	});
});

const validateFormContent = () => {
	const allFormData = getSwiperFormData();
	const alerSubmitEl = document.querySelector('.alert-submit');
	const usedCardNames = cardSelectorNames.filter(cardName => cardsData.some(e => e.name === cardName));
	let alertsNumber = 0;
	let alertText = 'Error al mandar el formulario, ';
	//Evaluar si tenemos por lo menos 1 tarjeta en el carrusel, detectarlo como error
	if (usedCardNames.length === 0) {
		alertText += 'necesitas por lo menos cargar 1 imagen por producto';
		alertsNumber++;
	}
	// Evaluar si hay por lo menos 1 campo del formulario vacio, detectarlo como error
	for (const formData of allFormData) {
		if (!formData[1] && alertsNumber > 0) {
			alertText += ' y necesitas llenar los campos del formulario';
			alertsNumber++;
			break;
		} else if (!formData[1] && alertsNumber === 0) {
			alertText += 'necesitas llenar todos los campos del formulario';
			alertsNumber++;
			break;
		}
	}
	// Si detectamos un error, desplegar el mensaje de error. Si no detectamos error, quitar el mensaje de error
	if (alertsNumber > 0) {
		alerSubmitEl.textContent = alertText;
		alerSubmitEl.classList.remove('hidden');
	} else {
		alerSubmitEl.classList.add('hidden');
	}
	return alertsNumber;
};

// Create json object and print it to the console
const handleSubmit = () => {
	const allFormData = getSwiperFormData();
	// console.log(allFormData);
	const imgData = [];
	const titleInputData = allFormData.get('title-input');
	const priceInputData = allFormData.get('price-input');
	const colorInputData = allFormData.get('color-input');
	const sizeInputData = allFormData.get('size-input');
	const categoryInputData = allFormData.get('category-input');
	const descriptionInputData = allFormData.get('description-input');
	for (data of cardsData) {
		imgData.push({ position: data.position, img: data.img });
	}
	const submitData = { title: titleInputData, price: priceInputData, color: colorInputData, size: sizeInputData, category: categoryInputData, description: descriptionInputData, img: imgData };
	console.log(submitData);
};

//form submit button listener
submitBtn.addEventListener('click', event => {
	// event.preventDefault();
	const alertsNumber = validateFormContent();
	if (alertsNumber === 0) {
		handleSubmit();
	}
});

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
