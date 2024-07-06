document.addEventListener('DOMContentLoaded', () => {
    // Vérifiez l'état du mode enregistré dans localStorage
    const isLightMode = localStorage.getItem('lightMode') === 'true';
    if (isLightMode) {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    }

    document.getElementById('mode-toggle').addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        document.body.classList.toggle('dark-mode');

        // Enregistrez l'état actuel dans localStorage
        const isLightMode = document.body.classList.contains('light-mode');
        localStorage.setItem('lightMode', isLightMode);
    });
});

// document.getElementById('mode-toggle').addEventListener('click', function() {
//     document.body.classList.toggle('light-mode');
// });