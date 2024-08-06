document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    function loadFormCarousel() {
        fetch('datas/form.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(formData => {
                console.log('Form data loaded:', formData);

                const carouselContainer = document.querySelector('.carousel-form');
                const titleContainer = document.createElement('div');
                titleContainer.setAttribute('class', 'carousel-title');

                const titleElement = document.createElement('h1');
                titleElement.textContent = formData.form.title;
                titleContainer.appendChild(titleElement);
                carouselContainer.before(titleContainer);

                function createCarouselItem() {
                    carouselContainer.innerHTML = ''; // Clear existing items

                    const carouselItem = document.createElement('div');
                    carouselItem.setAttribute('class', 'carousel-item-form');

                    // Create form element
                    const formElement = document.createElement('form');

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

                    // Add submit button
                    const submitButton = document.createElement('button');
                    submitButton.setAttribute('type', 'submit');
                    submitButton.textContent = 'Envoyer';
                    formElement.appendChild(submitButton);

                    carouselItem.appendChild(formElement);
                    carouselContainer.appendChild(carouselItem);
                }

                createCarouselItem();
            })
            .catch(error => {
                console.error('Error fetching form data:', error);
            });
    }

    loadFormCarousel();
});


// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed');

//     fetch('datas/form.json')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Form data loaded:', data);

//             const formContainer = document.querySelector('.carousel-form');

//             if (!formContainer) {
//                 console.error('Form container not found');
//                 return;
//             }

//             // Créer et ajouter le conteneur de titre avant le conteneur du formulaire
//             const titleContainer = document.createElement('div');
//             titleContainer.setAttribute('class', 'carousel-title');
//             const titleElement = document.createElement('h1');
//             titleElement.textContent = data.form.title;
//             titleContainer.appendChild(titleElement);
//             formContainer.parentNode.insertBefore(titleContainer, formContainer);

//             // Créer l'élément du formulaire
//             const formElement = document.createElement('form');

//             // Parcourir et ajouter les champs au formulaire
//             data.form.fields.forEach(field => {
//                 const formField = document.createElement('div');
//                 formField.classList.add('form-field');

//                 const label = document.createElement('label');
//                 label.textContent = field.label;
//                 label.setAttribute('for', field.name);
//                 formField.appendChild(label);

//                 let input;
//                 if (field.type === 'textarea') {
//                     input = document.createElement('textarea');
//                 } else {
//                     input = document.createElement('input');
//                     input.setAttribute('type', field.type);
//                 }

//                 input.setAttribute('name', field.name);
//                 input.setAttribute('placeholder', field.placeholder);
//                 formField.appendChild(input);

//                 formElement.appendChild(formField);
//             });

//             // Ajouter le bouton de soumission
//             const submitButton = document.createElement('button');
//             submitButton.setAttribute('type', 'submit');
//             submitButton.textContent = 'Envoyer';
//             formElement.appendChild(submitButton);

//             formContainer.appendChild(formElement);
//         })
//         .catch(error => console.error('Error loading JSON:', error));
// });

