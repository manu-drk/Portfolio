document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    let currentIndex = 0;
    let prevButton = null;
    let nextButton = null;
    let isDesktopMode = window.innerWidth > 1024;

    function fetchData(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            });
    }

    function createCarousel(data) {
        const carouselContainer = document.querySelector('.carousel');
        const titleContainer = document.createElement('div');
        titleContainer.setAttribute('class', 'carousel-title');
        const titleElement = document.createElement('h1');
        titleContainer.appendChild(titleElement);
        carouselContainer.before(titleContainer);

        const createCarouselItems = () => {
            carouselContainer.innerHTML = ''; // Clear existing items

            data.forEach((item, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.setAttribute('class', 'carousel-item');
                carouselItem.setAttribute('data-index', index);
                carouselItem.setAttribute('data-link', item.link);
                carouselItem.setAttribute('data-title', item.title);

                // Add cover image
                const img = document.createElement('img');
                img.src = item.cover;
                carouselItem.appendChild(img);

                carouselContainer.appendChild(carouselItem);
            });
        };

        function showCarouselItem(index) {
            const items = document.querySelectorAll('.carousel-item');
            const totalItems = items.length;

            if (totalItems === 0) return;

            titleElement.innerText = items[index].getAttribute('data-title');

            items.forEach((item, i) => {
                item.classList.remove('active', 'previous', 'next', 'inactive');
                item.style.transform = '';
                item.style.opacity = '';
                item.style.zIndex = '';
                item.onclick = null;

                const pos = (i - index + totalItems) % totalItems;

                if (!isDesktopMode) {
                    if (i === index) {
                        item.classList.add('active');
                        item.onclick = () => goTo(item.getAttribute('data-link'));
                    } else {
                        item.classList.add('inactive');
                    }
                } else {
                    switch (pos) {
                        case 0:
                            item.style.transform = 'translateX(-300px) scale(0.8)';
                            item.style.opacity = '0.8';
                            item.style.zIndex = 2;
                            item.classList.add('inactive');
                            item.onclick = () => moveCarousel(-1);
                            break;
                        case 1:
                            item.style.transform = 'translateX(0px) scale(1)';
                            item.style.opacity = '1';
                            item.style.zIndex = 3;
                            item.classList.add('active');
                            item.onclick = () => goTo(item.getAttribute('data-link'));
                            break;
                        case 2:
                            item.style.transform = 'translateX(300px) scale(0.8)';
                            item.style.opacity = '0.8';
                            item.style.zIndex = 2;
                            item.classList.add('inactive');
                            item.onclick = () => moveCarousel(1);
                            break;
                        default:
                            item.style.transform = 'translateX(0px) scale(0.4)';
                            item.style.opacity = '0.4';
                            item.style.zIndex = 0;
                            item.classList.add('inactive');
                            break;
                    }
                }
            });

            currentIndex = index;
        }

        function moveCarousel(direction) {
            const items = document.querySelectorAll('.carousel-item');
            currentIndex = (currentIndex + direction + items.length) % items.length;
            showCarouselItem(currentIndex);
        }

        function createArrowButtons() {
            const carousel = document.querySelector('.carousel');
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

            prevButton.addEventListener('click', () => moveCarousel(-1));
            nextButton.addEventListener('click', () => moveCarousel(1));
        }

        function removeArrowButtons() {
            if (prevButton) prevButton.remove();
            if (nextButton) nextButton.remove();
            prevButton = null;
            nextButton = null;
        }

        function handleResizeOrOrientationChange() {
            const newIsDesktopMode = window.innerWidth > 1024;
            if (newIsDesktopMode !== isDesktopMode) {
                isDesktopMode = newIsDesktopMode;
                if (isDesktopMode) {
                    removeArrowButtons();
                } else {
                    createArrowButtons();
                }
            }
            showCarouselItem(currentIndex); // Ensure the carousel is correctly displayed
        }

        function goTo(url, target = '_self') {
            if (target === '_blank') {
                window.open(url, '_blank');
            } else {
                window.location.href = url;
            }
        }

        createCarouselItems();
        showCarouselItem(0);
        handleResizeOrOrientationChange();
        window.addEventListener('resize', handleResizeOrOrientationChange);
        window.addEventListener('orientationchange', handleResizeOrOrientationChange);
    }

    function initializeCarousel(url) {
        fetchData(url)
            .then(data => {
                createCarousel(data);
            })
            .catch(error => {
                console.error('Error fetching carousel data:', error);
            });
    }

    // Initialize the carousel (replace this URL with the actual one)
    initializeCarousel('datas/index.json');

    // Example of how to handle changing to a different carousel
    document.querySelectorAll('.carousel-switch').forEach(button => {
        button.addEventListener('click', (e) => {
            const url = e.target.getAttribute('data-carousel-url');
            initializeCarousel(url);
        });
    });

    // Ensure carousel is correctly updated when the tab is focused
    window.addEventListener('focus', () => {
        showCarouselItem(currentIndex); // Ensure carousel is updated when tab is focused
    });
});


// document.addEventListener('DOMContentLoaded', () => {
//     let currentIndex = 0;
//     let prevButton = null;
//     let nextButton = null;
//     let isDesktopMode = window.innerWidth > 1024;

//     function fetchData(url) {
//         return fetch(url)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`Network response was not ok: ${response.statusText}`);
//                 }
//                 return response.json();
//             });
//     }

//     function createCarousel(data) {
//         const carouselContainer = document.querySelector('.carousel');
//         carouselContainer.innerHTML = '';  // Clear existing items

//         const titleContainer = document.createElement('div');
//         titleContainer.setAttribute('class', 'carousel-title');
//         const titleElement = document.createElement('h1');
//         titleContainer.appendChild(titleElement);
//         carouselContainer.before(titleContainer);

//         data.forEach(item => {
//             const carouselItem = document.createElement('div');
//             carouselItem.classList.add('carousel-item');
//             carouselItem.setAttribute('data-link', item.link);
//             carouselItem.setAttribute('data-title', item.title);

//             const img = document.createElement('img');
//             img.src = item.cover;

//             carouselItem.appendChild(img);
//             carouselContainer.appendChild(carouselItem);
//         });

//         showCarouselItem(currentIndex);
//         handleResizeOrOrientationChange();  // Ensure buttons are correctly handled
//     }

//     function showCarouselItem(index) {
//         const items = document.querySelectorAll('.carousel-item');
//         const totalItems = items.length;
//         const titleElement = document.querySelector('.carousel-title h1');

//         if (totalItems === 0) return;

//         items.forEach((item, i) => {
//             item.classList.remove('active', 'previous', 'next', 'inactive');
//             item.style.transform = '';
//             item.style.opacity = '';
//             item.style.zIndex = '';
//             item.onclick = null;

//             const pos = (i - index + totalItems) % totalItems;

//             if (!isDesktopMode) {
//                 if (i === index) {
//                     item.classList.add('active');
//                     item.onclick = () => goTo(item.getAttribute('data-link'));
//                     titleElement.innerText = item.getAttribute('data-title');
//                 } else {
//                     item.classList.add('inactive');
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

//         console.log(`Current index: ${index}, Title: ${titleElement.innerText}`);
//     }

//     function moveCarousel(direction) {
//         const items = document.querySelectorAll('.carousel-item');
//         currentIndex = (currentIndex + direction + items.length) % items.length;
//         showCarouselItem(currentIndex);
//     }

//     function goTo(url, target = '_self') {
//         if (target === '_blank') {
//             window.open(url, '_blank');
//         } else {
//             window.location.href = url;
//         }
//     }

//     function createArrowButtons() {
//         const carousel = document.querySelector('.carousel');
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

//     function removeArrowButtons() {
//         if (prevButton) prevButton.remove();
//         if (nextButton) nextButton.remove();
//         prevButton = null;
//         nextButton = null;
//     }

//     function handleResizeOrOrientationChange() {
//         const newIsDesktopMode = window.innerWidth > 1024;
//         if (newIsDesktopMode !== isDesktopMode) {
//             isDesktopMode = newIsDesktopMode;
//             if (isDesktopMode) {
//                 removeArrowButtons();
//             } else {
//                 createArrowButtons();
//             }
//         }
//         showCarouselItem(currentIndex); // Assure que le carrousel est correctement affiché
//     }

//     function initializeCarousel(url) {
//         fetchData(url)
//             .then(data => {
//                 createCarousel(data);
//                 isDesktopMode = window.innerWidth > 1024;
//                 window.addEventListener('resize', handleResizeOrOrientationChange);
//                 window.addEventListener('orientationchange', handleResizeOrOrientationChange);
//                 handleResizeOrOrientationChange(); // Appel pour mettre à jour la visibilité des boutons à l'initialisation
//             })
//             .catch(error => console.error('Error loading JSON:', error));
//     }

//     // Initialize the first carousel (replace this URL with the actual one)
//     initializeCarousel('datas/index.json');

//     // Example of how to handle changing to a different carousel
//     document.querySelectorAll('.carousel-switch').forEach(button => {
//         button.addEventListener('click', (e) => {
//             const url = e.target.getAttribute('data-carousel-url');
//             initializeCarousel(url);
//         });
//     });
// });





//*********************************** */

// document.addEventListener('DOMContentLoaded', () => {
//     let currentIndex = 0;
//     let prevButton = null;
//     let nextButton = null;
//     let isDesktopMode = window.innerWidth > 1024;

//     function fetchData(url) {
//         return fetch(url)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`Network response was not ok: ${response.statusText}`);
//                 }
//                 return response.json();
//             });
//     }

//     function createCarousel(data) {
//         const carouselContainer = document.querySelector('.carousel');
//         carouselContainer.innerHTML = '';  // Clear existing items

//         const titleContainer = document.createElement('div');
//         titleContainer.setAttribute('class', 'carousel-title');
//         const titleElement = document.createElement('h1');
//         titleContainer.appendChild(titleElement);
//         carouselContainer.before(titleContainer);

//         data.forEach(item => {
//             const carouselItem = document.createElement('div');
//             carouselItem.classList.add('carousel-item');
//             carouselItem.setAttribute('data-link', item.link);
//             carouselItem.setAttribute('data-title', item.title);

//             const img = document.createElement('img');
//             img.src = item.cover;

//             carouselItem.appendChild(img);
//             carouselContainer.appendChild(carouselItem);
//         });

//         showCarouselItem(currentIndex);
//         handleResizeOrOrientationChange();  // Ensure buttons are correctly handled
//     }

//     function showCarouselItem(index) {
//         const items = document.querySelectorAll('.carousel-item');
//         const totalItems = items.length;
//         const titleElement = document.querySelector('.carousel-title h1');

//         if (totalItems === 0) return;

//         items.forEach((item, i) => {
//             item.classList.remove('active', 'previous', 'next', 'inactive');
//             item.style.transform = '';
//             item.style.opacity = '';
//             item.style.zIndex = '';
//             item.onclick = null;

//             const pos = (i - index + totalItems) % totalItems;

//             if (!isDesktopMode) {
//                 if (i === index) {
//                     item.classList.add('active');
//                     item.onclick = () => goTo(item.getAttribute('data-link'));
//                     titleElement.innerText = item.getAttribute('data-title');
//                 } else {
//                     item.classList.add('inactive');
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

//         console.log(`Current index: ${index}, Title: ${titleElement.innerText}`);
//     }

//     function moveCarousel(direction) {
//         const items = document.querySelectorAll('.carousel-item');
//         currentIndex = (currentIndex + direction + items.length) % items.length;
//         showCarouselItem(currentIndex);
//     }

//     function goTo(url, target = '_self') {
//         if (target === '_blank') {
//             window.open(url, '_blank');
//         } else {
//             window.location.href = url;
//         }
//     }

//     function createArrowButtons() {
//         const carousel = document.querySelector('.carousel');
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

//     function removeArrowButtons() {
//         if (prevButton) prevButton.remove();
//         if (nextButton) nextButton.remove();
//         prevButton = null;
//         nextButton = null;
//     }

//     function handleResizeOrOrientationChange() {
//         const newIsDesktopMode = window.innerWidth > 1024;
//         if (newIsDesktopMode !== isDesktopMode) {
//             isDesktopMode = newIsDesktopMode;
//             if (isDesktopMode) {
//                 removeArrowButtons();
//             } else {
//                 createArrowButtons();
//             }
//             // Réinitialiser l'index au premier élément lors du changement de mode
//             // currentIndex = 0;
//         }
//         showCarouselItem(currentIndex); // Assure que le carrousel est correctement affiché
//     }

//     function initializeCarousel(url) {
//         fetchData(url)
//             .then(data => {
//                 createCarousel(data);
//                 isDesktopMode = window.innerWidth > 1024;
//                 window.addEventListener('resize', handleResizeOrOrientationChange);
//                 window.addEventListener('orientationchange', handleResizeOrOrientationChange);
//                 handleResizeOrOrientationChange(); // Appel pour mettre à jour la visibilité des boutons à l'initialisation
//             })
//             .catch(error => console.error('Error loading JSON:', error));
//     }

//     // Initialize the first carousel (replace this URL with the actual one)
//     initializeCarousel('datas/index.json');

//     // Example of how to handle changing to a different carousel
//     document.querySelectorAll('.carousel-switch').forEach(button => {
//         button.addEventListener('click', (e) => {
//             const url = e.target.getAttribute('data-carousel-url');
//             initializeCarousel(url);
//         });
//     });
// });


/************************ fonctionne mais pas synchro entre les modes  */

// document.addEventListener('DOMContentLoaded', () => {
//     let currentIndex = 0;
//     let prevButton = null;
//     let nextButton = null;

//     function fetchData(url) {
//         return fetch(url)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`Network response was not ok: ${response.statusText}`);
//                 }
//                 return response.json();
//             });
//     }

//     function createCarousel(data) {
//         const carouselContainer = document.querySelector('.carousel');
//         carouselContainer.innerHTML = '';  // Clear existing items

//         const titleContainer = document.createElement('div');
//         titleContainer.setAttribute('class', 'carousel-title');
//         const titleElement = document.createElement('h1');
//         titleContainer.appendChild(titleElement);
//         carouselContainer.before(titleContainer);

//         data.forEach(item => {
//             const carouselItem = document.createElement('div');
//             carouselItem.classList.add('carousel-item');
//             carouselItem.setAttribute('data-link', item.link);
//             carouselItem.setAttribute('data-title', item.title);

//             const img = document.createElement('img');
//             img.src = item.cover;

//             carouselItem.appendChild(img);
//             carouselContainer.appendChild(carouselItem);
//         });

//         showCarouselItem(currentIndex);
//         handleResizeOrOrientationChange();  // Ensure buttons are correctly handled
//     }

//     function showCarouselItem(index) {
//         const items = document.querySelectorAll('.carousel-item');
//         const totalItems = items.length;
//         const titleElement = document.querySelector('.carousel-title h1');

//         if (totalItems === 0) return;

//         items.forEach((item, i) => {
//             item.classList.remove('active', 'previous', 'next', 'inactive');
//             item.style.transform = '';
//             item.style.opacity = '';
//             item.style.zIndex = '';
//             item.onclick = null;

//             const pos = (i - index + totalItems) % totalItems;

//             if (window.innerWidth <= 1024) {
//                 if (i === index) {
//                     item.classList.add('active');
//                     item.onclick = () => goTo(item.getAttribute('data-link'));
//                     titleElement.innerText = item.getAttribute('data-title');
//                 } else {
//                     item.classList.add('inactive');
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

//         console.log(`Current index: ${index}, Title: ${titleElement.innerText}`);
//     }

//     function moveCarousel(direction) {
//         const items = document.querySelectorAll('.carousel-item');
//         currentIndex = (currentIndex + direction + items.length) % items.length;
//         showCarouselItem(currentIndex);
//     }

//     function goTo(url, target = '_self') {
//         if (target === '_blank') {
//             window.open(url, '_blank');
//         } else {
//             window.location.href = url;
//         }
//     }

//     function createArrowButtons() {
//         const carousel = document.querySelector('.carousel');
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

//     function removeArrowButtons() {
//         if (prevButton) prevButton.remove();
//         if (nextButton) nextButton.remove();
//         prevButton = null;
//         nextButton = null;
//     }

//     function handleResizeOrOrientationChange() {
//         if (window.innerWidth <= 1024) {
//             createArrowButtons();
//         } else {
//             removeArrowButtons();
//         }
//         showCarouselItem(currentIndex); // Ensure the carousel item is correctly displayed
//     }

//     function initializeCarousel(url) {
//         fetchData(url)
//             .then(data => {
//                 createCarousel(data);
//                 window.addEventListener('resize', handleResizeOrOrientationChange);
//                 window.addEventListener('orientationchange', handleResizeOrOrientationChange);
//                 handleResizeOrOrientationChange(); // Call to update button visibility on initialization
//             })
//             .catch(error => console.error('Error loading JSON:', error));
//     }

//     // Initialize the first carousel (replace this URL with the actual one)
//     initializeCarousel('datas/index.json');

//     // Example of how to handle changing to a different carousel
//     document.querySelectorAll('.carousel-switch').forEach(button => {
//         button.addEventListener('click', (e) => {
//             const url = e.target.getAttribute('data-carousel-url');
//             initializeCarousel(url);
//         });
//     });
// });




/************* fonctionne au niveau de l'item en responsive mais pas desktop */

// document.addEventListener('DOMContentLoaded', () => {
//     let currentIndex = 0;
//     let prevButton = null;
//     let nextButton = null;

//     function fetchData(url) {
//         return fetch(url)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`Network response was not ok: ${response.statusText}`);
//                 }
//                 return response.json();
//             });
//     }

//     function createCarousel(data) {
//         const carouselContainer = document.querySelector('.carousel');
//         carouselContainer.innerHTML = '';  // Clear existing items

//         const titleContainer = document.createElement('div');
//         titleContainer.setAttribute('class', 'carousel-title');
//         const titleElement = document.createElement('h1');
//         titleContainer.appendChild(titleElement);
//         carouselContainer.before(titleContainer);

//         data.forEach(item => {
//             const carouselItem = document.createElement('div');
//             carouselItem.classList.add('carousel-item');
//             carouselItem.setAttribute('data-link', item.link);
//             carouselItem.setAttribute('data-title', item.title);

//             const img = document.createElement('img');
//             img.src = item.cover;

//             carouselItem.appendChild(img);
//             carouselContainer.appendChild(carouselItem);
//         });

//         showCarouselItem(currentIndex);
//         handleResizeOrOrientationChange();  // Ensure buttons are correctly handled
//     }

//     function showCarouselItem(index) {
//         const items = document.querySelectorAll('.carousel-item');
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
//                 }
//             } else if (window.innerWidth <= 1024) {
//                 if (i === index) {
//                     item.classList.add('active');
//                     item.onclick = () => goTo(item.getAttribute('data-link'));
//                 } else {
//                     item.classList.add('inactive');
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

//     function moveCarousel(direction) {
//         const items = document.querySelectorAll('.carousel-item');
//         currentIndex = (currentIndex + direction + items.length) % items.length;
//         showCarouselItem(currentIndex);
//     }

//     function goTo(url, target = '_self') {
//         if (target === '_blank') {
//             window.open(url, '_blank');
//         } else {
//             window.location.href = url;
//         }
//     }

//     function createArrowButtons() {
//         const carousel = document.querySelector('.carousel');
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

//     function removeArrowButtons() {
//         if (prevButton) prevButton.remove();
//         if (nextButton) nextButton.remove();
//         prevButton = null;
//         nextButton = null;
//     }

//     function handleResizeOrOrientationChange() {
//         if (window.innerWidth <= 1024) {
//             createArrowButtons();
//         } else {
//             removeArrowButtons();
//         }
//         showCarouselItem(currentIndex); // Ensure the carousel item is correctly displayed
//     }

//     function initializeCarousel(url) {
//         fetchData(url)
//             .then(data => {
//                 createCarousel(data);
//                 window.addEventListener('resize', handleResizeOrOrientationChange);
//                 window.addEventListener('orientationchange', handleResizeOrOrientationChange);
//                 handleResizeOrOrientationChange(); // Call to update button visibility on initialization
//             })
//             .catch(error => console.error('Error loading JSON:', error));
//     }

//     // Initialize the first carousel (you might need to replace this URL with the actual one)
//     initializeCarousel('datas/index.json');

//     // Example of how to handle changing to a different carousel
//     document.querySelectorAll('.carousel-switch').forEach(button => {
//         button.addEventListener('click', (e) => {
//             const url = e.target.getAttribute('data-carousel-url');
//             initializeCarousel(url);
//         });
//     });
// });


// ***** fonctionne mais ne garde pas le même item actif

// document.addEventListener('DOMContentLoaded', () => {
//     fetch('datas/index.json')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Network response was not ok: ${response.statusText}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             const carouselContainer = document.querySelector('.carousel');

//             // Créer et ajouter le conteneur de titre avant le conteneur du carousel
//             const titleContainer = document.createElement('div');
//             titleContainer.setAttribute('class', 'carousel-title');

//             const titleElement = document.createElement('h1');
//             titleContainer.appendChild(titleElement);
//             carouselContainer.before(titleContainer);

//             // Créer les éléments du carrousel
//             data.forEach((item, index) => {
//                 const carouselItem = document.createElement('div');
//                 carouselItem.classList.add('carousel-item');
//                 carouselItem.setAttribute('data-link', item.link);
//                 carouselItem.setAttribute('data-title', item.title);

//                 const img = document.createElement('img');
//                 img.src = item.cover;

//                 carouselItem.appendChild(img);
//                 carouselContainer.appendChild(carouselItem);
//             });

//             let currentIndex = 0;
//             let prevButton = null;
//             let nextButton = null;

//             function showCarouselItem(index) {
//                 const items = document.querySelectorAll('.carousel-item');
//                 const totalItems = items.length;
//                 const titleElement = document.querySelector('.carousel-title h1');

//                 if (totalItems === 0) return;

//                 titleElement.innerText = items[index].getAttribute('data-title');

//                 items.forEach((item, i) => {
//                     item.classList.remove('active', 'previous', 'next', 'inactive');
//                     item.style.transform = '';
//                     item.style.opacity = '';
//                     item.style.zIndex = '';
//                     item.onclick = null;

//                     if (window.innerWidth <= 380) {
//                         if (i === index) {
//                             item.classList.add('active');
//                             item.onclick = () => goTo(item.getAttribute('data-link'));
//                         } else {
//                             item.classList.add('inactive');
//                         }
//                     } else if (window.innerWidth <= 1024) {
//                         if (i === index) {
//                             item.classList.add('active');
//                             item.onclick = () => goTo(item.getAttribute('data-link'));
//                         } else {
//                             item.classList.add('inactive');
//                         }
//                     } else {
//                         const pos = (i - index + totalItems) % totalItems;

//                         switch (pos) {
//                             case 0:
//                                 item.style.transform = 'translateX(-300px) scale(0.8)';
//                                 item.style.opacity = '0.8';
//                                 item.style.zIndex = 2;
//                                 item.onclick = () => moveCarousel(-1);
//                                 break;
//                             case 1:
//                                 item.style.transform = 'translateX(0px) scale(1)';
//                                 item.style.opacity = '1';
//                                 item.style.zIndex = 3;
//                                 item.classList.add('active');
//                                 item.onclick = () => goTo(item.getAttribute('data-link'));
//                                 titleElement.innerText = item.getAttribute('data-title');
//                                 break;
//                             case 2:
//                                 item.style.transform = 'translateX(300px) scale(0.8)';
//                                 item.style.opacity = '0.8';
//                                 item.style.zIndex = 2;
//                                 item.onclick = () => moveCarousel(1);
//                                 break;
//                             default:
//                                 item.style.transform = 'translateX(0px) scale(0.4)';
//                                 item.style.opacity = '0.4';
//                                 item.style.zIndex = 0;
//                                 break;
//                         }
//                     }
//                 });
//             }

//             function moveCarousel(direction) {
//                 const items = document.querySelectorAll('.carousel-item');
//                 currentIndex = (currentIndex + direction + items.length) % items.length;
//                 showCarouselItem(currentIndex);
//             }

//             function goTo(url, target = '_self') {
//                 if (target === '_blank') {
//                     window.open(url, '_blank');
//                 } else {
//                     window.location.href = url;
//                 }
//             }

//             function createArrowButtons() {
//                 const carousel = document.querySelector('.carousel');
//                 if (!carousel) return;

//                 if (prevButton) prevButton.remove();
//                 if (nextButton) nextButton.remove();

//                 prevButton = document.createElement('button');
//                 prevButton.classList.add('prev_bouton');
//                 prevButton.innerHTML = '<img src="./images/flech-prev.png" alt="Previous">';
//                 carousel.appendChild(prevButton);

//                 nextButton = document.createElement('button');
//                 nextButton.classList.add('next_bouton');
//                 nextButton.innerHTML = '<img src="./images/flech-next.png" alt="Next">';
//                 carousel.appendChild(nextButton);

//                 prevButton.addEventListener('click', () => moveCarousel(-1));
//                 nextButton.addEventListener('click', () => moveCarousel(1));

//                 console.log('Arrow buttons created');
//             }

//             function removeArrowButtons() {
//                 if (prevButton) prevButton.remove();
//                 if (nextButton) nextButton.remove();
//                 prevButton = null;
//                 nextButton = null;

//                 console.log('Arrow buttons removed');
//             }

//             function handleResizeOrOrientationChange() {
//                 if (window.innerWidth <= 1024) {
//                     createArrowButtons();
//                 } else {
//                     removeArrowButtons();
//                 }
//                 showCarouselItem(currentIndex);
//             }

//             window.addEventListener('resize', handleResizeOrOrientationChange);
//             window.addEventListener('orientationchange', handleResizeOrOrientationChange);

//             showCarouselItem(currentIndex);
//             handleResizeOrOrientationChange();
//         })
//         .catch(error => console.error('Error loading JSON:', error));
// });

//******************************** fonctionne mais pas d'idem actif 

// document.addEventListener('DOMContentLoaded', () => {
//     fetch('datas/index.json')
//         .then(response => response.json())
//         .then(data => {
//             const carouselContainer = document.querySelector('.carousel');

//             // Créer et ajouter le conteneur de titre avant le conteneur du carousel
//             const titleContainer = document.createElement('div');
//             titleContainer.setAttribute('class', 'carousel-title');

//             const titleElement = document.createElement('h1');
//             titleContainer.appendChild(titleElement);
//             carouselContainer.before(titleContainer);

//             data.forEach((item, index) => {
//                 const carouselItem = document.createElement('div');
//                 carouselItem.classList.add('carousel-item');
//                 carouselItem.setAttribute('data-link', item.link);
//                 carouselItem.setAttribute('data-title', item.title);

//                 const img = document.createElement('img');
//                 img.src = item.cover;

//                 carouselItem.appendChild(img);
//                 carouselContainer.appendChild(carouselItem);
//             });

//             showCarouselItem(currentIndex);

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
//                 showCarouselItem(currentIndex);
//             });
//         })
//         .catch(error => console.error('Error loading JSON:', error));
// });

// let currentIndex = 0;
// let prevButton = null;
// let nextButton = null;

// function showCarouselItem(index) {
//     const items = document.querySelectorAll('.carousel-item');
//     const totalItems = items.length;
//     const titleElement = document.querySelector('.carousel-title h1');
    
//     // Mise à jour du titre avec l'élément central
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
//                     // Mise à jour du titre avec l'élément central
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
//     const items = document.querySelectorAll('.carousel-item');
//     currentIndex = (currentIndex + direction + items.length) % items.length;
//     showCarouselItem(currentIndex);
// }

// function goTo(url, target = '_self') {
//     if (target === '_blank') {
//         window.open(url, '_blank');
//     } else {
//         window.location.href = url;
//     }
// }

// function createArrowButtons() {
//     const carousel = document.querySelector('.carousel');
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

