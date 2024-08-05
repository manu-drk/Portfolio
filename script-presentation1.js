document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    function loadPresentationCarousel() {
        fetch('datas/presentation.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(carouselData => {
                console.log('Presentation data loaded:', carouselData);

                const carouselContainer = document.querySelector('.carousel-presentation');
                const titleContainer = document.createElement('div');
                titleContainer.setAttribute('class', 'carousel-title');

                const titleElement = document.createElement('h1');
                titleContainer.appendChild(titleElement);
                carouselContainer.before(titleContainer);

                let currentIndexPresentation = 0;
                let prevButton = null;
                let nextButton = null;

                function createCarouselItems() {
                    carouselContainer.innerHTML = ''; // Clear existing items

                    carouselData.forEach((item, index) => {
                        const carouselItem = document.createElement('div');
                        carouselItem.setAttribute('class', 'carousel-item-presentation');
                        carouselItem.setAttribute('data-index', index);
                        carouselItem.setAttribute('data-link', item.link);
                        carouselItem.setAttribute('data-title', item.title);

                        // Add title
                        const title = document.createElement('h2');
                        title.innerText = item.title;
                        carouselItem.appendChild(title);

                        // Add description
                        const descriptionList = document.createElement('ul');
                        item.description.forEach(desc => {
                            const descriptionItem = document.createElement('li');
                            descriptionItem.innerText = desc;
                            descriptionList.appendChild(descriptionItem);
                        });
                        carouselItem.appendChild(descriptionList);

                        carouselContainer.appendChild(carouselItem);
                    });
                }

                function showPresentationCarouselItem(index) {
                    const items = document.querySelectorAll('.carousel-item-presentation');
                    const totalItems = items.length;
                    const titleElement = document.querySelector('.carousel-title h1');

                    if (totalItems === 0) return;

                    titleElement.innerText = items[index].getAttribute('data-title');

                    items.forEach((item, i) => {
                        item.classList.remove('active', 'previous', 'next', 'inactive');
                        item.style.transform = '';
                        item.style.opacity = '';
                        item.style.zIndex = '';
                        item.onclick = null;

                        const pos = (i - index + totalItems) % totalItems;

                        switch (pos) {
                            case 0:
                                item.style.transform = 'translateX(-300px) scale(0.8)';
                                item.style.opacity = '0.8';
                                item.style.zIndex = 2;
                                item.classList.add('inactive');
                                item.onclick = () => movePresentationCarousel(-1);
                                break;
                            case 1:
                                item.style.transform = 'translateX(0px) scale(1)';
                                item.style.opacity = '1';
                                item.style.zIndex = 3;
                                item.classList.add('active');
                                item.onclick = () => goTo(item.getAttribute('data-link'));
                                titleElement.innerText = item.getAttribute('data-title');
                                break;
                            case 2:
                                item.style.transform = 'translateX(300px) scale(0.8)';
                                item.style.opacity = '0.8';
                                item.style.zIndex = 2;
                                item.classList.add('inactive');
                                item.onclick = () => movePresentationCarousel(1);
                                break;
                            default:
                                item.style.transform = 'translateX(0px) scale(0.4)';
                                item.style.opacity = '0.4';
                                item.style.zIndex = 0;
                                item.classList.add('inactive');
                                break;
                        }
                    });

                    currentIndexPresentation = index;
                }

                function movePresentationCarousel(direction) {
                    const items = document.querySelectorAll('.carousel-item-presentation');
                    currentIndexPresentation = (currentIndexPresentation + direction + items.length) % items.length;
                    showPresentationCarouselItem(currentIndexPresentation);
                }

                function createArrowButtons() {
                    const carousel = document.querySelector('.carousel-presentation');
                    if (!carousel) return;

                    if (prevButton) prevButton.remove();
                    if (nextButton) nextButton.remove();

                    prevButton = document.createElement('button');
                    prevButton.classList.add('prev_bouton');
                    prevButton.innerHTML = '<img src="./images/flech-prev.png" alt="Previous">';
                    carousel.appendChild(prevButton);

                    nextButton = document.createElement('button');
                    nextButton.classList.add('next_bouton');
                    nextButton.innerHTML = '<img src="./images/flech-next.png" alt="Next">';
                    carousel.appendChild(nextButton);

                    prevButton.addEventListener('click', () => movePresentationCarousel(-1));
                    nextButton.addEventListener('click', () => movePresentationCarousel(1));
                }

                function manageCarouselVisibility() {
                    createArrowButtons();
                    showPresentationCarouselItem(currentIndexPresentation);
                }

                createCarouselItems();
                showPresentationCarouselItem(0);

                manageCarouselVisibility();

                window.addEventListener('resize', () => {
                    manageCarouselVisibility();
                });

                function goTo(url, target = '_self') {
                    if (target === '_blank') {
                        window.open(url, '_blank');
                    } else {
                        window.location.href = url;
                    }
                }

                // Garder l'onglet actif
                window.addEventListener('focus', () => {
                    showPresentationCarouselItem(currentIndexPresentation); // Assurer que l'affichage du carrousel est mis à jour
                });
            })
            .catch(error => {
                console.error('Error fetching presentation data:', error);
            });
    }

    loadPresentationCarousel();
});




// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed');

//     let currentIndex = 0;
//     let prevButton = null;
//     let nextButton = null;

//     // Fonction pour charger les données depuis l'URL spécifiée
//     function fetchData(url) {
//         return fetch(url)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok ' + response.statusText);
//                 }
//                 return response.json();
//             });
//     }

//     // Fonction pour créer le carrousel
//     function createCarousel(data) {
//         const carouselContainer = document.querySelector('.carousel-presentation');
//         carouselContainer.innerHTML = '';  // Effacer les éléments existants

//         // Créer et ajouter le conteneur de titre avant le conteneur du carrousel
//         const titleContainer = document.createElement('div');
//         titleContainer.setAttribute('class', 'carousel-title');
//         const titleElement = document.createElement('h1');
//         titleContainer.appendChild(titleElement);
//         carouselContainer.before(titleContainer);

//         data.forEach((item, index) => {
//             const carouselItem = document.createElement('div');
//             carouselItem.classList.add('carousel-item-presentation');
//             carouselItem.setAttribute('data-link', item.link);
//             carouselItem.setAttribute('data-title', item.title);

//             // Ajouter le titre
//             const title = document.createElement('h2');
//             title.innerText = item.title;
//             carouselItem.appendChild(title);

//             // Ajouter la description
//             const descriptionList = document.createElement('ul');
//             item.description.forEach(desc => {
//                 const descriptionItem = document.createElement('li');
//                 descriptionItem.innerText = desc;
//                 descriptionList.appendChild(descriptionItem);
//             });
//             carouselItem.appendChild(descriptionList);

//             carouselContainer.appendChild(carouselItem);
//         });

//         showPresentationCarouselItem(currentIndex);
//         handleResizeOrOrientationChange();  // Assurer que les boutons sont correctement gérés
//     }

//     // Fonction pour afficher l'élément actuel du carrousel
//     function showPresentationCarouselItem(index) {
//         const items = document.querySelectorAll('.carousel-item-presentation');
//         const totalItems = items.length;
//         const titleElement = document.querySelector('.carousel-title h1');

//         if (totalItems === 0) return;

//         titleElement.innerText = items[index].getAttribute('data-title');

//         items.forEach((item, i) => {
//             item.classList.remove('active', 'previous', 'next', 'inactive');
//             item.style.transform = '';
//             item.style.opacity = '';
//             item.style.zIndex = '';
//             item.onclick = null;

//             const pos = (i - index + totalItems) % totalItems;

//             if (window.innerWidth <= 380) {
//                 if (i === index) {
//                     item.classList.add('active');
//                     item.onclick = () => goTo(item.getAttribute('data-link'));
//                 } else {
//                     item.classList.add('inactive');
//                     item.onclick = null;
//                 }
//             } else if (window.innerWidth <= 1024) {
//                 if (i === index) {
//                     item.classList.add('active');
//                     item.onclick = () => goTo(item.getAttribute('data-link'));
//                 } else {
//                     item.classList.add('inactive');
//                     item.onclick = null;
//                 }
//             } else {
//                 switch (pos) {
//                     case 0:
//                         item.style.transform = 'translateX(-300px) scale(0.8)';
//                         item.style.opacity = '0.8';
//                         item.style.zIndex = 2;
//                         item.onclick = () => moveCarousel(-1);
//                         break;
//                     case 1:
//                         item.style.transform = 'translateX(0px) scale(1)';
//                         item.style.opacity = '1';
//                         item.style.zIndex = 3;
//                         item.classList.add('active');
//                         item.onclick = () => goTo(item.getAttribute('data-link'));
//                         titleElement.innerText = item.getAttribute('data-title');
//                         break;
//                     case 2:
//                         item.style.transform = 'translateX(300px) scale(0.8)';
//                         item.style.opacity = '0.8';
//                         item.style.zIndex = 2;
//                         item.onclick = () => moveCarousel(1);
//                         break;
//                     default:
//                         item.style.transform = 'translateX(0px) scale(0.4)';
//                         item.style.opacity = '0.4';
//                         item.style.zIndex = 0;
//                         break;
//                 }
//             }
//         });
//     }

//     // Fonction pour déplacer le carrousel
//     function moveCarousel(direction) {
//         const items = document.querySelectorAll('.carousel-item-presentation');
//         currentIndex = (currentIndex + direction + items.length) % items.length;
//         showPresentationCarouselItem(currentIndex);
//     }

//     // Fonction pour rediriger l'utilisateur
//     function goTo(url, target = '_self') {
//         if (target === '_blank') {
//             window.open(url, '_blank');
//         } else {
//             window.location.href = url;
//         }
//     }

//     // Fonction pour créer les boutons de navigation
//     function createArrowButtons() {
//         const carousel = document.querySelector('.carousel-presentation');
//         if (!carousel) return;

//         if (prevButton) prevButton.remove();
//         if (nextButton) nextButton.remove();

//         prevButton = document.createElement('button');
//         prevButton.classList.add('prev_bouton');
//         prevButton.innerHTML = '<img src="./images/flech-prev.png" alt="Previous">';
//         carousel.appendChild(prevButton);

//         nextButton = document.createElement('button');
//         nextButton.classList.add('next_bouton');
//         nextButton.innerHTML = '<img src="./images/flech-next.png" alt="Next">';
//         carousel.appendChild(nextButton);

//         prevButton.addEventListener('click', () => moveCarousel(-1));
//         nextButton.addEventListener('click', () => moveCarousel(1));
//     }

//     // Fonction pour supprimer les boutons de navigation
//     function removeArrowButtons() {
//         if (prevButton) prevButton.remove();
//         if (nextButton) nextButton.remove();
//         prevButton = null;
//         nextButton = null;
//     }

//     // Fonction pour gérer les changements de taille de la fenêtre ou d'orientation
//     function handleResizeOrOrientationChange() {
//         if (window.innerWidth <= 1024) {
//             createArrowButtons();
//         } else {
//             removeArrowButtons();
//         }
//         showPresentationCarouselItem(currentIndex); // Assurer que l'élément du carrousel est correctement affiché
//     }

//     // Initialiser le carrousel
//     function initializeCarousel(url) {
//         fetchData(url)
//             .then(data => {
//                 createCarousel(data);
//                 window.addEventListener('resize', handleResizeOrOrientationChange);
//                 window.addEventListener('orientationchange', handleResizeOrOrientationChange);
//                 handleResizeOrOrientationChange(); // Assurer que les boutons sont correctement affichés lors de l'initialisation
//             })
//             .catch(error => console.error('Error loading JSON:', error));
//     }

//     // Initialiser le carrousel de présentation
//     initializeCarousel('datas/presentation.json');

//     // Exemple de gestion des changements de carrousel
//     document.querySelectorAll('.carousel-switch').forEach(button => {
//         button.addEventListener('click', (e) => {
//             const url = e.target.getAttribute('data-carousel-url');
//             initializeCarousel(url);
//         });
//     });
// });

