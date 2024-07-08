document.addEventListener('DOMContentLoaded', function() {
    const contentContainer = document.querySelector('.content');
    
    if (contentContainer) {
        contentContainer.innerHTML = `
            <h1>Projets OpenClassRoom</h1>
            <div class="carousel-ocr">
                <!-- Les éléments du carrousel OCR seront générés ici -->
            </div>
        `;
        
        fetch('datas/ocr.json')
            .then(response => response.json())
            .then(data => {
                const carouselContainer = document.querySelector('.carousel-ocr');
                
                if (carouselContainer) {
                    data.forEach(item => {
                        const carouselItem = document.createElement('div');
                        carouselItem.className = 'carousel-item-ocr';
        
                        const img = document.createElement('img');
                        img.src = item.cover;
                        img.alt = item.title;
        
                        carouselItem.appendChild(img);
                        carouselContainer.appendChild(carouselItem);
        
                        carouselItem.addEventListener('click', () => {
                            showProjectDetails(item);
                        });
                    });
                } else {
                    console.error('Carousel container not found');
                }
            })
            .catch(error => console.error('Error loading OCR data:', error));
    } else {
        console.error('Content container not found');
    }

    function showProjectDetails(project) {
        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'project-details';
        detailsContainer.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.description.join('<br><br>')}</p>
            <div>
                <a href="${project.Github}" target="_blank">GitHub</a>
                ${project.Site ? `<a href="${project.Site}" target="_blank">Site</a>` : ''}
            </div>
        `;
        
        if (contentContainer) {
            contentContainer.innerHTML = '';
            contentContainer.appendChild(detailsContainer);
        } else {
            console.error('Content container not found');
        }
    }
});



// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed');

//     function loadOCRCarousel() {
//         fetch('datas/ocr.json')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok ' + response.statusText);
//                 }
//                 return response.json();
//             })
//             .then(carouselData => {
//                 console.log('OCR data loaded:', carouselData);

//                 const carouselContainer = document.querySelector('.carousel-ocr');
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
//                 let currentIndexOCR = 0;

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
//                     carouselItem.setAttribute('class', 'carousel-item-ocr');
//                     carouselItem.setAttribute('data-index', index); // Ajout de l'attribut data-index

//                     const image = document.createElement('img');
//                     image.setAttribute('src', item.cover);
//                     carouselItem.appendChild(image);
//                     carouselContainer.appendChild(carouselItem);
//                 });

//                 function showOCRCarouselItem(index) {
//                     const items = document.querySelectorAll('.carousel-item-ocr');
//                     const totalItems = items.length;

//                     items.forEach((item, i) => {
//                         const pos = (i - index + totalItems) % totalItems;
//                         switch (pos) {
//                             case 0:
//                                 item.style.transform = 'translateX(-300px) scale(0.8)';
//                                 item.style.opacity = '0.8';
//                                 item.style.zIndex = 2;
//                                 item.onclick = () => moveOCRCarousel(-1);
//                                 break;
//                             case 1:
//                                 item.style.transform = 'translateX(0px) scale(1)';
//                                 item.style.opacity = '1';
//                                 item.style.zIndex = 3;
//                                 item.onclick = null;
//                                 // Mettre à jour les détails lorsque l'élément central change
//                                 updateDetails(i);
//                                 break;
//                             case 2:
//                                 item.style.transform = 'translateX(300px) scale(0.8)';
//                                 item.style.opacity = '0.8';
//                                 item.style.zIndex = 2;
//                                 item.onclick = () => moveOCRCarousel(1);
//                                 break;
//                             default:
//                                 item.style.transform = 'translateX(0px) scale(0.4)';
//                                 item.style.opacity = '0.4';
//                                 item.style.zIndex = 0;
//                                 item.onclick = null;
//                                 break;
//                         }
//                     });

//                     currentIndexOCR = index;
//                 }

//                 function moveOCRCarousel(direction) {
//                     const items = document.querySelectorAll('.carousel-item-ocr');
//                     currentIndexOCR = (currentIndexOCR + direction + items.length) % items.length;
//                     showOCRCarouselItem(currentIndexOCR);
//                 }

//                 showOCRCarouselItem(currentIndexOCR);

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

//                 function showModal(modalId, description) {
//                     const modal = document.getElementById(modalId);
//                     const modalDescription = modal.querySelector('.modal-description');
//                     modalDescription.innerHTML = ''; // Clear previous description
//                     description.forEach(paragraph => {
//                         const p = document.createElement('p');
//                         p.innerText = paragraph;
//                         modalDescription.appendChild(p);
//                     });
//                     modal.style.display = 'block';
//                 }

//                 // Close the modal when clicking outside of it
//                 window.onclick = function(event) {
//                     const descriptionModal = document.getElementById('descriptionModal');
//                     const competenceModal = document.getElementById('competenceModal');
//                     if (event.target === descriptionModal) {
//                         descriptionModal.style.display = 'none';
//                     } else if (event.target === competenceModal) {
//                         competenceModal.style.display = 'none';
//                     }
//                 }
//             })
//             .catch(error => {
//                 console.error('There has been a problem with your fetch operation:', error);
//             });
//     }

//     loadOCRCarousel();
// });

