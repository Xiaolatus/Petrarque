document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('.image-container');
    const canvas = document.querySelector('.color-canvas');
    const ctx = canvas.getContext('2d');
    const fadeOutTime = 6000; // Temps de disparition en millisecondes
    const radius = 150; // Rayon des cercles

    // Charger l'image en couleur (pré-chargée)
    const colorImage = new Image();
    colorImage.src = 'img/vangogh.png';

    // Adapter la taille du canvas à celle de l'image noir et blanc
    const bwImage = document.querySelector('.bw');
    bwImage.onload = () => {
        canvas.width = bwImage.width;
        canvas.height = bwImage.height;
    };

    const circles = [];

    function drawCircle(x, y, startTime) {
        const interval = setInterval(() => {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
            const opacity = Math.max(0, 1 - (elapsedTime / fadeOutTime));

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            circles.forEach(circle => {
                ctx.save();
                ctx.beginPath();
                ctx.arc(circle.x, circle.y, radius, 0, Math.PI * 2, false);
                ctx.clip();
                ctx.globalAlpha = circle.opacity;
                ctx.drawImage(colorImage, 0, 0, canvas.width, canvas.height);
                ctx.restore();
            });

            if (opacity <= 0) {
                clearInterval(interval);
                const index = circles.findIndex(circle => circle.startTime === startTime);
                if (index !== -1) circles.splice(index, 1);
            }
        }, 0);
    }

    imageContainer.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const startTime = performance.now();

        circles.push({ x, y, startTime, opacity: 1 });
        drawCircle(x, y, startTime);
    });
});
