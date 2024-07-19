document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const popSound = document.getElementById('pop-sound');

    // Fonction pour créer un ballon à une position aléatoire
    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';

        // Position aléatoire du ballon dans le conteneur
        const x = Math.random() * (container.offsetWidth - 100);
        const y = Math.random() * (container.offsetHeight - 150);
        balloon.style.left = `${x}px`;
        balloon.style.top = `${y}px`;

        // Ajouter le ballon au conteneur
        container.appendChild(balloon);

        // Ajouter un événement de clic pour faire éclater le ballon
        balloon.addEventListener('click', function() {
            balloonBurst(balloon);
        });

        return balloon;
    }

    // Fonction pour simuler l'éclatement du ballon
    function balloonBurst(balloon) {
        // Changer l'image du ballon pour l'image éclatée
        balloon.classList.add('burst');
        popSound.play();

        // Réinitialiser après un délai
        setTimeout(() => {
            container.removeChild(balloon);
            createBalloon();
        }, 1000);
    }

    // Générer des ballons initiaux
    for (let i = 0; i < 20; i++) {
        createBalloon();
    }
});
