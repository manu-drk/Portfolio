document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    function loadCarousel() {
        fetch('datas/index.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(carouselData => {
                console.log(' data loaded:', carouselData);

                const carouselContainer = document.querySelector('.carousel');
                const titleContainer = document.createElement('div');
                titleContainer.setAttribute('class', 'carousel-title');

                const titleElement = document.createElement('h1');
                titleContainer.appendChild(titleElement);
                carouselContainer.before(titleContainer);

                let currentIndex = 0;
                let prevButton = null;
                let nextButton = null;

                function createCarouselItems() {
                    carouselContainer.innerHTML = ''; // Clear existing items

                    carouselData.forEach((item, index) => {
                        const carouselItem = document.createElement('div');
                carouselItem.setAttribute('class', 'carousel-item');
                carouselItem.setAttribute('data-index', index);
                carouselItem.setAttribute('data-link', item.link);
                carouselItem.setAttribute('data-title', item.title);

                        // Add title
                        // const title = document.createElement('h2');
                        // title.innerText = item.title;
                        // carouselItem.appendChild(title);

                        // Add description
                        // Add cover image
                const img = document.createElement('img');
                img.src = item.cover;
                carouselItem.appendChild(img);

                carouselContainer.appendChild(carouselItem);
                    });
                }

                function showCarouselItem(index) {
                    const items = document.querySelectorAll('.carousel-item');
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
                                item.onclick = () => moveCarousel(-1);
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
                                item.onclick = () => moveCarousel(1);
                                break;
                            default:
                                item.style.transform = 'translateX(0px) scale(0.4)';
                                item.style.opacity = '0.4';
                                item.style.zIndex = 0;
                                item.classList.add('inactive');
                                break;
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

                function manageCarouselVisibility() {
                    createArrowButtons();
                    showCarouselItem(currentIndex);
                }

                createCarouselItems();
                showCarouselItem(0);

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
                    showCarouselItem(currentIndex); // Assurer que l'affichage du carrousel est mis à jour
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    loadCarousel();
});
