document.addEventListener('DOMContentLoaded', () => {
    const maze = document.getElementById('maze');
    const levelSelect = document.getElementById('level-select');
    const upButton = document.getElementById('up');
    const leftButton = document.getElementById('left');
    const downButton = document.getElementById('down');
    const rightButton = document.getElementById('right');
    let player = document.createElement('div');
    let exit = document.createElement('div');
    let walls = [];
    let playerPosition = { top: 0, left: 0 };
    let currentLevel = 0;
    let movementInterval;

    player.id = 'player';
    exit.id = 'exit';
    maze.id ='maze'

    const levels = [
       
// NIVEAU 1 -------------------------------------------------------------------
        {
            playerStart: { top: 0, left: 0 },
            exit: { top: 270, left: 280 },
            maze: {width: 300, height: 290},
            walls: [
                { top: 0, left: 130, width: 10, height: 40 },
                { top: 40, left: 40, width: 100, height: 10 },
                { top: 40, left: 180, width: 120, height: 10 },
                { top: 40, left: 180, width: 10, height: 50 },
                { top: 90, left: 0, width: 50, height: 10 },
                { top: 90, left: 100, width: 90, height: 10 },
                { top: 90, left: 0, width: 50, height: 10 },
                { top: 90, left: 90, width: 10, height: 110 },
                { top: 90, left: 40, width: 10, height: 160 },
                { top: 140, left: 140, width: 110, height: 10 },//10
                { top: 140, left: 250, width: 10, height: 150 },
                { top: 190, left: 90, width: 120, height: 10 },
                { top: 250, left: 200, width: 10, height: 40 },
                { top: 240, left: 90, width: 120, height: 10 },
                { top: 90, left: 230, width: 70, height: 10 },
            ]
        },

// NIVEAU 2 -------------------------------------------------------------------
        {
            playerStart: { top: 0, left: 0 },
            exit: { top: 430, left: 320 },
            maze: {width: 340, height: 450},
            walls: [
                { top: 40, left: 0, width: 290, height: 10 },
                { top: 90, left: 190, width: 150, height: 10 },
                { top: 240, left: 0, width: 100, height: 10 },
                { top: 240, left: 150, width: 190, height: 10 },
                { top: 290, left: 40, width: 150, height: 10 },
                { top: 190, left: 240, width: 100, height: 10 },
                { top: 140, left: 150, width: 160, height: 10 },
                { top: 90, left: 40, width: 10, height: 150 },
                { top: 40, left: 90, width: 10, height: 160 },
                { top: 90, left: 140, width: 10, height: 160 },//10
                { top: 190, left: 190, width: 10, height: 50 },
                { top: 300, left: 40, width: 10, height: 150 },
                { top: 300, left: 90, width: 10, height: 110 },
                { top: 340, left: 140, width: 10, height: 110 },
                { top: 290, left: 190, width: 10, height: 120 },
                { top: 250, left: 240, width: 10, height: 160 },
                { top: 290, left: 290, width: 10, height: 160 },
            ]
        },

// NIVEAU 3 (temporaire) -------------------------------------------------------------------
        {
            playerStart: { top: 0, left: 0 },
            exit: { top: 670, left: 920 },
            maze: {width: 940, height: 690},
            walls: [
                { top: 40, left: 40, width: 260, height: 10 },
                { top: 50, left: 40, width: 10, height: 50 },
                { top: 90, left: 40, width: 310, height: 10 },
                { top: 0, left: 340, width: 10, height: 100 },
                { top: 140, left: 0, width: 290, height: 10 },
                { top: 140, left: 290, width: 10, height: 60 },
                { top: 140, left: 340, width: 10, height: 110 },
                { top: 240, left: 290, width: 10, height: 50 },
                { top: 240, left: 240, width: 50, height: 10 },
                { top: 190, left: 240, width: 10, height: 50 },  //10
                { top: 190, left: 190, width: 50, height: 10 },
                { top: 190, left: 50, width: 100, height: 10 },
                { top: 190, left: 40, width: 10, height: 210 },
                { top: 390, left: 40, width: 50, height: 10 },
                { top: 240, left: 90, width: 10, height: 160 },
                { top: 240, left: 140, width: 10, height: 200 },
                { top: 440, left: 40, width: 110, height: 10 },
                { top: 440, left: 190, width: 60, height: 10 },
                { top: 340, left: 190, width: 10, height: 110 },
                { top: 300, left: 240, width: 10, height: 150 },  //20
                { top: 240, left: 190, width: 10, height: 50 },
                { top: 290, left: 190, width: 400, height: 10 },
                { top: 240, left: 590, width: 10, height: 60 },
                { top: 240, left: 390, width: 200, height: 10 },
                { top: 190, left: 390, width: 10, height: 50 },
                { top: 190, left: 400, width: 300, height: 10 },
                { top: 40, left: 400, width: 200, height: 10 },
                { top: 40, left: 390, width: 10, height: 100 },
                { top: 140, left: 390, width: 260, height: 10 },
                { top: 0, left: 640, width: 10, height: 150 }, //30
                { top: 40, left: 600, width: 10, height: 60 },
                { top: 90, left: 440, width: 160, height: 10 },
                { top: 490, left: 0, width: 300, height: 10 },
                { top: 350, left: 290, width: 10, height: 250 },
                { top: 340, left: 290, width: 100, height: 10 },
                { top: 540, left: 40, width: 210, height: 10 }, //36
                { top: 550, left: 40, width: 10, height: 100 },
                { top: 640, left: 40, width: 300, height: 10 },
                { top: 590, left: 90, width: 210, height: 10 },
                { top: 390, left: 340, width: 10, height: 260 },//40
                { top: 300, left: 390, width: 10, height: 150 },
                { top: 500, left: 390, width: 10, height: 100 },
                { top: 490, left: 350, width: 100, height: 10 },
                { top: 340, left: 450, width: 200, height: 10 },
                { top: 340, left: 440, width: 10, height: 160 },
                { top: 640, left: 390, width: 200, height: 10 }, //46
                { top: 550, left: 440, width: 10, height: 100 },
                { top: 540, left: 440, width: 200, height: 10 },
                { top: 590, left: 490, width: 150, height: 10 },
                { top: 390, left: 640, width: 10, height: 300 },//50
                { top: 390, left: 490, width: 10, height: 160 },
                { top: 350, left: 540, width: 10, height: 150 },
                { top: 390, left: 590, width: 10, height: 100 },
                { top: 490, left: 540, width: 60, height: 10 },
                { top: 390, left: 650, width: 50, height: 10 },
                { top: 390, left: 690, width: 10, height: 260 }, 
                { top: 340, left: 740, width: 10, height: 350 },
                { top: 340, left: 690, width: 60, height: 10 },
                { top: 640, left: 790, width: 150, height: 10 },
                { top: 290, left: 790, width: 10, height: 350 }, //60
                { top: 240, left: 640, width: 10, height: 100 },
                { top: 290, left: 650, width: 150, height: 10 },
                { top: 590, left: 840, width: 100, height: 10 },
                { top: 240, left: 840, width: 10, height: 350 },
                { top: 40, left: 890, width: 10, height: 510 },
                { top: 240, left: 690, width: 200, height: 10 },
                { top: 40, left: 840, width: 10, height: 160 },
                { top: 90, left: 790, width: 10, height: 160 },
                { top: 40, left: 740, width: 10, height: 160 },
                { top: 40, left: 690, width: 10, height: 160 },
                { top: 40, left: 690, width: 150, height: 10 },
            ]
        },
// NIVEAU  -------------------------------------------------------------------
   
    ];

    function loadLevel(levelIndex) {
        const level = levels[levelIndex];
        playerPosition = level.playerStart;
        player.style.top = `${playerPosition.top}px`;
        player.style.left = `${playerPosition.left}px`;

        exit.style.top = `${level.exit.top}px`;
        exit.style.left = `${level.exit.left}px`;

        maze.innerHTML = ''; // Clear the maze
        maze.style.width = `${level.maze.width}px`;
        maze.style.height = `${level.maze.height}px`;
        maze.appendChild(player);
        maze.appendChild(exit);

        walls = [];
        let compteurWalls = 1
        level.walls.forEach(wallConfig => {
            const wall = document.createElement('div');
            wall.className = 'wall';
            wall.style.top = `${wallConfig.top}px`;
            wall.style.left = `${wallConfig.left}px`;
            wall.style.width = `${wallConfig.width}px`;
            wall.style.height = `${wallConfig.height}px`;
            wall.id = `${compteurWalls}`;
            walls.push(wall);
            maze.appendChild(wall);
            compteurWalls++;
        });
    }


    //déplacement du personnage
    function movePlayer(e) {
        let newPosition = { ...playerPosition };
        console.log(e.key);
        console.log(e.target);
        switch(e.key || e.target.id) {
            case 'ArrowUp':
            case 'up':
                newPosition.top -= 10;
                break;
            case 'ArrowDown':
            case 'down':
                newPosition.top += 10;
                break;
            case 'ArrowLeft':
            case 'left':
                newPosition.left -= 10;
                break;
            case 'ArrowRight':
            case 'right':
                newPosition.left += 10;
                break;
        }

        if (!isColliding(newPosition) && withinBounds(newPosition)) {
            playerPosition = newPosition;
            player.style.top = `${playerPosition.top}px`;
            player.style.left = `${playerPosition.left}px`;

            checkWin();
        }
    }

    // si le boutton est resté appuyé
    function startMoving(e) {
        movePlayer(e);
        movementInterval = setInterval(() => movePlayer(e), 100);
    }

    function stopMoving() {
        clearInterval(movementInterval);
    }


//Collision avec les murs
    function isColliding(newPosition) {
        const playerRect = { //définie les limites du joueur
            top: newPosition.top,
            left: newPosition.left,
            right: newPosition.left + 20,
            bottom: newPosition.top + 20
        };

        for (let wall of walls) {
            const wallRect = wall.getBoundingClientRect();
            const mazeRect = maze.getBoundingClientRect();
            const wallBounds = {
                top: wallRect.top - mazeRect.top,
                left: wallRect.left - mazeRect.left,
                right: wallRect.right - mazeRect.left -10,
                bottom: wallRect.bottom - mazeRect.top -10
            };

            if (playerRect.left < wallBounds.right &&
                playerRect.right > wallBounds.left &&
                playerRect.top < wallBounds.bottom &&
                playerRect.bottom > wallBounds.top) {
                return true;
            }
        }
        return false;
    }

    function withinBounds(newPosition) {
        return newPosition.top >= 0 &&
               newPosition.left >= 0 &&
               newPosition.top <= levels[currentLevel].maze.height - 20 &&
               newPosition.left <= levels[currentLevel].maze.width - 20;
    }

    function checkWin() {
        const playerRect = {
            top: playerPosition.top,
            left: playerPosition.left,
            right: playerPosition.left + 20,
            bottom: playerPosition.top + 20
        };

        const exitRect = exit.getBoundingClientRect();
        const mazeRect = maze.getBoundingClientRect();
        const exitBounds = {
            top: exitRect.top - mazeRect.top,
            left: exitRect.left - mazeRect.left,
            right: exitRect.right - mazeRect.left,
            bottom: exitRect.bottom - mazeRect.top
        };
//vérifie la collision entre le joueur et la sortie
        if (playerRect.left < exitBounds.right &&
            playerRect.right > exitBounds.left &&
            playerRect.top < exitBounds.bottom &&
            playerRect.bottom > exitBounds.top) {
                alert('Vous avez gagné ce niveau !');
                currentLevel++;
                if (currentLevel < levels.length) {
                    loadLevel(currentLevel);
                } else {
                    alert('Vous avez terminé tous les niveaux !');
                    resetGame();
                }
        }
    }

    function resetGame() {
        currentLevel = 0;
        loadLevel(currentLevel);
    }

    levelSelect.addEventListener('change', () => {
        currentLevel = parseInt(levelSelect.value, 10);
        loadLevel(currentLevel);
    });

    document.addEventListener('keydown', movePlayer);

    // Ajouter des écouteurs d'événements pour les boutons de contrôle
    upButton.addEventListener('mousedown', startMoving);
    leftButton.addEventListener('mousedown', startMoving);
    downButton.addEventListener('mousedown', startMoving);
    rightButton.addEventListener('mousedown', startMoving);

    upButton.addEventListener('mouseup', stopMoving);
    leftButton.addEventListener('mouseup', stopMoving);
    downButton.addEventListener('mouseup', stopMoving);
    rightButton.addEventListener('mouseup', stopMoving);

    document.addEventListener('mouseup', stopMoving);
    document.addEventListener('mouseleave', stopMoving);

    // Charger le premier niveau
    loadLevel(currentLevel);
});
