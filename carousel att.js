document.addEventListener("DOMContentLoaded", function() {
    const carouselData = [
        { title: "Curriculum", img: "./images/cv.jpg", script: "script-cv.js", class: "carousel-cv" },
        { title: "Presentation", img: "./images/presentation.jpg", script: "script-presentation.js", class: "carousel-presentation" },
        { title: "Projets OpenClassRoom", img: "./images/projet_ocr.jpg", script: "script-ocr.js", class: "carousel-ocr" },
        { title: "Projets Professionnels", img: "./images/projets_pro.jpg", script: "script-pro.js", class: "carousel-pro" },
        { title: "Me Contacter", img: "./images/Me_contacter.jpg", script: "script-contact.js" } // Un élément sans classe par défaut
    ];

    const contentContainer = document.querySelector('.content');

    function loadCarousel(carouselItem) {
        fetch(`datas/${carouselItem.script}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(carouselData => {
                console.log(`${carouselItem.title} data loaded:`, carouselData);

                // Sélectionner ou créer le conteneur du carousel
                let carouselContainer = document.querySelector(`.${carouselItem.class}`);
                if (!carouselContainer) {
                    carouselContainer = document.createElement('div');
                    carouselContainer.classList.add(carouselItem.class);
                    contentContainer.appendChild(carouselContainer);
                }

                // Masquer le carousel de base si nécessaire
                const baseCarousel = document.querySelector('.carousel');
                if (baseCarousel) {
                    baseCarousel.style.display = 'none';
                }

                // Créer et insérer le conteneur du titre
                const titleContainer = document.createElement('div');
                titleContainer.setAttribute('class', 'carousel-title');
                carouselContainer.before(titleContainer);

                const titleElement = document.createElement('h1');
                titleElement.innerText = carouselItem.title;
                titleContainer.appendChild(titleElement);

                // Créer et insérer le conteneur des détails
                const detailsContainer = document.createElement('div');
                detailsContainer.setAttribute('class', 'details-container');
                carouselContainer.after(detailsContainer);

                let currentIndex = 0;

                function updateDetails(index) {
                    const project = carouselData[index];
                    if (project) {
                        detailsContainer.innerHTML = '';

                        const detailItem = document.createElement('div');
                        detailItem.setAttribute('class', 'detail-item');

                        const linksContainer = document.createElement('div');
                        linksContainer.setAttribute('class', 'links-container');

                        if (project.Site) {
                            const siteLink = document.createElement('a');
                            siteLink.setAttribute('href', project.Site);
                            siteLink.setAttribute('target', '_blank');
                            siteLink.innerText = 'Site';
                            linksContainer.appendChild(siteLink);
                        }

                        if (project.Github) {
                            const githubLink = document.createElement('a');
                            githubLink.setAttribute('href', project.Github);
                            githubLink.setAttribute('target', '_blank');
                            githubLink.innerText = 'GitHub';
                            linksContainer.appendChild(githubLink);
                        }

                        detailItem.appendChild(linksContainer);

                        // Ajouter le bouton "Description"
                        const descriptionButton = document.createElement('button');
                        descriptionButton.innerText = 'Description';
                        descriptionButton.onclick = () => showModal('descriptionModal', project.description || []);
                        linksContainer.appendChild(descriptionButton);

                        // Ajouter le bouton "Compétence"
                        const competenceButton = document.createElement('button');
                        competenceButton.innerText = 'Compétences';
                        competenceButton.onclick = () => showModal('competenceModal', project.competences || []);
                        linksContainer.appendChild(competenceButton);

                        // Mettre à jour les tags
                        const tagsContainer = document.createElement('div');
                        tagsContainer.setAttribute('class', 'tags-container');
                        project.tags.forEach(tag => {
                            const tagElement = document.createElement('span');
                            tagElement.setAttribute('class', 'tag');
                            tagElement.innerText = tag;
                            tagsContainer.appendChild(tagElement);
                        });

                        detailItem.appendChild(tagsContainer);
                        detailsContainer.appendChild(detailItem);
                    }
                }

                carouselData.forEach((item, index) => {
                    const carouselItem = document.createElement('div');
                    carouselItem.setAttribute('class', 'carousel-item');
                    carouselItem.setAttribute('data-index', index);

                    const image = document.createElement('img');
                    image.setAttribute('src', item.img);
                    carouselItem.appendChild(image);
                    carouselContainer.appendChild(carouselItem);
                });

                function showCarouselItem(index) {
                    const items = document.querySelectorAll(`.${carouselItem.class} .carousel-item`);
                    const totalItems = items.length;

                    items.forEach((item, i) => {
                        const pos = (i - index + totalItems) % totalItems;
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
                                item.onclick = () => updateDetails(i);
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
                    });

                    currentIndex = index;
                }

                function moveCarousel(direction) {
                    const items = document.querySelectorAll(`.${carouselItem.class} .carousel-item`);
                    currentIndex = (currentIndex + direction + items.length) % items.length;
                    showCarouselItem(currentIndex);
                }

                showCarouselItem(currentIndex);

                function showModal(modalId, content) {
                    const modal = document.getElementById(modalId);
                    if (modal) {
                        const modalContent = modal.querySelector('.modal-content');
                        if (modalContent) {
                            const modalText = modalContent.querySelector('p');
                            const modalList = modalContent.querySelector('ul');

                            if (modalId === 'descriptionModal') {
                                modalList.style.display = 'none';
                                modalText.style.display = 'block';
                                modalText.textContent = content;
                            } else if (modalId === 'competenceModal') {
                                modalText.style.display = 'none';
                                modalList.style.display = 'block';
                                modalList.innerHTML = '';
                                content.forEach(item => {
                                    const li = document.createElement('li');
                                    li.textContent = item;
                                    modalList.appendChild(li);
                                });
                            }

                            modal.style.display = 'block';

                            const span = modalContent.querySelector('.close');
                            if (span) {
                                span.onclick = function() {
                                    modal.style.display = 'none';
                                }
                            }

                            window.onclick = function(event) {
                                if (event.target === modal) {
                                    modal.style.display = 'none';
                                }
                            }
                        }
                    }
                }
            })
            .catch(error => {
                console.error(`Error fetching ${carouselItem.title} data:`, error);
            });
    }

    carouselData.forEach(item => {
        loadCarousel(item);
    });
});
