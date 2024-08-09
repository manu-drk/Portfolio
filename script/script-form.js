// Initialiser EmailJS avec la nouvelle méthode
(function() {
    emailjs.init('-f7IIOlFXZYmGRWTZ'); 
})();

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM entièrement chargé et analysé');

    function loadFormCarousel() {
        fetch('datas/form.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('La réponse du réseau n\'était pas correcte ' + response.statusText);
                }
                return response.json();
            })
            .then(formData => {
                console.log('Données du formulaire chargées :', formData);

                const carouselContainer = document.querySelector('.carousel-form');
                const titleContainer = document.createElement('div');
                titleContainer.setAttribute('class', 'carousel-title');

                const titleElement = document.createElement('h1');
                titleElement.textContent = formData.form.title;
                titleContainer.appendChild(titleElement);
                carouselContainer.before(titleContainer);

                function createCarouselItem() {
                    carouselContainer.innerHTML = ''; // Effacer les éléments existants

                    const carouselItem = document.createElement('div');
                    carouselItem.setAttribute('class', 'carousel-item-form');

                    // Créer l'élément de formulaire
                    const formElement = document.createElement('form');
                    formElement.setAttribute('id', 'email-form');

                    formData.form.fields.forEach(field => {
                        const formField = document.createElement('div');
                        formField.classList.add('form-field');

                        const label = document.createElement('label');
                        label.textContent = field.label;
                        label.setAttribute('for', field.name);
                        formField.appendChild(label);

                        let input;
                        if (field.type === 'textarea') {
                            input = document.createElement('textarea');
                        } else {
                            input = document.createElement('input');
                            input.setAttribute('type', field.type);
                        }

                        input.setAttribute('name', field.name);
                        input.setAttribute('placeholder', field.placeholder);
                        formField.appendChild(input);

                        formElement.appendChild(formField);
                    });

                    // Ajouter le bouton de soumission
                    const submitButton = document.createElement('button');
                    submitButton.setAttribute('type', 'submit');
                    submitButton.textContent = 'Envoyer';
                    formElement.appendChild(submitButton);

                    carouselItem.appendChild(formElement);
                    carouselContainer.appendChild(carouselItem);
                }

                createCarouselItem();

                // Ajouter un écouteur d'événement pour la soumission du formulaire
                document.getElementById('email-form').addEventListener('submit', function(event) {
                    event.preventDefault();

                    // Collecter les données du formulaire
                    const formData = new FormData(event.target);
                    const formObject = {};
                    formData.forEach((value, key) => {
                        formObject[key] = value;
                    });

                    // Envoyer l'email en utilisant EmailJS
                    emailjs.send('service_5vqqmdi', 'template_l0mzaxl', formObject)
                        .then((response) => {
                            console.log('SUCCÈS !', response.status, response.text);
                            alert('Email envoyé avec succès !');
                        }, (error) => {
                            console.error('ÉCHEC...', error);
                            alert('L\'envoi de l\'email a échoué.');
                        });
                });
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données du formulaire :', error);
            });
    }

    loadFormCarousel();
});
