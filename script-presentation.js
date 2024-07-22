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
                const detailsContainer = document.createElement('div');
                detailsContainer.setAttribute('class', 'details-container');
                carouselContainer.after(detailsContainer);
                
                carouselData.forEach((item, index) => {
                    const carouselItem = document.createElement('div');
                    carouselItem.setAttribute('class', 'carousel-item-presentation');
                    
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

                // Affichage initial du carrousel
                showPresentationCarouselItem(currentIndexPresentation);
            })
            .catch(error => console.error('Error fetching Presentation carousel data:', error));
    }

    function showPresentationCarouselItem(index) {
        const items = document.querySelectorAll('.carousel-item-presentation');
        const totalItems = items.length;
        
        items.forEach((item, i) => {
            const pos = (i - index + totalItems) % totalItems;
            item.classList.remove('blur');
            switch (pos) {
                case 0:
                    item.style.transform = 'translateX(-300px) scale(0.8)';
                    item.style.opacity = '0.8';
                    item.style.zIndex = 2;
                    item.classList.add('carousel-item-pointer');
                    item.onclick = () => movePresentationCarousel(-1);
                    item.classList.add('blur');
                    break;
                case 1:
                    item.style.transform = 'translateX(0px) scale(1)';
                    item.style.opacity = '1';
                    item.style.zIndex = 3;
                    item.classList.remove('carousel-item-pointer');
                    item.onclick = null;;
                    break;
                case 2:
                    item.style.transform = 'translateX(300px) scale(0.8)';
                    item.style.opacity = '0.8';
                    item.style.zIndex = 2;
                    item.classList.add('carousel-item-pointer');
                    item.onclick = () => movePresentationCarousel(1);
                    item.classList.add('blur');
                    break;
                default:
                    item.style.transform = 'translateX(0px) scale(0.4)';
                    item.style.opacity = '0.4';
                    item.style.zIndex = 0;
                    item.onclick = null;
                    item.classList.add('blur');
                    break;
            }
        });

        // Affichage des détails correspondants (à adapter selon votre structure HTML)
        // Si vous avez des détails associés à chaque élément, vous pouvez les afficher ici.

        // Exemple (à adapter) :
        // const details = document.querySelectorAll('.detail-item');
        // details.forEach((detail, i) => {
        //     detail.style.display = i === index ? 'block' : 'none';
        // });
    }

    function movePresentationCarousel(direction) {
        const items = document.querySelectorAll('.carousel-item-presentation');
        currentIndexPresentation = (currentIndexPresentation + direction + items.length) % items.length;
        showPresentationCarouselItem(currentIndexPresentation);
    }

    // Chargement initial du carrousel de présentation
    loadPresentationCarousel();

    // Écouteurs d'événements pour la navigation
    document.querySelector('.carousel-nav-left').addEventListener('click', () => {
        movePresentationCarousel(-1);
    });

    document.querySelector('.carousel-nav-right').addEventListener('click', () => {
        movePresentationCarousel(1);
    });
});

function goTo(url, target) {
    if (target === '_blank') {
        window.open(url, '_blank'); // Ouvre le lien dans une nouvelle fenêtre
    } else {
        window.location.href = url; // Ouvre le lien dans la même fenêtre
    }
}
