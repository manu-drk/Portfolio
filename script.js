let currentIndex = 0;
let prevButton = null;
let nextButton = null;

function showCarouselItem(index) {
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    items.forEach((item, i) => {
        item.classList.remove('active', 'previous', 'next', 'inactive');
        const pos = (i - index + totalItems) % totalItems;

        if (window.innerWidth <= 380) {
            // Pour les petites tailles d'écran
            if (i === index) {
                item.classList.add('active');
                item.onclick = () => goTo(item.getAttribute('data-link'));
            } else {
                item.classList.add('inactive');
                item.onclick = null;
            }
        } else if (window.innerWidth <= 1024) {
            // Pour les écrans intermédiaires
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
                item.onclick = null;
            }
        } else {
            // Pour les écrans plus grands
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
    const items = document.querySelectorAll('.carousel-item');
    currentIndex = (currentIndex + direction + items.length) % items.length;
    showCarouselItem(currentIndex);
}

function goTo(url, target = '_self') {
    if (target === '_blank') {
        window.open(url, '_blank');
    } else {
        window.location.href = url;
    }
}

function createArrowButtons() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    // Supprimer les anciens boutons si existants
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

document.addEventListener('DOMContentLoaded', () => {
    showCarouselItem(currentIndex);

    // Créer les boutons si la largeur de la fenêtre est <= 1024px
    if (window.innerWidth <= 1024) {
        createArrowButtons();
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1024) {
            createArrowButtons();
        } else {
            // Retirer les boutons si la largeur de la fenêtre > 1024px
            if (prevButton) prevButton.remove();
            if (nextButton) nextButton.remove();
            prevButton = null;
            nextButton = null;
        }
        showCarouselItem(currentIndex);
    });
});



// **********************************************

// fonctionnel 100%

// let currentIndex = 0;

// function showCarouselItem(index) {
//     const items = document.querySelectorAll('.carousel-item');
//     const totalItems = items.length;
//     items.forEach((item, i) => {
//         item.classList.remove('active', 'previous', 'next', 'inactive');
//         const pos = (i - index + totalItems) % totalItems;

//         if (window.innerWidth <= 380) {
//             // Pour les petites tailles d'écran
//             if (i === index) {
//                 item.classList.add('active');
//             } else {
//                 item.classList.add('inactive');
//             }
//         } else if (window.innerWidth <= 1024) {
//             // Pour les écrans intermédiaires
//             if (i === index) {
//                 item.classList.add('active');
//             } else if (i === (index - 1 + totalItems) % totalItems) {
//                 item.classList.add('previous');
//             } else if (i === (index + 1) % totalItems) {
//                 item.classList.add('next');
//             }
//         } else {
//             // Pour les écrans plus grands
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

// function goTo(url, target) {
//     if (target === '_blank') {
//         window.open(url, '_blank');
//     } else {
//         window.location.href = url;
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     showCarouselItem(currentIndex);

//     function createArrowButtons() {
//         const carousel = document.querySelector('.carousel');
//         if (!carousel) return;

//         const prevButton = document.createElement('button');
//         prevButton.classList.add('prev_bouton');
//         prevButton.innerHTML = '<img src="./images/flech-prev.png" alt="Previous">';
//         carousel.appendChild(prevButton);

//         const nextButton = document.createElement('button');
//         nextButton.classList.add('next_bouton');
//         nextButton.innerHTML = '<img src="./images/flech-next.png" alt="Next">';
//         carousel.appendChild(nextButton);

//         prevButton.addEventListener('click', () => {
//             moveCarousel(-1);
//         });

//         nextButton.addEventListener('click', () => {
//             moveCarousel(1);
//         });
//     }

//     if (window.innerWidth <= 1024) {
//         createArrowButtons();
//     }

//     window.addEventListener('resize', () => {
//         if (window.innerWidth <= 1024) {
//             createArrowButtons();
//         } else {
//             const prevButton = document.querySelector('.carousel .prev_bouton');
//             const nextButton = document.querySelector('.carousel .next_bouton');
//             if (prevButton) prevButton.remove();
//             if (nextButton) nextButton.remove();
//         }
//         showCarouselItem(currentIndex);
//     });
// });




// teste media quiery 1

// function returnToHome() {
//     window.location.href = 'index.html';
// }

// function goBack() {
//     console.log('goBack called');
//     history.back();
// }

// let currentIndex = 0;

// function showCarouselItem(index) {
//     const items = document.querySelectorAll('.carousel-item');
//     const totalItems = items.length;
//     items.forEach((item, i) => {
//         const pos = (i - index + totalItems) % totalItems;
//         switch (pos) {
//             case 0:
//                 item.style.transform = 'translateX(-300px) scale(0.8)';
//                 item.style.opacity = '0.8';
//                 item.style.zIndex = 2;
//                 item.onclick = () => moveCarousel(-1);
//                 break;
//             case 1:
//                 item.style.transform = 'translateX(0px) scale(1)';
//                 item.style.opacity = '1';
//                 item.style.zIndex = 3;
//                 item.onclick = () => goTo(item.getAttribute('data-link'));
//                 break;
//             case 2:
//                 item.style.transform = 'translateX(300px) scale(0.8)';
//                 item.style.opacity = '0.8';
//                 item.style.zIndex = 2;
//                 item.onclick = () => moveCarousel(1);
//                 break;
//             default:
//                 item.style.transform = 'translateX(0px) scale(0.4)';
//                 item.style.opacity = '0.4';
//                 item.style.zIndex = 0;
//                 item.onclick = null;
//                 break;
//         }
//     });
// }

// function moveCarousel(direction) {
//     const items = document.querySelectorAll('.carousel-item');
//     currentIndex = (currentIndex + direction + items.length) % items.length;
//     showCarouselItem(currentIndex);
// }

// function goTo(url, target) {
//     if (target === '_blank') {
//         window.open(url, '_blank'); // Ouvre le lien dans une nouvelle fenêtre
//     } else {
//         window.location.href = url; // Ouvre le lien dans la même fenêtre
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     showCarouselItem(currentIndex);

//     // Créer les flèches dynamiquement pour les écrans de 380px et moins
//     function createArrowButtons() {
//         const carousel = document.querySelector('.carousel');
//         if (!carousel) return; // Assurez-vous que le conteneur carousel existe

//         // Créer le bouton précédent
//         const prevButton = document.createElement('button');
//         prevButton.classList.add('prev');
//         prevButton.innerHTML = '<img src="./images/flech-prev.png" alt="Previous">';
//         carousel.appendChild(prevButton);

//         // Créer le bouton suivant
//         const nextButton = document.createElement('button');
//         nextButton.classList.add('next');
//         nextButton.innerHTML = '<img src="./images/flech-next.png" alt="Next">';
//         carousel.appendChild(nextButton);

//         // Ajouter les événements de clic aux boutons
//         prevButton.addEventListener('click', () => {
//             moveCarousel(-1);
//         });

//         nextButton.addEventListener('click', () => {
//             moveCarousel(1);
//         });
//     }

//     // Créer les boutons si l'écran est de 380px ou moins
//     if (window.innerWidth <= 380) {
//         createArrowButtons();
//     }

//     // Écouter les changements de taille de la fenêtre pour ajouter/retirer les boutons
//     window.addEventListener('resize', () => {
//         if (window.innerWidth <= 380) {
//             createArrowButtons();
//         } else {
//             const prevButton = document.querySelector('.carousel .prev');
//             const nextButton = document.querySelector('.carousel .next');
//             if (prevButton) prevButton.remove();
//             if (nextButton) nextButton.remove();
//         }
//     });
// });

// *******************
//fonction 

// function returnToHome() {
//     window.location.href = 'index.html';
// }

// function goBack() {
//     console.log('goBack called');
//     history.back();
// }




// let currentIndex = 0;
// // let currentIndex = 1;

// function showCarouselItem(index) {
//     const items = document.querySelectorAll('.carousel-item');
//     const totalItems = items.length;
//     items.forEach((item, i) => {
//         const pos = (i - index + totalItems) % totalItems;
//         switch (pos) {
//             case 0:
//                 item.style.transform = 'translateX(-300px) scale(0.8)';
//                 item.style.opacity = '0.8';
//                 item.style.zIndex = 2;
//                 item.onclick = () => moveCarousel(-1);
//                 break;
//             case 1:
//                 item.style.transform = 'translateX(0px) scale(1)';
//                 item.style.opacity = '1';
//                 item.style.zIndex = 3;
//                 item.onclick = () => goTo(item.getAttribute('data-link'));
//                 break;
//             case 2:
//                 item.style.transform = 'translateX(300px) scale(0.8)';
//                 item.style.opacity = '0.8';
//                 item.style.zIndex = 2;
//                 item.onclick = () => moveCarousel(1);
//                 break;
//             default:
//                 item.style.transform = 'translateX(0px) scale(0.4)';
//                 item.style.opacity = '0.4';
//                 item.style.zIndex = 0;
//                 item.onclick = null;
//                 break;
//         }
//     });
// }

// function moveCarousel(direction) {
//     const items = document.querySelectorAll('.carousel-item');
//     currentIndex = (currentIndex + direction + items.length) % items.length;
//     showCarouselItem(currentIndex);

//  // Ajoutez des gestionnaires d'événements pour les flèches
//  const prevButton = document.createElement('button');
//  prevButton.classList.add('prev');
//  prevButton.innerHTML = '&#10094;';
//  carousel.appendChild(prevButton);

//  const nextButton = document.createElement('button');
//  nextButton.classList.add('next');
//  nextButton.innerHTML = '&#10095;';
//  carousel.appendChild(nextButton);

//  prevButton.addEventListener('click', () => {
//      moveCarousel(-1);
//  });

//  nextButton.addEventListener('click', () => {
//      moveCarousel(1);
//  });
// }

// function goTo(url, target) {
//     if (target === '_blank') {
//         window.open(url, '_blank'); // Ouvre le lien dans une nouvelle fenêtre
//     } else {
//         window.location.href = url; // Ouvre le lien dans la même fenêtre
//     }
// }

// // function goTo(url) {
// //     window.location.href = url; // Ouvre le lien dans la même fenêtre
// // }

// document.addEventListener('DOMContentLoaded', () => {
//     showCarouselItem(currentIndex);
// });


