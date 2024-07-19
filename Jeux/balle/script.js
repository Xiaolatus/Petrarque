document.addEventListener("DOMContentLoaded", () => {
    const ball = document.getElementById("ball");
    const container = document.getElementById("game-container");
    var scoreGauche = 0;
    var scoreDroite = 0;

    let velocityX = 0;
    let velocityY = 0;
    const friction = 0.98;
    const pushStrength = 5; // Force de poussée ajustable
    const maxDistance = 60; // Distance maximale en pixels pour pousser la balle

    // Position initiale de la balle
    ball.style.left = `${container.clientWidth / 2}px`;
    ball.style.top = `${container.clientHeight / 2}px`;
    let ballX = ball.getBoundingClientRect().left;
    let ballY = ball.getBoundingClientRect().top;

    const calculateDistance = (x1, y1, x2, y2) => {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    const resetBall = () => {
        document.getElementById("score").textContent = scoreGauche + " - " + scoreDroite;
        
        // Réinitialiser la position de la balle au centre
        ballX = container.clientWidth / 2;
        ballY = container.clientHeight / 2;
        velocityX = 0;
        velocityY = 0;
        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;

        // Masquer la balle pendant 3 secondes avant de réapparaître
        ball.style.display = "none";
        setTimeout(() => {
            ball.style.display = "block";
        }, 3000);
    };

    const moveBall = (e) => {
        const rect = container.getBoundingClientRect();
        let clientX, clientY;

        if (e.type === "mousemove") {
            clientX = e.clientX;
            clientY = e.clientY;
        } else if (e.type === "touchmove") {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        // Calculer la distance entre le curseur et la balle
        const distance = calculateDistance(rect.left + ballX, rect.top + ballY, clientX, clientY);

        // Vérifier si la distance est inférieure à la distance maximale
        if (distance <= maxDistance) {
            // Calcul de la direction de poussée opposée
            const dx = (rect.left + ballX) - clientX;
            const dy = (rect.top + ballY) - clientY;

            // Normaliser le vecteur de direction
            const length = Math.sqrt(dx * dx + dy * dy);
            const directionX = dx / length;
            const directionY = dy / length;

            // Appliquer la force de poussée dans la direction opposée
            velocityX += directionX * pushStrength;
            velocityY += directionY * pushStrength;

            // Debugging
            // console.log(`dx: ${dx}, dy: ${dy}, velocityX: ${velocityX}, velocityY: ${velocityY}`);
        }
    };

    const update = () => {
        ballX += velocityX;
        ballY += velocityY;

        velocityX *= friction;
        velocityY *= friction;

        // Collisions avec les bords du conteneur
        if (ballX < ball.clientWidth/2) {
            ballX = ball.clientWidth/2;
            velocityX *= -1;
        }
        if (ballX > container.clientWidth - ball.clientWidth/2) {
            ballX = container.clientWidth - ball.clientWidth/2;
            velocityX *= -1;
        }
        if (ballY < ball.clientHeight/2) {
            ballY = ball.clientHeight/2;
            velocityY *= -1;
        }
        if (ballY > container.clientHeight - ball.clientHeight/2) {
            ballY = container.clientHeight - ball.clientHeight/2;
            velocityY *= -1;
        }

        ball.style.left = `${ballX - ball.clientWidth/2}px`;
        ball.style.top = `${ballY - ball.clientHeight/2}px`;

        // Vérifier la collision avec les buts
        checkGoalCollision();

        requestAnimationFrame(update);
    }; 

    const checkGoalCollision = () => {
        // Coordonnées de la balle
        const ballRect = ball.getBoundingClientRect();
        const ballCenterX = ballRect.left + ballRect.width / 2;
        const ballCenterY = ballRect.top + ballRect.height / 2;

        // Coordonnées des buts
        const goalLeft = document.getElementById("goal-left");
        const goalRight = document.getElementById("goal-right");
        const goalLeftRect = goalLeft.getBoundingClientRect();
        const goalRightRect = goalRight.getBoundingClientRect();

        // Vérifier la collision avec le but gauche
        if (ballRect.left < goalLeftRect.right &&
            ballRect.right > goalLeftRect.left &&
            ballRect.top < goalLeftRect.bottom &&
            ballRect.bottom > goalLeftRect.top) {
            scoreDroite++;
            resetBall();
        }

        // Vérifier la collision avec le but droit
        if (ballRect.left < goalRightRect.right &&
            ballRect.right > goalRightRect.left &&
            ballRect.top < goalRightRect.bottom &&
            ballRect.bottom > goalRightRect.top) {
            scoreGauche++;
            resetBall();
        }
    };

    container.addEventListener("mousemove", moveBall);
    container.addEventListener("touchmove", moveBall);

    update();
});
