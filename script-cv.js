document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    
    let currentIndexCv = 0;

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
                const detailsContainer = document.createElement('div');
                detailsContainer.setAttribute('class', 'details-container');
                carouselContainer.after(detailsContainer);
                
                carouselData.forEach((item, index) => {
                    const carouselItem = document.createElement('div');
                    carouselItem.setAttribute('class', 'carousel-item-cv');
                    
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

                // Affichage initial du carousel
                showCvCarouselItem(currentIndexCv);
            })
            .catch(error => console.error('Error fetching CV carousel data:', error));
    }

    function showCvCarouselItem(index) {
        const items = document.querySelectorAll('.carousel-item-cv');
        const totalItems = items.length;
        
        items.forEach((item, i) => {
            const pos = (i - index + totalItems) % totalItems;
            switch (pos) {
                case 0:
                    item.style.transform = 'translateX(-300px) scale(0.8)';
                    item.style.opacity = '0.8';
                    item.style.zIndex = 2;
                    item.onclick = () => moveCvCarousel(-1);
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
                    item.onclick = () => moveCvCarousel(1);
                    break;
                default:
                    item.style.transform = 'translateX(0px) scale(0.4)';
                    item.style.opacity = '0.4';
                    item.style.zIndex = 0;
                    item.onclick = null;
                    break;
            }
        });

        // Affichage des détails correspondants
        const details = document.querySelectorAll('.detail-item');
        details.forEach((detail, i) => {
            detail.style.display = i === index ? 'block' : 'none';
        });
    }

    function moveCvCarousel(direction) {
        const items = document.querySelectorAll('.carousel-item-cv');
        currentIndexCv = (currentIndexCv + direction + items.length) % items.length;
        showCvCarouselItem(currentIndexCv);
    }

    // Chargement initial du carousel
    loadCvCarousel();

    // Écouteurs d'événements pour la navigation
    document.querySelector('.carousel-nav-left').addEventListener('click', () => {
        moveCvCarousel(-1);
    });

    document.querySelector('.carousel-nav-right').addEventListener('click', () => {
        moveCvCarousel(1);
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
//                 const detailsContainer = document.createElement('div');
//                 detailsContainer.setAttribute('class', 'details-container');
//                 carouselContainer.after(detailsContainer);
                
//                 carouselData.forEach((item, index) => {
//                     const carouselItem = document.createElement('div');
//                     carouselItem.setAttribute('class', 'carousel-item-cv');
                    
//                     const title = document.createElement('h2');
//                     title.innerText = item.title;
//                     carouselItem.appendChild(title);
                    
//                     const descriptionList = document.createElement('ul');
//                     item.description.forEach(desc => {
//                         const descriptionItem = document.createElement('li');
//                         descriptionItem.innerText = desc;
//                         descriptionList.appendChild(descriptionItem);
//                     });
//                     carouselItem.appendChild(descriptionList);
                    
//                     carouselContainer.appendChild(carouselItem);
//                 });

//                 let currentIndexCv = 0;
                
//                 function showCvCarouselItem(index) {
//                     const items = document.querySelectorAll('.carousel-item-cv');
//                     const totalItems = items.length;

//                     items.forEach((item, i) => {
//                         const pos = (i - index + totalItems) % totalItems;
//                         switch (pos) {
//                             case 0:
//                                 item.style.transform = 'translateX(0px) scale(1)';
//                                 item.style.opacity = '1';
//                                 item.style.zIndex = 3;
//                                 break;
//                             case 1:
//                                 item.style.transform = 'translateX(300px) scale(0.8)';
//                                 item.style.opacity = '0.8';
//                                 item.style.zIndex = 2;
//                                 break;
//                             case 2:
//                                 item.style.transform = 'translateX(-300px) scale(0.8)';
//                                 item.style.opacity = '0.8';
//                                 item.style.zIndex = 2;
//                                 break;
//                             default:
//                                 item.style.transform = 'translateX(0px) scale(0.4)';
//                                 item.style.opacity = '0.4';
//                                 item.style.zIndex = 0;
//                                 break;
//                         }
//                     });

//                     // Affichage des détails correspondants
//                     const details = document.querySelectorAll('.detail-item');
//                     details.forEach((detail, i) => {
//                         detail.style.display = i === index ? 'block' : 'none';
//                     });
//                 }

//                 function moveCvCarousel(direction) {
//                     const items = document.querySelectorAll('.carousel-item-cv');
//                     currentIndexCv = (currentIndexCv + direction + items.length) % items.length;
//                     showCvCarouselItem(currentIndexCv);
//                 }

//                 showCvCarouselItem(currentIndexCv);

//                 // Écouteurs d'événements pour le déplacement du carousel
//                 document.querySelector('.carousel-nav-left').addEventListener('click', () => {
//                     moveCvCarousel(-1);
//                 });

//                 document.querySelector('.carousel-nav-right').addEventListener('click', () => {
//                     moveCvCarousel(1);
//                 });
//             })
//             .catch(error => console.error('Error fetching CV carousel data:', error));
//     }

//     loadCvCarousel();
// });

// function goBack() {
//     console.log('goBack called');
//     history.back();
// }
