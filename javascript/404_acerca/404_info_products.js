//js de 9 de julio para filtro
document.addEventListener('DOMContentLoaded', function() {
    const filterToggleButton = document.getElementById('filterToggleButton');
    const filterPanel = document.getElementById('filterPanel');
    const productsContainer = document.getElementById('productsContainer'); //checar que parte es me falta checar pero ya sirve el filtro
    const sizeCheckboxes = document.querySelectorAll('input[data-filter-type="size"]');
    const typeCheckboxes = document.querySelectorAll('input[data-filter-type="type"]');
    const applyFilterButton = document.getElementById('appliedfilter');
    const clearFilterButton = document.getElementById('clearFilterButton');
    const allProducts = document.querySelectorAll('.product-item'); // Selecciona todos los elementos de producto

    // Alternar la visibilidad del panel de filtro para pantallas pequeñas
    if (filterToggleButton && filterPanel) {
        filterToggleButton.addEventListener('click', function() {
            filterPanel.classList.toggle('d-none');
            filterPanel.classList.toggle('d-md-block'); // visible en pantallas medianas y grandes
        });
    }

    // Función para aplicar los filtros
    function applyFilters() {
        const selectedSizes = Array.from(sizeCheckboxes)
                                .filter(checkbox => checkbox.checked)
                                .map(checkbox => checkbox.value.toLowerCase());

        const selectedTypes = Array.from(typeCheckboxes)
                                .filter(checkbox => checkbox.checked)
                                .map(checkbox => checkbox.value.toLowerCase());

        allProducts.forEach(product => {
            const productSize = product.dataset.size ? product.dataset.size.toLowerCase() : '';
            const productType = product.dataset.type ? product.dataset.type.toLowerCase() : '';

            // Verifica si el producto coincide con los filtros seleccionados
            // Si no se selecciona ningún filtro de talla, todos los productos de cualquier talla coinciden.
            const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(productSize);
            // Si no se selecciona ningún filtro de tipo, todos los productos de cualquier tipo coinciden.
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(productType);

            if (matchesSize && matchesType) {
                product.style.display = 'block'; // Muestra el producto
            } else {
                product.style.display = 'none'; // Oculta el producto
            }
        });
    }

    // Escucha el evento click del botón "Aplicar"
    if (applyFilterButton) {
        applyFilterButton.addEventListener('click', applyFilters);
    }

    // Escucha el evento click del botón "Borrar"
    if (clearFilterButton) {
        clearFilterButton.addEventListener('click', function() {
            // Desmarca todas las casillas de verificación
            sizeCheckboxes.forEach(checkbox => checkbox.checked = false);
            typeCheckboxes.forEach(checkbox => checkbox.checked = false);
            // Muestra todos los productos
            allProducts.forEach(product => product.style.display = 'block');
        });
    }

    // Opcional: no entiendo esta checar
    // applyFilters();
});

//js de productos este no se deja pero no lo borres bc aún no se a donde se va a mover

// --- 1. DATOS DE PRODUCTOS DE MUESTRA ---
// definir de donde vienen los datos AAAAAA de la base de datos
const allProducts = [
    {
        id: '1',
        name: 'Blusa Amarilla con Bordado Floral',
        img: '/assets/images/404/product/1.jpg',
        price: 400.00,
        description: 'Blusa ligera con bordado artesanal de motivos florales tradicionales. Con manga corto, cuello redondo y delicados olanes en mangas y pecho. Una prenda que celebra la herencia textil mexicana a través del color y los detalles hechos a mano.',
        sizes: ['L'],
        type: 'Blusa'
    },
    {
        id: '2',
        name: 'Blusa Azul con Bordado Huipil',
        img: '/assets/images/404/product/2.jpg',
        price: 450.00,
        description: 'Blusa de manga corta confeccionada en tela azul con líneas verticales blancas. El detalle principal es una aplicación de bordado estilo huipil en el pecho, que aporta carácter y valor cultural. Una prenda fresca con un diseño contemporáneo.',
        sizes: ['M'],
        type: 'Blusa'
    },
    {
        id: '3',
        name: 'Blusa Azul con Bordado de Peces',
        img: '/assets/images/404/product/3.jpg',
        price: 450.00,
        description: 'Blusa azul de silueta amplia, con cuello redondo y manga corta decoradas con tela de lunares en azul claro. El diseño destaca por un bordado artesanal de figuras de peces en el frente, complementado con retazos de tela estampada que aportan textura y un toque creativo.',
        sizes: ['M'],
        type: 'Blusa'
    },
    {
        id: '4',
        name: 'Blusa tipo top diseño de triangulos',
        img: '/assets/images/404/product/4.jpg',
        price: 400.00,
        description: 'Top corto confeccionado en algodón ligero con un llamativo patrón de líneas en zigzag color azul. Su diseño halter incorpora un cordón que se anuda detrás del cuello, dejando la espalda al descubierto para un acabado fresco y elegante. Una prenda ideal para climas cálidos.',
        sizes: ['S'],
        type: 'Blusa'
    },
    {
        id: '5',
        name: 'Blusa corta sin mangas color rojo',
        img: '/assets/images/404/product/5.jpg',
        price: 450.00,
        description: 'Blusa ligera confeccionada en algodón color rojo, perfecta para climas cálidos. Su diseño sin mangas y espalda cruzada estiliza la silueta y brinda libertad de movimiento. Bordado artesanal en forma de pluma, hecho a mano con hilos multicolor, que aporta un toque único y artístico.',
        sizes: ['M'],
        type: 'Blusa'
    },
    {
        id: '6',
        name: 'Blusa abierta estilo kimono',
        img: '/assets/images/404/product/6.jpg',
        price: 500.00,
        description: 'Blusa abierta de inspiración kimono, confeccionada en algodón color beige. De corte relajado y manga corta, esta prenda destaca por sus acabados delicados: un fino encaje blanco aplicado a mano en las mangas y el ruedo, que aporta un toque artesanal y femenino.',
        sizes: ['L'],
        type: 'Blusa'
    },
    {
        id: '7',
        name: 'Blusa rosa con espalda descubierta',
        img: '/assets/images/404/product/7.jpg',
        price: 400.00,
        description: 'Blusa corta confeccionada en algodón color rosa. Presenta un diseño sin mangas con espalda completamente descubierta, que se ajusta en la parte posterior del cuello. El frente incorpora un delicado bordado en forma de ondas.',
        sizes: ['M'],
        type: 'Blusa'
    },
    {
        id: '8',
        name: 'Blusa Negra Asimétrica con Encaje Floral',
        img: '/assets/images/404/product/8.jpg',
        price: 400.00,
        description: '"Blusa negra de un solo hombro, confeccionada en algodón ligero con delicado encaje floral calado. Se anuda en el hombro con un lazo de la misma tela. El borde inferior presenta un acabado ondulado que añade movimiento y realza el diseño de la prenda.',
        sizes: ['M'],
        type: 'Blusa'
    },
    {
        id: '9',
        name: 'Blusa estilo vaquero',
        img: '/assets/images/404/product/9.jpg',
        price: 500.00,
        description: 'Blusa de inspiración vaquera confeccionada en algodón color beige. Presenta manga corta y corte estructurado. El diseño incorpora un bordado artesanal en el pecho y un bordado distintivo en la parte alta de la espalda: una serpiente elaborada a mano con gran detalle. Una prenda que combina tradición textil con un estilo auténtico y atemporal.',
        sizes: ['L'],
        type: 'Blusa'
    },
    {
        id: '10',
        name: 'Blusa negra con bordado de crochet',
        img: '/assets/images/404/product/10.jpg',
        price: 450.00,
        description: 'Blusa de corte amplio confeccionada en suave algodón negro, ideal para un estilo relajado y contemporáneo. El diseño presenta cuello redondo y destaca por un delicado bordado de flores a crochet en el pecho, que aporta un toque artesanal y femenino.',
        sizes: ['M'],
        type: 'Blusa'
    },
    
];

