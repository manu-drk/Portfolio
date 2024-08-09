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
