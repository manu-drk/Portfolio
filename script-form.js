document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    fetch('datas/form.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Form data loaded:', data);

            const formContainer = document.querySelector('.carousel-form');

            // Créer et ajouter le conteneur de titre avant le conteneur du formulaire
            const titleContainer = document.createElement('div');
            titleContainer.setAttribute('class', 'form-title');
            const titleElement = document.createElement('h1');
            titleElement.textContent = data.form.title;
            titleContainer.appendChild(titleElement);
            formContainer.before(titleContainer);

            // Créer l'élément du formulaire
            const formElement = document.createElement('form');

            // Parcourir et ajouter les champs au formulaire
            data.form.fields.forEach(field => {
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

            formContainer.appendChild(formElement);
        })
        .catch(error => console.error('Error loading JSON:', error));
});
