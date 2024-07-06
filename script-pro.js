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
                console.log('Pro data loaded:', carouselData);
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
                        switch (pos) {
                            case 0:
                                item.style.transform = 'translateX(-300px) scale(0.8)';
                                item.style.opacity = '0.8';
                                item.style.zIndex = 2;
                                item.onclick = () => moveProCarousel(-1);
                                break;
                            case 1:
                                item.style.transform = 'translateX(0px) scale(1)';
                                item.style.opacity = '1';
                                item.style.zIndex = 3;
                                item.onclick = null;
                                details[i].style.display = 'block';
                                break;
                            case 2:
                                item.style.transform = 'translateX(300px) scale(0.8)';
                                item.style.opacity = '0.8';
                                item.style.zIndex = 2;
                                item.onclick = () => moveProCarousel(1);
                                break;
                            default:
                                item.style.transform = 'translateX(0px) scale(0.4)';
                                item.style.opacity = '0.4';
                                item.style.zIndex = 0;
                                item.onclick = null;
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
            .catch(error => console.error('Error fetching Pro carousel data:', error));
    }

    loadPROCarousel();
});

function goBack() {
    console.log('goBack called');
    history.back();
}
