  // NO JALAAAAA
 
 document.addEventListener('DOMContentLoaded', function() {
            const filterToggleButton = document.getElementById('filterToggleButton');
            const filterPanel = document.getElementById('filterPanel');

            if (filterToggleButton && filterPanel) {
                filterToggleButton.addEventListener('click', function() {
                    filterPanel.classList.toggle('d-none'); // Alternar la clase d-none de Bootstrap
                    filterPanel.classList.toggle('d-md-block'); // Asegurarse de que d-md-block se mantenga
                });
            }

            // Opcional: Funcionalidad del botón Borrar Filtro
            const clearFilterButton = document.getElementById('clearFilterButton');
            if (clearFilterButton) {
                clearFilterButton.addEventListener('click', function() {
                    const checkboxes = filterPanel.querySelectorAll('input[type="checkbox"]');
                    checkboxes.forEach(checkbox => {
                        checkbox.checked = false;
                    });
                    console.log('Filtros borrados.');
                });
            }

            // Opcional: Alternar la visibilidad de los enlaces del pie de página en pantallas pequeñas
            const footerToggles = document.querySelectorAll('.footer-toggle');
            footerToggles.forEach(toggle => {
                toggle.addEventListener('click', function() {
                    if (window.innerWidth < 768) { // Aplicar solo en pantallas pequeñas
                        const ul = this.nextElementSibling;
                        if (ul && ul.classList.contains('footer-links')) {
                            ul.classList.toggle('d-none'); // Alternar la visibilidad del UL
                        }
                    }
                });
            });

        });