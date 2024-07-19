document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.touches');

    const cardData = [
        { imgSrcOff: 'img/01_Off.png', imgSrcOn: 'img/01_on.png', audioSrc: 'sounds/hit1.mp3' },
        { imgSrcOff: 'img/02_Off.png', imgSrcOn: 'img/02_on.png', audioSrc: 'sounds/hit2.mp3' },
        { imgSrcOff: 'img/03_Off.png', imgSrcOn: 'img/03_on.png', audioSrc: 'sounds/hit3.mp3' },
        { imgSrcOff: 'img/04_Off.png', imgSrcOn: 'img/04_on.png', audioSrc: 'sounds/hit4.mp3' },
        { imgSrcOff: 'img/05_Off.png', imgSrcOn: 'img/05_on.png', audioSrc: 'sounds/hit5.mp3' },
        { imgSrcOff: 'img/06_Off.png', imgSrcOn: 'img/06_on.png', audioSrc: 'sounds/hit6.mp3' },
    ];

    // const cardData = [
    //     { imgSrcOff: 'img/1 off.png', imgSrcOn: 'img/1 on.png', audioSrc: 'sounds/hit1.mp3' },
    //     { imgSrcOff: 'img/2 off.png', imgSrcOn: 'img/2 on.png', audioSrc: 'sounds/hit2.mp3' },
    //     { imgSrcOff: 'img/3 off.png', imgSrcOn: 'img/3 on.png', audioSrc: 'sounds/hit3.mp3' },
    //     { imgSrcOff: 'img/4 off.png', imgSrcOn: 'img/4 on.png', audioSrc: 'sounds/hit4.mp3' },
    //     { imgSrcOff: 'img/5 off.png', imgSrcOn: 'img/5 on.png', audioSrc: 'sounds/hit5.mp3' },
    //     { imgSrcOff: 'img/6 off.png', imgSrcOn: 'img/6 on.png', audioSrc: 'sounds/hit6.mp3' },
    // ];

    function createTouches() {
        cardData.forEach(data => {
            const touche = document.createElement('div');
            touche.classList.add('touche');
            touche.innerHTML = `
                <img src="${data.imgSrcOff}" alt="touche">
            `;
            touche.addEventListener('click', () => {
                playSound(data.audioSrc);
                toggleImage(touche, data.imgSrcOn, data.imgSrcOff);
            });
            gameBoard.appendChild(touche);
        });
    }

    function playSound(src) {
        const audio = new Audio(src);
        audio.play();
    }

    function toggleImage(touche, imgSrcOn, imgSrcOff) {
        const img = touche.querySelector('img');
        img.src = imgSrcOn;
        setTimeout(() => {
            img.src = imgSrcOff;
        }, 500); // Change back to the "off" image after 500ms
    }

    createTouches();
});