document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    function loadPROCarousel() {
        fetch('datas/pro.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(carouselData => {
                console.log('PRO data loaded:', carouselData);
                const carouselContainer = document.querySelector('.carousel-pro');
                const detailsContainer = document.createElement('div');
                detailsContainer.setAttribute('class', 'details-container');
                carouselContainer.after(detailsContainer);

                carouselData.forEach((item, index) => {
                    const carouselItem = document.createElement('div');
                    carouselItem.setAttribute('class', 'carousel-item-pro');

                    const image = document.createElement('img');
                    image.setAttribute('src', item.cover);
                    carouselItem.appendChild(image);
                    carouselContainer.appendChild(carouselItem);

                    const detailItem = document.createElement('div');
                    detailItem.setAttribute('class', 'detail-item');
                    detailItem.setAttribute('data-index', index);

                    const linksContainer = document.createElement('div');
                    linksContainer.setAttribute('class', 'links-container');

                    const siteLink = document.createElement('a');
                    siteLink.setAttribute('href', item.Site);
                    siteLink.setAttribute('target', '_blank');
                    siteLink.innerText = 'Site';

                    const githubLink = document.createElement('a');
                    githubLink.setAttribute('href', item.Github);
                    githubLink.setAttribute('target', '_blank');
                    githubLink.innerText = 'GitHub';

                    linksContainer.appendChild(siteLink);
                    linksContainer.appendChild(githubLink);
                    detailItem.appendChild(linksContainer);

                    const tagsContainer = document.createElement('div');
                    tagsContainer.setAttribute('class', 'tags-container');

                    item.tags.forEach(tag => {
                        const tagElement = document.createElement('span');
                        tagElement.setAttribute('class', 'tag');
                        tagElement.innerText = tag;
                        tagsContainer.appendChild(tagElement);
                    });

                    detailItem.appendChild(tagsContainer);
                    detailsContainer.appendChild(detailItem);
                });

                let currentIndexPro = 0;

                function showProCarouselItem(index) {
                    const items = document.querySelectorAll('.carousel-item-pro');
                    const details = document.querySelectorAll('.detail-item');
                    const totalItems = items.length;

                    if (totalItems === 1) {
                        items[0].style.transform = 'translateX(0px) scale(1)';
                        items[0].style.opacity = '1';
                        items[0].style.zIndex = 3;
                        details[0].style.display = 'block';
                        return; // Sortir de la fonction pour éviter les erreurs avec currentIndexPro
                    }

                    items.forEach((item, i) => {
                        const pos = (i - index + totalItems) % totalItems;
                        item.classList.remove('blur');
                        switch (pos) {
                            case 0:
                                item.style.transform = 'translateX(-300px) scale(0.8)';
                                item.style.opacity = '0.8';
                                item.style.zIndex = 2;
                                item.classList.add('carousel-item-pointer');
                                item.onclick = () => moveProCarousel(-1);
                                item.classList.add('blur');
                                break;
                            case 1:
                                item.style.transform = 'translateX(0px) scale(1)';
                                item.style.opacity = '1';
                                item.style.zIndex = 3;
                                item.classList.remove('carousel-item-pointer');
                                item.onclick = null;
                                details[i].style.display = 'block';
                                break;
                            case 2:
                                item.style.transform = 'translateX(300px) scale(0.8)';
                                item.style.opacity = '0.8';
                                item.style.zIndex = 2;
                                item.classList.add('carousel-item-pointer');
                                item.onclick = () => moveProCarousel(1);
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
                    details.forEach((detail, i) => {
                        detail.style.display = i === index ? 'block' : 'none';
                    });
                }

                function moveProCarousel(direction) {
                    const items = document.querySelectorAll('.carousel-item-pro');
                    currentIndexPro = (currentIndexPro + direction + items.length) % items.length;
                    showProCarouselItem(currentIndexPro);
                }

                showProCarouselItem(currentIndexPro);
            })
            .catch(error => console.error('Error fetching PRO carousel data:', error));
    }

    loadPROCarousel();
});

function goBack() {
    console.log('goBack called');
    history.back();
}


// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed');

//     function loadPROCarousel() {
//         fetch('datas/pro.json')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok ' + response.statusText);
//                 }
//                 return response.json();
//             })
//             .then(carouselData => {
//                 console.log('PRO data loaded:', carouselData);

//                 const carouselContainer = document.querySelector('.carousel-pro');
//                 const titleContainer = document.createElement('div');
//                 titleContainer.setAttribute('class', 'carousel-title');

//                 const titleElement = document.createElement('h1');
//                 titleContainer.appendChild(titleElement);
//                 carouselContainer.before(titleContainer);

//                 // Conteneur pour les détails des projets
//                 const detailsContainer = document.createElement('div');
//                 detailsContainer.setAttribute('class', 'details-container');
//                 carouselContainer.after(detailsContainer);

//                 // Variable pour suivre l'index actuel du carousel
//                 let currentIndexPRO = 0;
//                 let prevButton = null;
//                 let nextButton = null;

//                 // Fonction pour mettre à jour le titre et les détails en fonction de l'index
//                 function updateDetails(index) {
//                     const project = carouselData[index];
//                     if (project) {
//                         // Mettre à jour le titre
//                         titleElement.innerText = project.title;

//                         // Mettre à jour les liens et les tags
//                         detailsContainer.innerHTML = '';
//                         const detailItem = document.createElement('div');
//                         detailItem.setAttribute('class', 'detail-item');

//                         const linksContainer = document.createElement('div');
//                         linksContainer.setAttribute('class', 'links-container');

//                         if (project.Site) {
//                             const siteLink = document.createElement('a');
//                             siteLink.setAttribute('href', project.Site);
//                             siteLink.setAttribute('target', '_blank');
//                             siteLink.innerText = 'Site';
//                             linksContainer.appendChild(siteLink);
//                         }

//                         if (project.Github) {
//                             const githubLink = document.createElement('a');
//                             githubLink.setAttribute('href', project.Github);
//                             githubLink.setAttribute('target', '_blank');
//                             githubLink.innerText = 'GitHub';
//                             linksContainer.appendChild(githubLink);
//                         }

//                         detailItem.appendChild(linksContainer);

//                         // Ajouter le bouton "Description"
//                         const descriptionButton = document.createElement('button');
//                         descriptionButton.innerText = 'Description';
//                         descriptionButton.onclick = () => showModal('descriptionModal', project.description || []);
//                         linksContainer.appendChild(descriptionButton);

//                         // Ajouter le bouton "Compétence"
//                         const competenceButton = document.createElement('button');
//                         competenceButton.innerText = 'Compétence';
//                         competenceButton.onclick = () => showModal('competenceModal', project.competences || []);
//                         linksContainer.appendChild(competenceButton);

//                         // Mettre à jour les tags
//                         const tagsContainer = document.createElement('div');
//                         tagsContainer.setAttribute('class', 'tags-container');
//                         project.tags.forEach(tag => {
//                             const tagElement = document.createElement('span');
//                             tagElement.setAttribute('class', 'tag');
//                             tagElement.innerText = tag;
//                             tagsContainer.appendChild(tagElement);
//                         });

//                         detailItem.appendChild(tagsContainer);
//                         detailsContainer.appendChild(detailItem);
//                     }
//                 }

//                 carouselData.forEach((item, index) => {
//                     // Création de l'élément du carousel avec l'image
//                     const carouselItem = document.createElement('div');
//                     carouselItem.setAttribute('class', 'carousel-item-pro');
//                     carouselItem.setAttribute('data-index', index); // Ajout de l'attribut data-index

//                     const image = document.createElement('img');
//                     image.setAttribute('src', item.cover);
//                     carouselItem.appendChild(image);
//                     carouselContainer.appendChild(carouselItem);

//                     // Ajout de la classe 'initial' au premier élément
//                     if (index === 0) {
//                         carouselItem.classList.add('initial');
//                     }
//                 });

//                 function showPROCarouselItem(index) {
//                     const items = document.querySelectorAll('.carousel-item-pro');
//                     const totalItems = items.length;

//                     items.forEach((item, i) => {
//                         const pos = (i - index + totalItems) % totalItems;
//                         item.classList.remove('blur', 'active', 'previous', 'next', 'inactive', 'initial'); // Retirer 'initial'
//                         switch (pos) {
//                             case 0:
//                                 item.style.transform = 'translateX(-300px) scale(0.8)';
//                                 item.style.opacity = '0.8';
//                                 item.style.zIndex = 2;
//                                 item.classList.add('blur');
//                                 item.onclick = () => movePROCarousel(-1);
//                                 break;
//                             case 1:
//                                 item.style.transform = 'translateX(0px) scale(1)';
//                                 item.style.opacity = '1';
//                                 item.style.zIndex = 3;
//                                 item.classList.add('active');
//                                 item.onclick = null;
//                                 updateDetails(i);
//                                 break;
//                             case 2:
//                                 item.style.transform = 'translateX(300px) scale(0.8)';
//                                 item.style.opacity = '0.8';
//                                 item.style.zIndex = 2;
//                                 item.classList.add('blur');
//                                 item.onclick = () => movePROCarousel(1);
//                                 break;
//                             default:
//                                 item.style.transform = 'translateX(0px) scale(0.4)';
//                                 item.style.opacity = '0.4';
//                                 item.style.zIndex = 0;
//                                 item.classList.add('blur');
//                                 item.onclick = null;
//                                 break;
//                         }
//                     });

//                     currentIndexPRO = index;
//                 }

//                 function movePROCarousel(direction) {
//                     const items = document.querySelectorAll('.carousel-item-pro');
//                     currentIndexPRO = (currentIndexPRO + direction + items.length) % items.length;
//                     showPROCarouselItem(currentIndexPRO);
//                 }

//                 function createArrowButtons() {
//                     const carousel = document.querySelector('.carousel-pro');
//                     if (!carousel) return;

//                     // Supprimer les anciens boutons si existants
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

//                     prevButton.addEventListener('click', () => {
//                         movePROCarousel(-1);
//                     });

//                     nextButton.addEventListener('click', () => {
//                         movePROCarousel(1);
//                     });
//                 }

//                 function manageCarouselVisibility() {
//                     const items = document.querySelectorAll('.carousel-item-pro');
//                     if (window.innerWidth <= 380) {
//                         items.forEach((item, i) => {
//                             if (i === currentIndexPRO) {
//                                 item.classList.add('active');
//                                 item.onclick = () => goTo(item.getAttribute('data-link'));
//                             } else {
//                                 item.classList.add('inactive');
//                                 item.onclick = null;
//                             }
//                         });
//                     } else if (window.innerWidth <= 1024) {
//                         items.forEach((item, i) => {
//                             if (i === currentIndexPRO) {
//                                 item.classList.add('active');
//                                 item.onclick = () => goTo(item.getAttribute('data-link'));
//                             } else if (i === (currentIndexPRO - 1 + items.length) % items.length) {
//                                 item.classList.add('previous');
//                                 item.onclick = () => movePROCarousel(-1);
//                             } else if (i === (currentIndexPRO + 1) % items.length) {
//                                 item.classList.add('next');
//                                 item.onclick = () => movePROCarousel(1);
//                             } else {
//                                 item.onclick = null;
//                             }
//                         });
//                     } else {
//                         showPROCarouselItem(currentIndexPRO);
//                     }
//                 }

//                 // Afficher le premier élément dès le départ
//                 showPROCarouselItem(0);

//                 // Créer les boutons si la largeur de la fenêtre est <= 1024px
//                 if (window.innerWidth <= 1024) {
//                     createArrowButtons();
//                 }

//                 window.addEventListener('resize', () => {
//                     if (window.innerWidth <= 1024) {
//                         createArrowButtons();
//                     } else {
//                         // Retirer les boutons si la largeur de la fenêtre > 1024px
//                         if (prevButton) prevButton.remove();
//                         if (nextButton) nextButton.remove();
//                         prevButton = null;
//                         nextButton = null;
//                     }
//                     manageCarouselVisibility();
//                 });

//                 manageCarouselVisibility();

//                 // Gestion des modales
//                 function createModal(id, className) {
//                     const modal = document.createElement('div');
//                     modal.id = id;
//                     modal.classList.add(className);

//                     const modalContent = document.createElement('div');
//                     modalContent.classList.add('modal-content');

//                     const closeModal = document.createElement('span');
//                     closeModal.classList.add('close');
//                     closeModal.innerHTML = '&times;';
//                     closeModal.onclick = () => {
//                         modal.style.display = 'none';
//                     };

//                     modalContent.appendChild(closeModal);

//                     const modalDescription = document.createElement('div');
//                     modalDescription.classList.add('modal-description');
//                     modalContent.appendChild(modalDescription);

//                     modal.appendChild(modalContent);
//                     document.body.appendChild(modal);

//                     return modal;
//                 }

//                 const descriptionModal = createModal('descriptionModal', 'modal');
//                 const competenceModal = createModal('competenceModal', 'modal');

//                 function showModal(modalId, content) {
//                     const modal = document.getElementById(modalId);
//                     const modalDescription = modal.querySelector('.modal-description');
//                     modalDescription.innerHTML = '';

//                     if (Array.isArray(content)) {
//                         content.forEach(item => {
//                             const p = document.createElement('p');
//                             p.textContent = item;
//                             modalDescription.appendChild(p);
//                         });
//                     } else {
//                         const p = document.createElement('p');
//                         p.textContent = content;
//                         modalDescription.appendChild(p);
//                     }

//                     modal.style.display = 'block';
//                 }

//                 // Gestion de la fermeture des modales lorsque l'utilisateur clique à l'extérieur
//                 window.onclick = function (event) {
//                     if (event.target == descriptionModal) {
//                         descriptionModal.style.display = 'none';
//                     } else if (event.target == competenceModal) {
//                         competenceModal.style.display = 'none';
//                     }
//                 };
//             })
//             .catch(error => {
//                 console.error('Error fetching PRO data:', error);
//             });
//     }

//     loadPROCarousel();
// });
