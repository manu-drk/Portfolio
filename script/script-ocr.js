document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    function formatTextWithLineBreaks(text) {
        return text.replace(/\n/g, '<br>');
    }

    function loadOCRCarousel() {
        fetch('datas/ocr.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(carouselData => {
                console.log('OCR data loaded:', carouselData);

                const carouselContainer = document.querySelector('.carousel-ocr');
                const titleContainer = document.createElement('div');
                titleContainer.setAttribute('class', 'carousel-title');

                const titleElement = document.createElement('h1');
                titleContainer.appendChild(titleElement);
                carouselContainer.before(titleContainer);

                const detailsContainer = document.createElement('div');
                detailsContainer.setAttribute('class', 'details-container');
                carouselContainer.after(detailsContainer);

                let currentIndexOCR = 0;
                let prevButton = null;
                let nextButton = null;
                let activeButton = null;
                let activeModal = null;

                function updateDetails(index) {
                    const project = carouselData[index];
                    if (project) {
                        titleElement.innerText = project.title;
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

                        const descriptionButton = document.createElement('button');
                        descriptionButton.innerText = 'Description';
                        descriptionButton.onclick = () => {
                            handleButtonClick(descriptionButton);
                            showModal('descriptionModal', project.description || [], document.querySelector('.carousel-item-ocr.active'));
                        };
                        linksContainer.appendChild(descriptionButton);

                        const competenceButton = document.createElement('button');
                        competenceButton.innerText = 'Compétence';
                        competenceButton.onclick = () => {
                            handleButtonClick(competenceButton);
                            showModal('competenceModal', project.competences || [], document.querySelector('.carousel-item-ocr.active'));
                        };
                        linksContainer.appendChild(competenceButton);

                        const problematiqueButton = document.createElement('button');
                        problematiqueButton.innerText = 'Problématique';
                        problematiqueButton.onclick = () => {
                            handleButtonClick(problematiqueButton);
                            showModal('problematiqueModal', project.problematique || [], document.querySelector('.carousel-item-ocr.active'));
                        };
                        linksContainer.appendChild(problematiqueButton);

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

                function handleButtonClick(button) {
                    const allButtons = document.querySelectorAll('.links-container button');
                    allButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    activeButton = button;
                }

                function createCarouselItems() {
                    carouselContainer.innerHTML = '';

                    carouselData.forEach((item, index) => {
                        const carouselItem = document.createElement('div');
                        carouselItem.setAttribute('class', 'carousel-item-ocr');
                        carouselItem.setAttribute('data-index', index);

                        const image = document.createElement('img');
                        image.setAttribute('src', item.cover);
                        carouselItem.appendChild(image);
                        carouselContainer.appendChild(carouselItem);
                    });
                }

                function showOCRCarouselItem(index) {
                    const items = document.querySelectorAll('.carousel-item-ocr');
                    const totalItems = items.length;

                    items.forEach((item, i) => {
                        item.classList.remove('blur', 'active', 'previous', 'next', 'inactive');
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
                                item.classList.add('blur');
                                item.onclick = () => moveOCRCarousel(-1);
                                break;
                            case 1:
                                item.style.transform = 'translateX(0px) scale(1)';
                                item.style.opacity = '1';
                                item.style.zIndex = 3;
                                item.classList.add('active');
                                item.onclick = null;
                                updateDetails(i);
                                break;
                            case 2:
                                item.style.transform = 'translateX(300px) scale(0.8)';
                                item.style.opacity = '0.8';
                                item.style.zIndex = 2;
                                item.classList.add('blur');
                                item.onclick = () => moveOCRCarousel(1);
                                break;
                            default:
                                item.style.transform = 'translateX(0px) scale(0.4)';
                                item.style.opacity = '0.4';
                                item.style.zIndex = 0;
                                item.classList.add('blur');
                                break;
                        }
                    });

                    currentIndexOCR = index;
                }

                function moveOCRCarousel(direction) {
                    const items = document.querySelectorAll('.carousel-item-ocr');
                    currentIndexOCR = (currentIndexOCR + direction + items.length) % items.length;
                    showOCRCarouselItem(currentIndexOCR);
                }

                function createArrowButtons() {
                    const carousel = document.querySelector('.carousel-ocr');
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

                    prevButton.addEventListener('click', () => moveOCRCarousel(-1));
                    nextButton.addEventListener('click', () => moveOCRCarousel(1));
                }

                function manageCarouselVisibility() {
                    createArrowButtons();
                    showOCRCarouselItem(currentIndexOCR);
                }

                createCarouselItems();
                showOCRCarouselItem(0);

                manageCarouselVisibility();

                window.addEventListener('resize', () => {
                    manageCarouselVisibility();
                });

                function createModal(id, className) {
                    const modal = document.createElement('div');
                    modal.id = id;
                    modal.classList.add(className);

                    const modalContent = document.createElement('div');
                    modalContent.classList.add('modal-content');

                    const closeModal = document.createElement('span');
                    closeModal.classList.add('close');
                    closeModal.innerHTML = '&times;';
                    closeModal.onclick = () => {
                        modal.style.display = 'none';
                        if (activeButton) {
                            activeButton.classList.remove('active');
                        }
                        activeModal = null;
                    };

                    modalContent.appendChild(closeModal);

                    const modalDescription = document.createElement('div');
                    modalDescription.classList.add('modal-description');
                    modalContent.appendChild(modalDescription);

                    modal.appendChild(modalContent);
                    document.body.appendChild(modal);

                    return modal;
                }

                const descriptionModal = createModal('descriptionModal', 'modal');
                const competenceModal = createModal('competenceModal', 'modal');
                const problematiqueModal = createModal('problematiqueModal', 'modal');

                function closeAllModals() {
                    const modals = [descriptionModal, competenceModal, problematiqueModal];
                    modals.forEach(modal => {
                        modal.style.display = 'none';
                    });
                }

                function showModal(modalId, content, targetElement) {
                    closeAllModals(); 
                    const modal = document.getElementById(modalId);
                    const modalDescription = modal.querySelector('.modal-description');
                    modalDescription.innerHTML = '';

                    if (modalId === 'problematiqueModal') {
                        if (Array.isArray(content)) {
                            content.forEach(item => {
                                const itemContainer = document.createElement('div');
                                itemContainer.setAttribute('class', 'ocr-item');

                                const intitule = document.createElement('h3');
                                intitule.setAttribute('class', 'ocr-intitule');
                                intitule.innerText = item.intitule ? item.intitule : 'Intitulé non disponible';
                                itemContainer.appendChild(intitule);

                                const description = document.createElement('p');
                                description.setAttribute('class', 'ocr-description');
                                description.innerHTML = formatTextWithLineBreaks(item['description-prob'] ? item['description-prob'].join(' ') : 'Description non disponible');
                                itemContainer.appendChild(description);

                                modalDescription.appendChild(itemContainer);
                            });
                        } else {
                            const p = document.createElement('p');
                            p.textContent = 'Aucune information disponible';
                            modalDescription.appendChild(p);
                        }
                    } else {
                        if (Array.isArray(content)) {
                            content.forEach(item => {
                                const p = document.createElement('p');
                                p.textContent = item;
                                modalDescription.appendChild(p);
                            });
                        } else {
                            const p = document.createElement('p');
                            p.textContent = content;
                            modalDescription.appendChild(p);
                        }
                    }

                    const rect = targetElement.getBoundingClientRect();
                    modal.style.position = 'absolute';
                    modal.style.top = `${rect.top + window.scrollY}px`;
                    modal.style.left = `${rect.left + window.scrollX}px`;
                    modal.style.width = `${rect.width}px`;
                    modal.style.height = `${rect.height}px`;
                    modal.style.display = 'block';
                    activeModal = modal;
                }

                window.onclick = function(event) {
                    if (activeModal && event.target === activeModal) {
                        activeModal.style.display = 'none';
                        if (activeButton) {
                            activeButton.classList.remove('active');
                        }
                        activeModal = null;
                    }
                };
            })
            .catch(error => {
                console.error('Error fetching OCR data:', error);
            });
    }

    loadOCRCarousel();
});

