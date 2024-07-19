document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    let resetTimeout; // Variable pour stocker l'ID du timeout de réinitialisation

    // Fonction pour créer une fleur à une position aléatoire
    function createFlower() {
        const flower = document.createElement('div');
        flower.className = 'flower';

        // Position aléatoire de la fleur dans le conteneur
        const x = Math.random() * container.offsetWidth;
        const y = Math.random() * container.offsetHeight;
        flower.style.left = `${x}px`;
        flower.style.top = `${y}px`;

        // Ajouter la fleur au conteneur
        container.appendChild(flower);

        return flower;
    }

    // Fonction pour simuler l'effet de dispersion au clic ou au survol
    function interactWithFlower(x, y) {
        const splashCenter = { x, y };
        const flowers = document.querySelectorAll('.flower');

        flowers.forEach(flower => {
            const flowerRect = flower.getBoundingClientRect();
            const flowerCenter = {
                x: flowerRect.left + flowerRect.width / 2,
                y: flowerRect.top + flowerRect.height / 2
            };

            const dx = flowerCenter.x - splashCenter.x;
            const dy = flowerCenter.y - splashCenter.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Définir une distance maximale pour l'interaction (par exemple 150 pixels)
            const maxDistance = 250;

            if (distance <= maxDistance) {
                const dispersionFactor = 150;
                const dispersionX = dx / distance * dispersionFactor;
                const dispersionY = dy / distance * dispersionFactor;

                flower.style.transition = 'transform 0.3s ease-out';
                flower.style.transform = `translate(${dispersionX}px, ${dispersionY}px)`;

                // Réinitialiser la fleur après un délai
                setTimeout(() => {
                    flower.style.transform = 'none';
                }, 3000);
            }
        });
    }

    // Générer des fleurs initiales
    for (let i = 0; i < 50; i++) {
        createFlower();
    }

    // Écouter les événements de clic et de survol sur le conteneur pour interagir avec les fleurs
    container.addEventListener('mousemove', function(event) {
        interactWithFlower(event.clientX, event.clientY);
    });
});
