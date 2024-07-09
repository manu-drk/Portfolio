document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    let currentIndexPresentation = 0;

    function loadPresentationCarousel() {
        fetch('datas/presentation.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(carouselData => {
                console.log('Présentation data loaded:', carouselData);

                const carouselContainer = document.querySelector('.carousel-presentation');

                if (carouselContainer) {
                    const detailsContainer = document.createElement('div');
                    detailsContainer.setAttribute('class', 'details-container');
                    carouselContainer.after(detailsContainer);

                    carouselData.forEach((item, index) => {
                        const carouselItem = document.createElement('div');
                        carouselItem.setAttribute('class', 'carousel-item-presentation');
                        carouselItem.setAttribute('data-index', index); // Ajout de l'attribut data-index

                        const title = document.createElement('h2');
                        title.innerText = item.title;
                        carouselItem.appendChild(title);

                        const descriptionList = document.createElement('ul');
                        item.description.forEach(desc => {
                            const descriptionItem = document.createElement('li');
                            descriptionItem.innerText = desc;
                            descriptionList.appendChild(descriptionItem);
                        });
                        carouselItem.appendChild(descriptionList);

                        carouselContainer.appendChild(carouselItem);
                    });

                    // Affichage initial du carrousel de présentation
                    showPresentationCarouselItem(currentIndexPresentation);
                } else {
                    console.error('Element .carousel-presentation not found');
                }
            })
            .catch(error => console.error('Error fetching Presentation carousel data:', error));
    }

    function showPresentationCarouselItem(index) {
        const items = document.querySelectorAll('.carousel-item-presentation');
        const totalItems = items.length;

        items.forEach((item, i) => {
            const pos = (i - index + totalItems) % totalItems;
            switch (pos) {
                case 0:
                    item.style.transform = 'translateX(-300px) scale(0.8)';
                    item.style.opacity = '0.8';
                    item.style.zIndex = 2;
                    item.onclick = () => movePresentationCarousel(-1);
                    break;
                case 1:
                    item.style.transform = 'translateX(0px) scale(1)';
                    item.style.opacity = '1';
                    item.style.zIndex = 3;
                    item.onclick = () => goTo(item.getAttribute('data-link'));
                    break;
                case 2:
                    item.style.transform = 'translateX(300px) scale(0.8)';
                    item.style.opacity = '0.8';
                    item.style.zIndex = 2;
                    item.onclick = () => movePresentationCarousel(1);
                    break;
                default:
                    item.style.transform = 'translateX(0px) scale(0.4)';
                    item.style.opacity = '0.4';
                    item.style.zIndex = 0;
                    item.onclick = null;
                    break;
            }
        });
    }

    function movePresentationCarousel(direction) {
        const items = document.querySelectorAll('.carousel-item-presentation');
        currentIndexPresentation = (currentIndexPresentation + direction + items.length) % items.length;
        showPresentationCarouselItem(currentIndexPresentation);
    }

    // Fonction pour attendre la disponibilité de l'élément .carousel-presentation
    function waitForElement(selector, callback) {
        const element = document.querySelector(selector);
        if (element) {
            callback(element);
        } else {
            const observer = new MutationObserver((mutations, me) => {
                const element = document.querySelector(selector);
                if (element) {
                    callback(element);
                    me.disconnect(); // Arrête d'observer une fois l'élément trouvé
                }
            });

            observer.observe(document, {
                childList: true,
                subtree: true
            });
        }
    }

    // Utilise waitForElement pour charger le carrousel une fois que .carousel-presentation est disponible
    waitForElement('.carousel-presentation', (element) => {
        loadPresentationCarousel();
    });

    // Utilise waitForElement pour attendre la disponibilité de l'élément .carousel-nav-left
    waitForElement('.carousel-nav-left', (leftNav) => {
        leftNav.addEventListener('click', () => {
            movePresentationCarousel(-1);
        });
    });

    // Utilise waitForElement pour attendre la disponibilité de l'élément .carousel-nav-right
    waitForElement('.carousel-nav-right', (rightNav) => {
        rightNav.addEventListener('click', () => {
            movePresentationCarousel(1);
        });
    });
});

function goTo(url, target) {
    if (target === '_blank') {
        window.open(url, '_blank'); // Ouvre le lien dans une nouvelle fenêtre
    } else {
        window.location.href = url; // Ouvre le lien dans la même fenêtre
    }
}



// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed');

//     let currentIndexPresentation = 0;

//     function loadPresentationCarousel() {
//         fetch('datas/presentation.json')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok ' + response.statusText);
//                 }
//                 return response.json();
//             })
//             .then(carouselData => {
//                 console.log('Présentation data loaded:', carouselData);

//                 const carouselContainer = document.querySelector('.carousel-presentation');

//                 if (carouselContainer) {
//                     const detailsContainer = document.createElement('div');
//                     detailsContainer.setAttribute('class', 'details-container');
//                     carouselContainer.after(detailsContainer);

//                     carouselData.forEach((item, index) => {
//                         const carouselItem = document.createElement('div');
//                         carouselItem.setAttribute('class', 'carousel-item-presentation');
//                         carouselItem.setAttribute('data-index', index); // Ajout de l'attribut data-index

//                         const title = document.createElement('h2');
//                         title.innerText = item.title;
//                         carouselItem.appendChild(title);

//                         const descriptionList = document.createElement('ul');
//                         item.description.forEach(desc => {
//                             const descriptionItem = document.createElement('li');
//                             descriptionItem.innerText = desc;
//                             descriptionList.appendChild(descriptionItem);
//                         });
//                         carouselItem.appendChild(descriptionList);

//                         carouselContainer.appendChild(carouselItem);
//                     });

//                     // Affichage initial du carrousel de présentation
//                     showPresentationCarouselItem(currentIndexPresentation);
//                 } else {
//                     console.error('Element .carousel-presentation not found');
//                 }
//             })
//             .catch(error => console.error('Error fetching Presentation carousel data:', error));
//     }

//     function showPresentationCarouselItem(index) {
//         const items = document.querySelectorAll('.carousel-item-presentation');
//         const totalItems = items.length;

//         items.forEach((item, i) => {
//             const pos = (i - index + totalItems) % totalItems;
//             switch (pos) {
//                 case 0:
//                     item.style.transform = 'translateX(-300px) scale(0.8)';
//                     item.style.opacity = '0.8';
//                     item.style.zIndex = 2;
//                     item.onclick = () => movePresentationCarousel(-1);
//                     break;
//                 case 1:
//                     item.style.transform = 'translateX(0px) scale(1)';
//                     item.style.opacity = '1';
//                     item.style.zIndex = 3;
//                     item.onclick = () => goTo(item.getAttribute('data-link'));
//                     break;
//                 case 2:
//                     item.style.transform = 'translateX(300px) scale(0.8)';
//                     item.style.opacity = '0.8';
//                     item.style.zIndex = 2;
//                     item.onclick = () => movePresentationCarousel(1);
//                     break;
//                 default:
//                     item.style.transform = 'translateX(0px) scale(0.4)';
//                     item.style.opacity = '0.4';
//                     item.style.zIndex = 0;
//                     item.onclick = null;
//                     break;
//             }
//         });
//     }

//     function movePresentationCarousel(direction) {
//         const items = document.querySelectorAll('.carousel-item-presentation');
//         currentIndexPresentation = (currentIndexPresentation + direction + items.length) % items.length;
//         showPresentationCarouselItem(currentIndexPresentation);
//     }

//     // Fonction pour attendre la disponibilité de l'élément .carousel-presentation
//     function waitForElement(selector, callback) {
//         const element = document.querySelector(selector);
//         if (element) {
//             callback(element);
//         } else {
//             const observer = new MutationObserver((mutations, me) => {
//                 const element = document.querySelector(selector);
//                 if (element) {
//                     callback(element);
//                     me.disconnect(); // Arrête d'observer une fois l'élément trouvé
//                 }
//             });

//             observer.observe(document, {
//                 childList: true,
//                 subtree: true
//             });
//         }
//     }

//     // Utilise waitForElement pour charger le carrousel une fois que .carousel-presentation est disponible
//     waitForElement('.carousel-presentation', (element) => {
//         loadPresentationCarousel();
//     });

//     // Vérifie si l'élément '.carousel-nav-left' existe avant d'ajouter l'écouteur d'événements
//     const leftNav = document.querySelector('.carousel-nav-left');
//     if (leftNav) {
//         leftNav.addEventListener('click', () => {
//             movePresentationCarousel(-1);
//         });
//     } else {
//         console.error('Element .carousel-nav-left not found');
//     }

//     // Vérifie si l'élément '.carousel-nav-right' existe avant d'ajouter l'écouteur d'événements
//     const rightNav = document.querySelector('.carousel-nav-right');
//     if (rightNav) {
//         rightNav.addEventListener('click', () => {
//             movePresentationCarousel(1);
//         });
//     } else {
//         console.error('Element .carousel-nav-right not found');
//     }
// });

// function goTo(url, target) {
//     if (target === '_blank') {
//         window.open(url, '_blank'); // Ouvre le lien dans une nouvelle fenêtre
//     } else {
//         window.location.href = url; // Ouvre le lien dans la même fenêtre
//     }
// }
