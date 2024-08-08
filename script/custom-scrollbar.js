document.addEventListener('DOMContentLoaded', () => {
    function updateScrollIndicators() {
        document.querySelectorAll('.carousel-cv').forEach(carousel => {
            const activeItem = carousel.querySelector('.carousel-item-cv.active');
            const scrollIndicator = carousel.querySelector('.scroll-indicator');

            if (activeItem && scrollIndicator) {
                // Vérifie si l'élément actif est défilable
                if (activeItem.scrollHeight > activeItem.clientHeight) {
                    scrollIndicator.style.display = 'block'; // Affiche la flèche

                    // Positionner la flèche au-dessus de l'élément actif
                    const rect = activeItem.getBoundingClientRect();
                    const carouselRect = carousel.getBoundingClientRect();

                    scrollIndicator.style.top = `${rect.top - carouselRect.top - scrollIndicator.offsetHeight - 10}px`;
                    scrollIndicator.style.left = `${rect.left - carouselRect.left + (activeItem.clientWidth / 2) - (scrollIndicator.offsetWidth / 2)}px`;
                } else {
                    scrollIndicator.style.display = 'none'; // Cache la flèche
                }
            }
        });
    }

    function initCustomScrollbars() {
        updateScrollIndicators();
    }

    initCustomScrollbars();

    window.addEventListener('resize', updateScrollIndicators);

    document.addEventListener('click', (event) => {
        if (event.target.matches('.carousel-item-cv')) {
            updateScrollIndicators();
        }
    });
});


// document.addEventListener('DOMContentLoaded', function() {
//     const scrollIndicator = document.querySelector('.scroll-indicator');

//     function checkScrollable() {
//         const carousel = document.querySelector('.carousel-cv');
//         const activeItem = carousel ? carousel.querySelector('.carousel-item:nth-child(2)') : null;

//         if (activeItem) {
//             // Vérifie si l'élément actif est scrollable
//             if (activeItem.scrollHeight > activeItem.clientHeight) {
//                 scrollIndicator.style.display = 'block'; // Affiche la flèche
//                 activeItem.appendChild(scrollIndicator); // Place la flèche dans l'élément actif
//             } else {
//                 scrollIndicator.style.display = 'none'; // Cache la flèche
//             }
//         } else {
//             console.warn('Élément actif non trouvé dans le carousel.');
//         }
//     }

//     checkScrollable(); // Vérifie lors du chargement

//     // Ajoutez des événements pour vérifier lorsque la taille de l'écran change ou que le contenu du carousel change
//     window.addEventListener('resize', checkScrollable);
//     carousel.addEventListener('scroll', checkScrollable); // Si le carousel change dynamiquement
// });
