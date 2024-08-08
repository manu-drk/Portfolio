// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed');

//     function loadCvCarousel() {
//         fetch('datas/cv.json')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok ' + response.statusText);
//                 }
//                 return response.json();
//             })
//             .then(carouselData => {
//                 console.log('CV data loaded:', carouselData);

//                 const carouselContainer = document.querySelector('.carousel-cv');
//                 const titleContainer = document.createElement('div');
//                 titleContainer.setAttribute('class', 'carousel-title');

//                 const titleElement = document.createElement('h1');
//                 titleContainer.appendChild(titleElement);
//                 carouselContainer.before(titleContainer);

//                 let currentIndexCv = 0;
//                 let prevButton = null;
//                 let nextButton = null;

//                 // Création de l'indicateur de scroll
//                 const scrollIndicator = document.createElement('div');
//                 scrollIndicator.classList.add('scroll-indicator');
//                 scrollIndicator.innerHTML = '<span>&#x2193;</span>'; // flèche vers le bas
//                 carouselContainer.appendChild(scrollIndicator); // Ajout dans le conteneur du carrousel

//                 function updateScrollIndicatorPosition() {
//                     const activeItem = document.querySelector('.carousel-item-cv.active');
//                     if (activeItem) {
//                         const rect = activeItem.getBoundingClientRect();
//                         const containerRect = carouselContainer.getBoundingClientRect();
//                         scrollIndicator.style.display = 'block';
//                         scrollIndicator.style.bottom = `${containerRect.bottom - rect.bottom}px`;
//                         scrollIndicator.style.left = `${rect.right - containerRect.left - scrollIndicator.offsetWidth}px`;

//                         // Debugging logs
//                         console.log('Active item rect:', rect);
//                         console.log('Container rect:', containerRect);
//                         console.log('Scroll indicator position - bottom:', scrollIndicator.style.bottom);
//                         console.log('Scroll indicator position - left:', scrollIndicator.style.left);
//                     } else {
//                         scrollIndicator.style.display = 'none';
//                     }
//                 }

//                 function checkScrollable(item) {
//                     if (item.scrollHeight > item.clientHeight) {
//                         scrollIndicator.style.display = 'block';
//                         updateScrollIndicatorPosition(); // Met à jour la position de la flèche
//                     } else {
//                         scrollIndicator.style.display = 'none';
//                     }
//                 }

//                 function createCarouselItems() {
//                     carouselContainer.innerHTML = ''; // Clear existing items

//                     carouselData.forEach((section, index) => {
//                         const carouselItem = document.createElement('div');
//                         carouselItem.setAttribute('class', 'carousel-item-cv');
//                         carouselItem.setAttribute('data-index', index);
//                         carouselItem.setAttribute('data-title', section.title);

//                         // Add title
//                         const title = document.createElement('h2');
//                         title.innerText = section.title;
//                         carouselItem.appendChild(title);

//                         // Add description items
//                         section.items.forEach(item => {
//                             const itemContainer = document.createElement('div');
//                             itemContainer.setAttribute('class', 'cv-item');

//                             const intitule = document.createElement('h3');
//                             intitule.innerText = item.intitule;
//                             itemContainer.appendChild(intitule);

//                             const description = document.createElement('p');
//                             description.innerText = item.description;
//                             itemContainer.appendChild(description);

//                             carouselItem.appendChild(itemContainer);
//                         });

//                         carouselContainer.appendChild(carouselItem);
//                     });
//                 }

//                 function showCvCarouselItem(index) {
//                     const items = document.querySelectorAll('.carousel-item-cv');
//                     const totalItems = items.length;
//                     const titleElement = document.querySelector('.carousel-title h1');

//                     if (totalItems === 0) return;

//                     titleElement.innerText = items[index].getAttribute('data-title');

//                     items.forEach((item, i) => {
//                         item.classList.remove('active', 'previous', 'next', 'inactive');
//                         item.style.transform = '';
//                         item.style.opacity = '';
//                         item.style.zIndex = '';
//                         item.onclick = null;

//                         const pos = (i - index + totalItems) % totalItems;

//                         switch (pos) {
//                             case 0:
//                                 item.style.transform = 'translateX(-300px) scale(0.8)';
//                                 item.style.opacity = '0.8';
//                                 item.style.zIndex = 2;
//                                 item.classList.add('inactive');
//                                 item.onclick = () => moveCvCarousel(-1);
//                                 break;
//                             case 1:
//                                 item.style.transform = 'translateX(0px) scale(1)';
//                                 item.style.opacity = '1';
//                                 item.style.zIndex = 3;
//                                 item.classList.add('active');
//                                 item.onclick = null;
//                                 titleElement.innerText = item.getAttribute('data-title');
//                                 checkScrollable(item); // Vérifie si l'élément est scrollable
//                                 updateScrollIndicatorPosition(); // Met à jour la position de la flèche
//                                 break;
//                             case 2:
//                                 item.style.transform = 'translateX(300px) scale(0.8)';
//                                 item.style.opacity = '0.8';
//                                 item.style.zIndex = 2;
//                                 item.classList.add('inactive');
//                                 item.onclick = () => moveCvCarousel(1);
//                                 break;
//                             default:
//                                 item.style.transform = 'translateX(0px) scale(0.4)';
//                                 item.style.opacity = '0.4';
//                                 item.style.zIndex = 0;
//                                 item.classList.add('inactive');
//                                 break;
//                         }
//                     });

//                     currentIndexCv = index;
//                 }

//                 function moveCvCarousel(direction) {
//                     const items = document.querySelectorAll('.carousel-item-cv');
//                     currentIndexCv = (currentIndexCv + direction + items.length) % items.length;
//                     showCvCarouselItem(currentIndexCv);
//                 }

//                 function createArrowButtons() {
//                     const carousel = document.querySelector('.carousel-cv');
//                     if (!carousel) return;

//                     if (prevButton) prevButton.remove();
//                     if (nextButton) nextButton.remove();

//                     prevButton = document.createElement('button');
//                     prevButton.classList.add('prev_bouton');
//                     prevButton.innerHTML = '<img src="./images/flech-prev.png" alt="Previous">';
//                     carousel.appendChild(prevButton);

//                     nextButton = document.createElement('button');
//                     nextButton.classList.add('next_bouton');
//                     nextButton.innerHTML = '<img src="./images/flech-next.png" alt="Next">';
//                     carousel.appendChild(nextButton);

//                     prevButton.addEventListener('click', () => moveCvCarousel(-1));
//                     nextButton.addEventListener('click', () => moveCvCarousel(1));
//                 }

//                 function manageCarouselVisibility() {
//                     createArrowButtons();
//                     showCvCarouselItem(currentIndexCv);
//                 }

//                 createCarouselItems();
//                 showCvCarouselItem(0);

//                 manageCarouselVisibility();

//                 window.addEventListener('resize', () => {
//                     manageCarouselVisibility();
//                 });

//                 // Garder l'onglet actif
//                 window.addEventListener('focus', () => {
//                     showCvCarouselItem(currentIndexCv); // Assurer que l'affichage du carrousel est mis à jour
//                 });
//             })
//             .catch(error => {
//                 console.error('Error fetching CV data:', error);
//             });
//     }

//     loadCvCarousel();
// });

// function updateScrollIndicatorPosition() {
//     const activeItem = document.querySelector('.carousel-item-cv.active');
//     if (activeItem) {
//         const rect = activeItem.getBoundingClientRect();
//         const containerRect = carouselContainer.getBoundingClientRect();
//         scrollIndicator.style.display = 'block';
//         scrollIndicator.style.bottom = `${containerRect.bottom - rect.bottom}px`;
//         scrollIndicator.style.left = `${rect.right - containerRect.left - scrollIndicator.offsetWidth}px`;

//         console.log('Active item rect:', rect);
//         console.log('Container rect:', containerRect);
//         console.log('Scroll indicator position - bottom:', scrollIndicator.style.bottom);
//         console.log('Scroll indicator position - left:', scrollIndicator.style.left);

//         // Ajoutez un border pour vérifier la visibilité
//         scrollIndicator.style.border = '2px solid blue';
//     } else {
//         scrollIndicator.style.display = 'none';
//     }
// }

//*************************************** */

// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed');

//     function loadCvCarousel() {
//         fetch('datas/cv.json')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok ' + response.statusText);
//                 }
//                 return response.json();
//             })
//             .then(carouselData => {
//                 console.log('CV data loaded:', carouselData);

//                 const carouselContainer = document.querySelector('.carousel-cv');
//                 const titleContainer = document.createElement('div');
//                 titleContainer.setAttribute('class', 'carousel-title');

//                 const titleElement = document.createElement('h1');
//                 titleContainer.appendChild(titleElement);
//                 carouselContainer.before(titleContainer);

//                 let currentIndexCv = 0;
//                 let prevButton = null;
//                 let nextButton = null;

//                 // Création de l'indicateur de scroll
//                 const scrollIndicator = document.createElement('div');
//                 scrollIndicator.classList.add('scroll-indicator');
//                 scrollIndicator.innerHTML = '<span>&#x2193;</span>'; // flèche vers le bas

//                 function checkScrollable(item) {
//                     if (item.scrollHeight > item.clientHeight) {
//                         scrollIndicator.style.display = 'block';
//                         item.appendChild(scrollIndicator);
//                     } else {
//                         scrollIndicator.style.display = 'none';
//                     }
//                 }

//                 function createCarouselItems() {
//                     carouselContainer.innerHTML = ''; // Clear existing items

//                     carouselData.forEach((section, index) => {
//                         const carouselItem = document.createElement('div');
//                         carouselItem.setAttribute('class', 'carousel-item-cv');
//                         carouselItem.setAttribute('data-index', index);
//                         carouselItem.setAttribute('data-title', section.title);

//                         // Add title
//                         const title = document.createElement('h2');
//                         title.innerText = section.title;
//                         carouselItem.appendChild(title);

//                         // Add description items
//                         section.items.forEach(item => {
//                             const itemContainer = document.createElement('div');
//                             itemContainer.setAttribute('class', 'cv-item');

//                             const intitule = document.createElement('h3');
//                             intitule.innerText = item.intitule;
//                             itemContainer.appendChild(intitule);

//                             const description = document.createElement('p');
//                             description.innerText = item.description;
//                             itemContainer.appendChild(description);

//                             carouselItem.appendChild(itemContainer);
//                         });

//                         carouselContainer.appendChild(carouselItem);
//                     });
//                 }

//                 function showCvCarouselItem(index) {
//                     const items = document.querySelectorAll('.carousel-item-cv');
//                     const totalItems = items.length;
//                     const titleElement = document.querySelector('.carousel-title h1');

//                     if (totalItems === 0) return;

//                     titleElement.innerText = items[index].getAttribute('data-title');

//                     items.forEach((item, i) => {
//                         item.classList.remove('active', 'previous', 'next', 'inactive');
//                         item.style.transform = '';
//                         item.style.opacity = '';
//                         item.style.zIndex = '';
//                         item.onclick = null;

//                         const pos = (i - index + totalItems) % totalItems;

//                         switch (pos) {
//                             case 0:
//                                 item.style.transform = 'translateX(-300px) scale(0.8)';
//                                 item.style.opacity = '0.8';
//                                 item.style.zIndex = 2;
//                                 item.classList.add('inactive');
//                                 item.onclick = () => moveCvCarousel(-1);
//                                 break;
//                             case 1:
//                                 item.style.transform = 'translateX(0px) scale(1)';
//                                 item.style.opacity = '1';
//                                 item.style.zIndex = 3;
//                                 item.classList.add('active');
//                                 item.onclick = null;
//                                 titleElement.innerText = item.getAttribute('data-title');
//                                 checkScrollable(item); // Vérifie si l'élément est scrollable
//                                 break;
//                             case 2:
//                                 item.style.transform = 'translateX(300px) scale(0.8)';
//                                 item.style.opacity = '0.8';
//                                 item.style.zIndex = 2;
//                                 item.classList.add('inactive');
//                                 item.onclick = () => moveCvCarousel(1);
//                                 break;
//                             default:
//                                 item.style.transform = 'translateX(0px) scale(0.4)';
//                                 item.style.opacity = '0.4';
//                                 item.style.zIndex = 0;
//                                 item.classList.add('inactive');
//                                 break;
//                         }
//                     });

//                     currentIndexCv = index;
//                 }

//                 function moveCvCarousel(direction) {
//                     const items = document.querySelectorAll('.carousel-item-cv');
//                     currentIndexCv = (currentIndexCv + direction + items.length) % items.length;
//                     showCvCarouselItem(currentIndexCv);
//                 }

//                 function createArrowButtons() {
//                     const carousel = document.querySelector('.carousel-cv');
//                     if (!carousel) return;

//                     if (prevButton) prevButton.remove();
//                     if (nextButton) nextButton.remove();

//                     prevButton = document.createElement('button');
//                     prevButton.classList.add('prev_bouton');
//                     prevButton.innerHTML = '<img src="./images/flech-prev.png" alt="Previous">';
//                     carousel.appendChild(prevButton);

//                     nextButton = document.createElement('button');
//                     nextButton.classList.add('next_bouton');
//                     nextButton.innerHTML = '<img src="./images/flech-next.png" alt="Next">';
//                     carousel.appendChild(nextButton);

//                     prevButton.addEventListener('click', () => moveCvCarousel(-1));
//                     nextButton.addEventListener('click', () => moveCvCarousel(1));
//                 }

//                 function manageCarouselVisibility() {
//                     createArrowButtons();
//                     showCvCarouselItem(currentIndexCv);
//                 }

//                 createCarouselItems();
//                 showCvCarouselItem(0);

//                 manageCarouselVisibility();

//                 window.addEventListener('resize', () => {
//                     manageCarouselVisibility();
//                 });

//                 // Garder l'onglet actif
//                 window.addEventListener('focus', () => {
//                     showCvCarouselItem(currentIndexCv); // Assurer que l'affichage du carrousel est mis à jour
//                 });
//             })
//             .catch(error => {
//                 console.error('Error fetching CV data:', error);
//             });
//     }

//     loadCvCarousel();
// });


//****************************************************** */

//****************************teste scroll bar

// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed');

//     function loadCvCarousel() {
//         fetch('datas/cv.json')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok ' + response.statusText);
//                 }
//                 return response.json();
//             })
//             .then(carouselData => {
//                 console.log('CV data loaded:', carouselData);

//                 const carouselContainer = document.querySelector('.carousel-cv');
//                 const titleContainer = document.createElement('div');
//                 titleContainer.setAttribute('class', 'carousel-title');

//                 const titleElement = document.createElement('h1');
//                 titleContainer.appendChild(titleElement);
//                 carouselContainer.before(titleContainer);

//                 let currentIndexCv = 0;
//                 let prevButton = null;
//                 let nextButton = null;

//                 // Ajout d'un indicateur de scroll
//                 const scrollIndicator = document.createElement('div');
//                 scrollIndicator.classList.add('scroll-indicator');
//                 scrollIndicator.innerHTML = '&#x2193;'; // flèche vers le bas
//                 document.body.appendChild(scrollIndicator);

//                 function checkScrollable(item) {
//                     if (item.scrollHeight > item.clientHeight) {
//                         scrollIndicator.style.display = 'block';
//                         item.appendChild(scrollIndicator);
//                     } else {
//                         scrollIndicator.style.display = 'none';
//                     }
//                 }

//                 function createCarouselItems() {
//                     carouselContainer.innerHTML = ''; // Clear existing items

//                     carouselData.forEach((section, index) => {
//                         const carouselItem = document.createElement('div');
//                         carouselItem.setAttribute('class', 'carousel-item-cv');
//                         carouselItem.setAttribute('data-index', index);
//                         carouselItem.setAttribute('data-title', section.title);

//                         // Add title
//                         const title = document.createElement('h2');
//                         title.innerText = section.title;
//                         carouselItem.appendChild(title);

//                         // Add description items
//                         section.items.forEach(item => {
//                             const itemContainer = document.createElement('div');
//                             itemContainer.setAttribute('class', 'cv-item');

//                             const intitule = document.createElement('h3');
//                             intitule.innerText = item.intitule;
//                             itemContainer.appendChild(intitule);

//                             const description = document.createElement('p');
//                             description.innerText = item.description;
//                             itemContainer.appendChild(description);

//                             carouselItem.appendChild(itemContainer);
//                         });

//                         carouselContainer.appendChild(carouselItem);
//                     });
//                 }

//                 function showCvCarouselItem(index) {
//                     const items = document.querySelectorAll('.carousel-item-cv');
//                     const totalItems = items.length;
//                     const titleElement = document.querySelector('.carousel-title h1');

//                     if (totalItems === 0) return;

//                     titleElement.innerText = items[index].getAttribute('data-title');

//                     items.forEach((item, i) => {
//                         item.classList.remove('active', 'previous', 'next', 'inactive');
//                         item.style.transform = '';
//                         item.style.opacity = '';
//                         item.style.zIndex = '';
//                         item.onclick = null;

//                         const pos = (i - index + totalItems) % totalItems;

//                         switch (pos) {
//                             case 0:
//                                 item.style.transform = 'translateX(-300px) scale(0.8)';
//                                 item.style.opacity = '0.8';
//                                 item.style.zIndex = 2;
//                                 item.classList.add('inactive');
//                                 item.onclick = () => moveCvCarousel(-1);
//                                 break;
//                             case 1:
//                                 item.style.transform = 'translateX(0px) scale(1)';
//                                 item.style.opacity = '1';
//                                 item.style.zIndex = 3;
//                                 item.classList.add('active');
//                                 item.onclick = null;
//                                 titleElement.innerText = item.getAttribute('data-title');
//                                 checkScrollable(item); // Vérifie si l'élément est scrollable
//                                 break;
//                             case 2:
//                                 item.style.transform = 'translateX(300px) scale(0.8)';
//                                 item.style.opacity = '0.8';
//                                 item.style.zIndex = 2;
//                                 item.classList.add('inactive');
//                                 item.onclick = () => moveCvCarousel(1);
//                                 break;
//                             default:
//                                 item.style.transform = 'translateX(0px) scale(0.4)';
//                                 item.style.opacity = '0.4';
//                                 item.style.zIndex = 0;
//                                 item.classList.add('inactive');
//                                 break;
//                         }
//                     });

//                     currentIndexCv = index;
//                 }

//                 function moveCvCarousel(direction) {
//                     const items = document.querySelectorAll('.carousel-item-cv');
//                     currentIndexCv = (currentIndexCv + direction + items.length) % items.length;
//                     showCvCarouselItem(currentIndexCv);
//                 }

//                 function createArrowButtons() {
//                     const carousel = document.querySelector('.carousel-cv');
//                     if (!carousel) return;

//                     if (prevButton) prevButton.remove();
//                     if (nextButton) nextButton.remove();

//                     prevButton = document.createElement('button');
//                     prevButton.classList.add('prev_bouton');
//                     prevButton.innerHTML = '<img src="./images/flech-prev.png" alt="Previous">';
//                     carousel.appendChild(prevButton);

//                     nextButton = document.createElement('button');
//                     nextButton.classList.add('next_bouton');
//                     nextButton.innerHTML = '<img src="./images/flech-next.png" alt="Next">';
//                     carousel.appendChild(nextButton);

//                     prevButton.addEventListener('click', () => moveCvCarousel(-1));
//                     nextButton.addEventListener('click', () => moveCvCarousel(1));
//                 }

//                 function manageCarouselVisibility() {
//                     createArrowButtons();
//                     showCvCarouselItem(currentIndexCv);
//                 }

//                 createCarouselItems();
//                 showCvCarouselItem(0);

//                 manageCarouselVisibility();

//                 window.addEventListener('resize', () => {
//                     manageCarouselVisibility();
//                 });

//                 // Garder l'onglet actif
//                 window.addEventListener('focus', () => {
//                     showCvCarouselItem(currentIndexCv); // Assurer que l'affichage du carrousel est mis à jour
//                 });
//             })
//             .catch(error => {
//                 console.error('Error fetching CV data:', error);
//             });
//     }

//     loadCvCarousel();
// });



// ***************************************fonctionne

document.addEventListener('DOMContentLoaded', () => {
    
    console.log('DOM fully loaded and parsed');

    function loadCvCarousel() {
        fetch('datas/cv.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(carouselData => {
                console.log('CV data loaded:', carouselData);

                const carouselContainer = document.querySelector('.carousel-cv');
                const titleContainer = document.createElement('div');
                titleContainer.setAttribute('class', 'carousel-title');

                const titleElement = document.createElement('h1');
                titleContainer.appendChild(titleElement);
                carouselContainer.before(titleContainer);

                let currentIndexCv = 0;
                let prevButton = null;
                let nextButton = null;

                function createCarouselItems() {
                    carouselContainer.innerHTML = ''; // Clear existing items

                    carouselData.forEach((section, index) => {
                        const carouselItem = document.createElement('div');
                        carouselItem.setAttribute('class', 'carousel-item-cv');
                        carouselItem.setAttribute('data-index', index);
                        carouselItem.setAttribute('data-title', section.title);

                        // Add title
                        const title = document.createElement('h2');
                        title.innerText = section.title;
                        carouselItem.appendChild(title);

                        // Add description items
                        section.items.forEach(item => {
                            const itemContainer = document.createElement('div');
                            itemContainer.setAttribute('class', 'cv-item');

                            const intitule = document.createElement('h3');
                            intitule.innerText = item.intitule;
                            itemContainer.appendChild(intitule);

                            const description = document.createElement('p');
                            description.innerText = item.description;
                            itemContainer.appendChild(description);

                            carouselItem.appendChild(itemContainer);
                        });

                        carouselContainer.appendChild(carouselItem);
                    });
                }

                function showCvCarouselItem(index) {
                    const items = document.querySelectorAll('.carousel-item-cv');
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
                                item.onclick = () => moveCvCarousel(-1);
                                break;
                            case 1:
                                item.style.transform = 'translateX(0px) scale(1)';
                                item.style.opacity = '1';
                                item.style.zIndex = 3;
                                item.classList.add('active');
                                item.onclick = null;
                                titleElement.innerText = item.getAttribute('data-title');
                                break;
                            case 2:
                                item.style.transform = 'translateX(300px) scale(0.8)';
                                item.style.opacity = '0.8';
                                item.style.zIndex = 2;
                                item.classList.add('inactive');
                                item.onclick = () => moveCvCarousel(1);
                                break;
                            default:
                                item.style.transform = 'translateX(0px) scale(0.4)';
                                item.style.opacity = '0.4';
                                item.style.zIndex = 0;
                                item.classList.add('inactive');
                                break;
                        }
                    });

                    currentIndexCv = index;
                }

                function moveCvCarousel(direction) {
                    const items = document.querySelectorAll('.carousel-item-cv');
                    currentIndexCv = (currentIndexCv + direction + items.length) % items.length;
                    showCvCarouselItem(currentIndexCv);
                }

                function createArrowButtons() {
                    const carousel = document.querySelector('.carousel-cv');
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

                    prevButton.addEventListener('click', () => moveCvCarousel(-1));
                    nextButton.addEventListener('click', () => moveCvCarousel(1));
                }

                function manageCarouselVisibility() {
                    createArrowButtons();
                    showCvCarouselItem(currentIndexCv);
                }

                createCarouselItems();
                showCvCarouselItem(0);

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
                    showCvCarouselItem(currentIndexCv); // Assurer que l'affichage du carrousel est mis à jour
                });
            })
            .catch(error => {
                console.error('Error fetching CV data:', error);
            });
    }

    loadCvCarousel();
});

//************************************************************** */

//************************************************************ */

//************************************************************** */

//************************************************************ */

// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed');

//     function loadCvCarousel() {
//         fetch('datas/cv.json')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok ' + response.statusText);
//                 }
//                 return response.json();
//             })
//             .then(carouselData => {
//                 console.log('CV data loaded:', carouselData);

//                 const carouselContainer = document.querySelector('.carousel-cv');
//                 const titleContainer = document.createElement('div');
//                 titleContainer.setAttribute('class', 'carousel-title');

//                 const titleElement = document.createElement('h1');
//                 titleContainer.appendChild(titleElement);
//                 carouselContainer.before(titleContainer);

//                 let currentIndexCv = 0;
//                 let prevButton = null;
//                 let nextButton = null;

//                 function createCarouselItems() {
//                     carouselContainer.innerHTML = ''; // Clear existing items

//                     carouselData.forEach((item, index) => {
//                         const carouselItem = document.createElement('div');
//                         carouselItem.setAttribute('class', 'carousel-item-cv');
//                         carouselItem.setAttribute('data-index', index);
//                         carouselItem.setAttribute('data-link', item.link);
//                         carouselItem.setAttribute('data-title', item.title);

//                         // Add title
//                         const title = document.createElement('h2');
//                         title.innerText = item.title;
//                         carouselItem.appendChild(title);

//                         // Add description
//                         const descriptionList = document.createElement('ul');
//                         item.description.forEach(desc => {
//                             const descriptionItem = document.createElement('li');
//                             descriptionItem.innerText = desc;
//                             descriptionList.appendChild(descriptionItem);
//                         });
//                         carouselItem.appendChild(descriptionList);

//                         carouselContainer.appendChild(carouselItem);
//                     });
//                 }

//                 function showCvCarouselItem(index) {
//                     const items = document.querySelectorAll('.carousel-item-cv');
//                     const totalItems = items.length;
//                     const titleElement = document.querySelector('.carousel-title h1');

//                     if (totalItems === 0) return;

//                     titleElement.innerText = items[index].getAttribute('data-title');

//                     items.forEach((item, i) => {
//                         item.classList.remove('active', 'previous', 'next', 'inactive');
//                         item.style.transform = '';
//                         item.style.opacity = '';
//                         item.style.zIndex = '';
//                         item.onclick = null;

//                         const pos = (i - index + totalItems) % totalItems;

//                         switch (pos) {
//                             case 0:
//                                 item.style.transform = 'translateX(-300px) scale(0.8)';
//                                 item.style.opacity = '0.8';
//                                 item.style.zIndex = 2;
//                                 item.classList.add('inactive');
//                                 item.onclick = () => moveCvCarousel(-1);
//                                 break;
//                             case 1:
//                                 item.style.transform = 'translateX(0px) scale(1)';
//                                 item.style.opacity = '1';
//                                 item.style.zIndex = 3;
//                                 item.classList.add('active');
//                                 item.onclick = null;
//                                 titleElement.innerText = item.getAttribute('data-title');
//                                 break;
//                             case 2:
//                                 item.style.transform = 'translateX(300px) scale(0.8)';
//                                 item.style.opacity = '0.8';
//                                 item.style.zIndex = 2;
//                                 item.classList.add('inactive');
//                                 item.onclick = () => moveCvCarousel(1);
//                                 break;
//                             default:
//                                 item.style.transform = 'translateX(0px) scale(0.4)';
//                                 item.style.opacity = '0.4';
//                                 item.style.zIndex = 0;
//                                 item.classList.add('inactive');
//                                 break;
//                         }
//                     });

//                     currentIndexCv = index;
//                 }

//                 function moveCvCarousel(direction) {
//                     const items = document.querySelectorAll('.carousel-item-cv');
//                     currentIndexCv = (currentIndexCv + direction + items.length) % items.length;
//                     showCvCarouselItem(currentIndexCv);
//                 }

//                 function createArrowButtons() {
//                     const carousel = document.querySelector('.carousel-cv');
//                     if (!carousel) return;

//                     if (prevButton) prevButton.remove();
//                     if (nextButton) nextButton.remove();

//                     prevButton = document.createElement('button');
//                     prevButton.classList.add('prev_bouton');
//                     prevButton.innerHTML = '<img src="./images/flech-prev.png" alt="Previous">';
//                     carousel.appendChild(prevButton);

//                     nextButton = document.createElement('button');
//                     nextButton.classList.add('next_bouton');
//                     nextButton.innerHTML = '<img src="./images/flech-next.png" alt="Next">';
//                     carousel.appendChild(nextButton);

//                     prevButton.addEventListener('click', () => moveCvCarousel(-1));
//                     nextButton.addEventListener('click', () => moveCvCarousel(1));
//                 }

//                 function manageCarouselVisibility() {
//                     createArrowButtons();
//                     showCvCarouselItem(currentIndexCv);
//                 }

//                 createCarouselItems();
//                 showCvCarouselItem(0);

//                 manageCarouselVisibility();

//                 window.addEventListener('resize', () => {
//                     manageCarouselVisibility();
//                 });

//                 function goTo(url, target = '_self') {
//                     if (target === '_blank') {
//                         window.open(url, '_blank');
//                     } else {
//                         window.location.href = url;
//                     }
//                 }

//                 // Garder l'onglet actif
//                 window.addEventListener('focus', () => {
//                     showCvCarouselItem(currentIndexCv); // Assurer que l'affichage du carrousel est mis à jour
//                 });
//             })
//             .catch(error => {
//                 console.error('Error fetching CV data:', error);
//             });
//     }

//     loadCvCarousel();
// });






/****************************************************** */
/***************************************************** */

// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed');

//     fetch('datas/cv.json')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Cv data loaded:', data);

//             const carouselContainer = document.querySelector('.carousel-cv');

//             // Créer et ajouter le conteneur de titre avant le conteneur du carousel
//             const titleContainer = document.createElement('div');
//             titleContainer.setAttribute('class', 'carousel-title');
//             const titleElement = document.createElement('h1');
//             titleContainer.appendChild(titleElement);
//             carouselContainer.before(titleContainer);

//             data.forEach((item, index) => {
//                 const carouselItem = document.createElement('div');
//                 carouselItem.classList.add('carousel-item-cv');
//                 carouselItem.setAttribute('data-link', item.link);
//                 carouselItem.setAttribute('data-title', item.title);

//                 // Ajouter le titre
//                 const title = document.createElement('h2');
//                 title.innerText = item.title;
//                 carouselItem.appendChild(title);

//                 // Ajouter la description
//                 const descriptionList = document.createElement('ul');
//                 item.description.forEach(desc => {
//                     const descriptionItem = document.createElement('li');
//                     descriptionItem.innerText = desc;
//                     descriptionList.appendChild(descriptionItem);
//                 });
//                 carouselItem.appendChild(descriptionList);

//                 carouselContainer.appendChild(carouselItem);
//             });

//             showCvCarouselItem(currentIndex);

//             if (window.innerWidth <= 1024) {
//                 createArrowButtons();
//             }

//             window.addEventListener('resize', () => {
//                 if (window.innerWidth <= 1024) {
//                     createArrowButtons();
//                 } else {
//                     if (prevButton) prevButton.remove();
//                     if (nextButton) nextButton.remove();
//                     prevButton = null;
//                     nextButton = null;
//                 }
//                 showCvCarouselItem(currentIndex);
//             });
//         })
//         .catch(error => console.error('Error loading JSON:', error));
// });

// let currentIndex = 0;
// let prevButton = null;
// let nextButton = null;

// function showCvCarouselItem(index) {
//     const items = document.querySelectorAll('.carousel-item-cv');
//     const totalItems = items.length;
//     const titleElement = document.querySelector('.carousel-title h1');

//     titleElement.innerText = items[index].getAttribute('data-title');

//     items.forEach((item, i) => {
//         item.classList.remove('active', 'previous', 'next', 'inactive');
//         const pos = (i - index + totalItems) % totalItems;

//         if (window.innerWidth <= 380) {
//             if (i === index) {
//                 item.classList.add('active');
//                 item.onclick = () => goTo(item.getAttribute('data-link'));
//             } else {
//                 item.classList.add('inactive');
//                 item.onclick = null;
//             }
//         } else if (window.innerWidth <= 1024) {
//             if (i === index) {
//                 item.classList.add('active');
//                 item.onclick = () => goTo(item.getAttribute('data-link'));
//             } else {
//                 item.classList.add('inactive');
//                 item.onclick = null;
//             }
//         // } else if (window.innerWidth <= 1024) {
//         //     if (i === index) {
//         //         item.classList.add('active');
//         //         item.onclick = () => goTo(item.getAttribute('data-link'));
//         //     } else if (i === (index - 1 + totalItems) % totalItems) {
//         //         item.classList.add('previous');
//         //         item.onclick = () => moveCarousel(-1);
//         //     } else if (i === (index + 1) % totalItems) {
//         //         item.classList.add('next');
//         //         item.onclick = () => moveCarousel(1);
//         //     } else {
//         //         item.classList.add('inactive');
//         //         item.onclick = null;
//         //     }
//         } else {
//             switch (pos) {
//                 case 0:
//                     item.style.transform = 'translateX(-300px) scale(0.8)';
//                     item.style.opacity = '0.8';
//                     item.style.zIndex = 2;
//                     item.onclick = () => moveCarousel(-1);
//                     break;
//                 case 1:
//                     item.style.transform = 'translateX(0px) scale(1)';
//                     item.style.opacity = '1';
//                     item.style.zIndex = 3;
//                     item.classList.add('active');
//                     item.onclick = () => goTo(item.getAttribute('data-link'));
//                     titleElement.innerText = item.getAttribute('data-title');
//                     break;
//                 case 2:
//                     item.style.transform = 'translateX(300px) scale(0.8)';
//                     item.style.opacity = '0.8';
//                     item.style.zIndex = 2;
//                     item.onclick = () => moveCarousel(1);
//                     break;
//                 default:
//                     item.style.transform = 'translateX(0px) scale(0.4)';
//                     item.style.opacity = '0.4';
//                     item.style.zIndex = 0;
//                     item.onclick = null;
//                     break;
//             }
//         }
//     });
// }

// function moveCarousel(direction) {
//     const items = document.querySelectorAll('.carousel-item-cv');
//     currentIndex = (currentIndex + direction + items.length) % items.length;
//     showCvCarouselItem(currentIndex);
// }

// function goTo(url, target = '_self') {
//     if (target === '_blank') {
//         window.open(url, '_blank');
//     } else {
//         window.location.href = url;
//     }
// }

// function createArrowButtons() {
//     const carousel = document.querySelector('.carousel-cv');
//     if (!carousel) return;

//     if (prevButton) prevButton.remove();
//     if (nextButton) nextButton.remove();

//     prevButton = document.createElement('button');
//     prevButton.classList.add('prev_bouton');
//     prevButton.innerHTML = '<img src="./images/flech-prev.png" alt="Previous">';
//     carousel.appendChild(prevButton);

//     nextButton = document.createElement('button');
//     nextButton.classList.add('next_bouton');
//     nextButton.innerHTML = '<img src="./images/flech-next.png" alt="Next">';
//     carousel.appendChild(nextButton);

//     prevButton.addEventListener('click', () => {
//         moveCarousel(-1);
//     });

//     nextButton.addEventListener('click', () => {
//         moveCarousel(1);
//     });
// }

