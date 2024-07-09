document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // Variables globales pour le carrousel de base
    const carouselData = [
        { title: "Curriculum", img: "./images/cv.jpg", script: "script-cv.js" },
        { title: "Presentation", img: "./images/presentation.jpg", script: "script-presentation.js" },
        { title: "Projets OpenClassRoom", img: "./images/projet_ocr.jpg", script: "script-ocr.js" },
        { title: "Projets Professionnels", img: "./images/projets_pro.jpg", script: "script-pro.js" },
        { title: "Me Contacter", img: "./images/Me_contacter.jpg", script: "script-contact.js" }
    ];

    const carouselContainer = document.querySelector('.carousel');
    const contentContainer = document.querySelector('.content');

    let currentIndex = 0;

    // Fonction pour afficher les éléments du carrousel de base
    function showCarouselItem(index) {
        const items = document.querySelectorAll('.carousel-item');
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
                    item.onclick = () => {
                        if (item.getAttribute('data-script') === "script-ocr.js") {
                            loadOCRCarousel();
                        } else {
                            loadContent(item.getAttribute('data-script'));
                        }
                    };
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
    }

    // Fonction pour déplacer le carrousel de base
    function moveCarousel(direction) {
        const items = document.querySelectorAll('.carousel-item');
        currentIndex = (currentIndex + direction + items.length) % items.length;
        showCarouselItem(currentIndex);
    }

    // Chargement initial du carrousel de base
    if (carouselContainer && contentContainer) {
        carouselData.forEach(item => {
            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item';
            carouselItem.setAttribute('data-script', item.script);

            const img = document.createElement('img');
            img.src = item.img;
            img.alt = item.title;

            carouselItem.appendChild(img);
            carouselContainer.appendChild(carouselItem);
        });

        showCarouselItem(currentIndex);
    }

    // Fonction pour charger le contenu d'un script
    function loadContent(scriptSrc) {
        contentContainer.innerHTML = ''; // Efface le contenu actuel avant de charger le nouveau

        const scriptElement = document.createElement('script');
        scriptElement.src = scriptSrc;
        scriptElement.classList.add('dynamic-script');

        const oldScript = document.querySelector('.dynamic-script');
        if (oldScript) {
            oldScript.remove();
        }

        document.body.appendChild(scriptElement);
    }

    // Fonction pour charger le carrousel OCR
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

                let carouselContainer = document.querySelector('.carousel-ocr');
                if (!carouselContainer) {
                    carouselContainer = document.createElement('div');
                    carouselContainer.classList.add('carousel-ocr');
                    document.querySelector('.content').appendChild(carouselContainer);
                }

                const baseCarousel = document.querySelector('.carousel');
                if (baseCarousel) {
                    baseCarousel.style.display = 'none';
                }

                const titleContainer = document.createElement('div');
                titleContainer.setAttribute('class', 'carousel-title');
                carouselContainer.before(titleContainer);

                const titleElement = document.createElement('h1');
                titleContainer.appendChild(titleElement);

                const detailsContainer = document.createElement('div');
                detailsContainer.setAttribute('class', 'details-container');
                carouselContainer.after(detailsContainer);

                let currentIndexOCR = 0;

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
                        descriptionButton.onclick = () => showModal('descriptionModal', project.description || []);
                        linksContainer.appendChild(descriptionButton);

                        const competenceButton = document.createElement('button');
                        competenceButton.innerText = 'Compétences';
                        competenceButton.onclick = () => showModal('competenceModal', project.competences || []);
                        linksContainer.appendChild(competenceButton);

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
                    carouselItem.setAttribute('class', 'carousel-item-ocr');
                    carouselItem.setAttribute('data-index', index);

                    const image = document.createElement('img');
                    image.setAttribute('src', item.cover);
                    carouselItem.appendChild(image);
                    carouselContainer.appendChild(carouselItem);
                });

                function showOCRCarouselItem(index) {
                    const items = document.querySelectorAll('.carousel-item-ocr');
                    const totalItems = items.length;

                    items.forEach((item, i) => {
                        const pos = (i - index + totalItems) % totalItems;
                        switch (pos) {
                            case 0:
                                item.style.transform = 'translateX(-300px) scale(0.8)';
                                item.style.opacity = '0.8';
                                item.style.zIndex = 2;
                                item.onclick = () => moveOCRCarousel(-1);
                                break;
                            case 1:
                                item.style.transform = 'translateX(0px) scale(1)';
                                item.style.opacity = '1';
                                item.style.zIndex = 3;
                                item.onclick = null;
                                updateDetails(i);
                                break;
                            case 2:
                                item.style.transform = 'translateX(300px) scale(0.8)';
                                item.style.opacity = '0.8';
                                item.style.zIndex = 2;
                                item.onclick = () => moveOCRCarousel(1);
                                break;
                            default:
                                item.style.transform = 'translateX(0px) scale(0.4)';
                                item.style.opacity = '0.4';
                                item.style.zIndex = 0;
                                item.onclick = null;
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

                showOCRCarouselItem(currentIndexOCR);

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
                                span.onclick = function () {
                                    modal.style.display = 'none';
                                };
                            }

                            window.onclick = function (event) {
                                if (event.target === modal) {
                                    modal.style.display = 'none';
                                }
                            };
                        }
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching OCR data:', error);
            });
        }});




// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed');

//     // Variables globales pour le carrousel de base
//     const carouselData = [
//         { title: "Curriculum", img: "./images/cv.jpg", script: "script-cv.js" },
//         { title: "Presentation", img: "./images/presentation.jpg", script: "script-presentation.js" },
//         { title: "Projets OpenClassRoom", img: "./images/projet_ocr.jpg", script: "script-ocr.js" },
//         { title: "Projets Professionnels", img: "./images/projets_pro.jpg", script: "script-pro.js" },
//         { title: "Me Contacter", img: "./images/Me_contacter.jpg", script: "script-contact.js" }
//     ];

//     const carouselContainer = document.querySelector('.carousel');
//     const contentContainer = document.querySelector('.content');

//     let currentIndex = 0;

//     // Fonction pour afficher les éléments du carrousel de base
//     function showCarouselItem(index) {
//         const items = document.querySelectorAll('.carousel-item');
//         const totalItems = items.length;
        
//         items.forEach((item, i) => {
//             const pos = (i - index + totalItems) % totalItems;
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
//                     item.onclick = () => {
//                         if (item.getAttribute('data-script') === "script-ocr.js") {
//                             loadOCRCarousel();
//                         } else {
//                             loadContent(item.getAttribute('data-script'));
//                         }
//                     };
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
//         });
//     }

//     // Fonction pour déplacer le carrousel de base
//     function moveCarousel(direction) {
//         const items = document.querySelectorAll('.carousel-item');
//         currentIndex = (currentIndex + direction + items.length) % items.length;
//         showCarouselItem(currentIndex);
//     }

//     // Chargement initial du carrousel de base
//     if (carouselContainer && contentContainer) {
//         carouselData.forEach(item => {
//             const carouselItem = document.createElement('div');
//             carouselItem.className = 'carousel-item';
//             carouselItem.setAttribute('data-script', item.script);

//             const img = document.createElement('img');
//             img.src = item.img;
//             img.alt = item.title;

//             carouselItem.appendChild(img);
//             carouselContainer.appendChild(carouselItem);
//         });

//         showCarouselItem(currentIndex);
//     }

//     // Fonction pour charger le contenu d'un script
//     function loadContent(scriptSrc) {
//         contentContainer.innerHTML = ''; // Efface le contenu actuel avant de charger le nouveau

//         const scriptElement = document.createElement('script');
//         scriptElement.src = scriptSrc;
//         scriptElement.classList.add('dynamic-script');

//         const oldScript = document.querySelector('.dynamic-script');
//         if (oldScript) {
//             oldScript.remove();
//         }

//         document.body.appendChild(scriptElement);
//     }

//     // Fonction pour charger le carrousel OCR
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

//                 let carouselContainer = document.querySelector('.carousel-ocr');
//                 if (!carouselContainer) {
//                     carouselContainer = document.createElement('div');
//                     carouselContainer.classList.add('carousel-ocr');
//                     document.querySelector('.content').appendChild(carouselContainer);
//                 }

//                 const baseCarousel = document.querySelector('.carousel');
//                 if (baseCarousel) {
//                     baseCarousel.style.display = 'none';
//                 }

//                 const titleContainer = document.createElement('div');
//                 titleContainer.setAttribute('class', 'carousel-title');
//                 carouselContainer.before(titleContainer);

//                 const titleElement = document.createElement('h1');
//                 titleContainer.appendChild(titleElement);

//                 const detailsContainer = document.createElement('div');
//                 detailsContainer.setAttribute('class', 'details-container');
//                 carouselContainer.after(detailsContainer);

//                 let currentIndexOCR = 0;

//                 function updateDetails(index) {
//                     const project = carouselData[index];
//                     if (project) {
//                         titleElement.innerText = project.title;
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

//                         const descriptionButton = document.createElement('button');
//                         descriptionButton.innerText = 'Description';
//                         descriptionButton.onclick = () => showModal('descriptionModal', project.description || []);
//                         linksContainer.appendChild(descriptionButton);

//                         const competenceButton = document.createElement('button');
//                         competenceButton.innerText = 'Compétences';
//                         competenceButton.onclick = () => showModal('competenceModal', project.competences || []);
//                         linksContainer.appendChild(competenceButton);

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
//                     const carouselItem = document.createElement('div');
//                     carouselItem.setAttribute('class', 'carousel-item-ocr');
//                     carouselItem.setAttribute('data-index', index);

//                     const image = document.createElement('img');
//                     image.setAttribute('src', item.img);
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

//                 function showModal(modalId, content) {
//                     const modal = document.getElementById(modalId);
//                     if (modal) {
//                         const modalContent = modal.querySelector('.modal-content');
//                         if (modalContent) {
//                             const modalText = modalContent.querySelector('p');
//                             const modalList = modalContent.querySelector('ul');

//                             if (modalId === 'descriptionModal') {
//                                 modalList.style.display = 'none';
//                                 modalText.style.display = 'block';
//                                 modalText.textContent = content;
//                             } else if (modalId === 'competenceModal') {
//                                 modalText.style.display = 'none';
//                                 modalList.style.display = 'block';
//                                 modalList.innerHTML = '';
//                                 content.forEach(item => {
//                                     const li = document.createElement('li');
//                                     li.textContent = item;
//                                     modalList.appendChild(li);
//                                 });
//                             }

//                             modal.style.display = 'block';

//                             const span = modalContent.querySelector('.close');
//                             if (span) {
//                                 span.onclick = function () {
//                                     modal.style.display = 'none';
//                                 };
//                             }

//                             window.onclick = function (event) {
//                                 if (event.target === modal) {
//                                     modal.style.display = 'none';
//                                 }
//                             };
//                         }
//                     }
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching OCR data:', error);
//             });
//     }
// });
