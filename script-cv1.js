document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    fetch('datas/cv.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Cv data loaded:', data);

            const carouselContainer = document.querySelector('.carousel-cv');

            // Créer et ajouter le conteneur de titre avant le conteneur du carousel
            const titleContainer = document.createElement('div');
            titleContainer.setAttribute('class', 'carousel-title');
            const titleElement = document.createElement('h1');
            titleContainer.appendChild(titleElement);
            carouselContainer.before(titleContainer);

            data.forEach((item, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item-cv');
                carouselItem.setAttribute('data-link', item.link);
                carouselItem.setAttribute('data-title', item.title);

                // Ajouter le titre
                const title = document.createElement('h2');
                title.innerText = item.title;
                carouselItem.appendChild(title);

                // Ajouter la description
                const descriptionList = document.createElement('ul');
                item.description.forEach(desc => {
                    const descriptionItem = document.createElement('li');
                    descriptionItem.innerText = desc;
                    descriptionList.appendChild(descriptionItem);
                });
                carouselItem.appendChild(descriptionList);

                carouselContainer.appendChild(carouselItem);
            });

            showCvCarouselItem(currentIndex);

            if (window.innerWidth <= 1024) {
                createArrowButtons();
            }

            window.addEventListener('resize', () => {
                if (window.innerWidth <= 1024) {
                    createArrowButtons();
                } else {
                    if (prevButton) prevButton.remove();
                    if (nextButton) nextButton.remove();
                    prevButton = null;
                    nextButton = null;
                }
                showCvCarouselItem(currentIndex);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});

let currentIndex = 0;
let prevButton = null;
let nextButton = null;

function showCvCarouselItem(index) {
    const items = document.querySelectorAll('.carousel-item-cv');
    const totalItems = items.length;
    const titleElement = document.querySelector('.carousel-title h1');

    titleElement.innerText = items[index].getAttribute('data-title');

    items.forEach((item, i) => {
        item.classList.remove('active', 'previous', 'next', 'inactive');
        const pos = (i - index + totalItems) % totalItems;

        if (window.innerWidth <= 380) {
            if (i === index) {
                item.classList.add('active');
                item.onclick = () => goTo(item.getAttribute('data-link'));
            } else {
                item.classList.add('inactive');
                item.onclick = null;
            }
        } else if (window.innerWidth <= 1024) {
            if (i === index) {
                item.classList.add('active');
                item.onclick = () => goTo(item.getAttribute('data-link'));
            } else if (i === (index - 1 + totalItems) % totalItems) {
                item.classList.add('previous');
                item.onclick = () => moveCarousel(-1);
            } else if (i === (index + 1) % totalItems) {
                item.classList.add('next');
                item.onclick = () => moveCarousel(1);
            } else {
                item.classList.add('inactive');
                item.onclick = null;
            }
        } else {
            switch (pos) {
                case 0:
                    item.style.transform = 'translateX(-300px) scale(0.8)';
                    item.style.opacity = '0.8';
                    item.style.zIndex = 2;
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
                    item.onclick = () => moveCarousel(1);
                    break;
                default:
                    item.style.transform = 'translateX(0px) scale(0.4)';
                    item.style.opacity = '0.4';
                    item.style.zIndex = 0;
                    item.onclick = null;
                    break;
            }
        }
    });
}

function moveCarousel(direction) {
    const items = document.querySelectorAll('.carousel-item-cv');
    currentIndex = (currentIndex + direction + items.length) % items.length;
    showCvCarouselItem(currentIndex);
}

function goTo(url, target = '_self') {
    if (target === '_blank') {
        window.open(url, '_blank');
    } else {
        window.location.href = url;
    }
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

    prevButton.addEventListener('click', () => {
        moveCarousel(-1);
    });

    nextButton.addEventListener('click', () => {
        moveCarousel(1);
    });
}


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

//                 const img = document.createElement('img');
//                 img.src = item.cover;

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

//                 carouselItem.appendChild(img);
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
//             } else if (i === (index - 1 + totalItems) % totalItems) {
//                 item.classList.add('previous');
//                 item.onclick = () => moveCarousel(-1);
//             } else if (i === (index + 1) % totalItems) {
//                 item.classList.add('next');
//                 item.onclick = () => moveCarousel(1);
//             } else {
//                 item.classList.add('inactive');
//                 item.onclick = null;
//             }
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
