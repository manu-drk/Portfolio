function returnToHome() {
    window.location.href = 'index.html';
}

function goBack() {
    console.log('goBack called');
    history.back();
}




let currentIndex = 0;
// let currentIndex = 1;

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
    });
}

function moveCarousel(direction) {
    const items = document.querySelectorAll('.carousel-item');
    currentIndex = (currentIndex + direction + items.length) % items.length;
    showCarouselItem(currentIndex);
}


function goTo(url, target) {
    if (target === '_blank') {
        window.open(url, '_blank'); // Ouvre le lien dans une nouvelle fenêtre
    } else {
        window.location.href = url; // Ouvre le lien dans la même fenêtre
    }
}

// function goTo(url) {
//     window.location.href = url; // Ouvre le lien dans la même fenêtre
// }

document.addEventListener('DOMContentLoaded', () => {
    showCarouselItem(currentIndex);
});


