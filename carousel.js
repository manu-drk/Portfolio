document.addEventListener("DOMContentLoaded", function() {
    const carouselData = [
        { title: "Curriculum", img: "./images/cv.jpg", script: "script-cv.js" },
        { title: "Presentation", img: "./images/presentation.jpg", script: "script-presentation.js" },
        { title: "Projets OpenClassRoom", img: "./images/projet_ocr.jpg", script: "script-ocr.js" },
        { title: "Projets Professionnels", img: "./images/projets_pro.jpg", script: "script-pro.js" },
        { title: "Me Contacter", img: "./images/Me_contacter.jpg", script: "script-contact.js" }
    ];

    const carouselContainer = document.querySelector('.carousel');
    const contentContainer = document.querySelector('.content');

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

            carouselItem.addEventListener('click', () => {
                loadContent(item.script);
            });
        });
    }

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
});



// document.addEventListener("DOMContentLoaded", function() {
//     const carouselData = [
//         { title: "Curriculum", img: "./images/cv.jpg", script: "script-cv.js" },
//         { title: "Presentation", img: "./images/presentation.jpg", script: "script-presentation.js" },
//         { title: "Projets OpenClassRoom", img: "./images/projet_ocr.jpg", script: "script-ocr.js" },
//         { title: "Projets Professionnels", img: "./images/projets_pro.jpg", script: "script-pro.js" },
//         { title: "Me Contacter", img: "./images/Me_contacter.jpg", script: "script-contact.js" }
//     ];

//     const carouselContainer = document.querySelector('.carousel');
//     if (carouselContainer) {
//         carouselData.forEach(item => {
//             const carouselItem = document.createElement('div');
//             carouselItem.className = 'carousel-item';
//             carouselItem.setAttribute('data-link', item.link);

//             const img = document.createElement('img');
//             img.src = item.img;
//             img.alt = item.link;

//             carouselItem.appendChild(img);
//             carouselContainer.appendChild(carouselItem);

//             carouselItem.addEventListener('click', () => {
//                 window.location.href = item.link;
//             });
//         });
//     }
// });
