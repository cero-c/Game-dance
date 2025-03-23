//bronvermelding 1. https://v1.scrimba.com/scrim/co19b4656a1aa1c4a0756732f?pl=pZgNL9HV

let danceName = document.getElementById('dance-name');
let isLevel = document.getElementById('level');
let currentLevel = 1;
let isVideo = document.getElementById('dance-video');

let isTimer = document.getElementById('timer');
let leftTime = 60;
let timeSet = null;
let result = document.getElementById('result');

let replayButton = document.getElementById('replay');
let nextButton = document.getElementById('next');
let checkButton = document.getElementById('check-button');
let startAgain = document.getElementById('again');

let playGame = true;
let isScore = document.getElementById('score');
let totalScore = 0;
let bonusPoint = 0;

let videoPlay = 0;
const maxPlay = 2;
const danceVideo = document.getElementById('dance-video');
let isView = document.getElementById('video-view');

const imgLight = document.querySelector('#bulb'); //hint//
let lightOn = false;
const areHints = [ "Check the back of the cards for instructions and clues like 'First, then...'", "Did you mix up two similar cards?", "Try the moves yourself—it might help!", "In this dance, we step right three times, then move back and forth"];
let showHint = document.getElementById ('tips');

const endMessages = [ "You are the Halay master! Amazing job!", "Incredible! You've mastered the Baso dance!", "Wow, you're a true dance champion!" ];


//naam-kaarten-filmpje voor elk niveau
const areCards = {
    1: {
        cards: [
            { order: 1, imageSrc: 'images/figuur-1.png', description: 'Get in position to start. Arms bent at the elbows and standing at a straight angle' },
            { order: 2, imageSrc: 'images/figuur-2.png', description: 'Start with take a step to the right with the right foot' },
            { order: 3, imageSrc: 'images/figuur-3.png', description: 'Take a step to the right with the left foot' },
            { order: 4, imageSrc: 'images/figuur-4.png', description: 'Take a step to the right with the right foot' },
            { order: 5, imageSrc: 'images/figuur-5.png', description: 'Put your left foot next to your right foot and step on the floor with your toe' },
        ],
        danceName: 'Baso dance from Idîr in the Serhad province',
        videoSrc: 'videos/idir-1.mp4',
        currentLevel: 'Level: 1',
    },
    2: {
        cards: [
            { order: 1, imageSrc: 'images/idir-figure-1.png', description: 'First put your left foot one step forward' },
            { order: 2, imageSrc: 'images/idir-figure-2.png', description: 'Step with the tip of the left foot next to the right heel and lean forward with your torso' },
            { order: 3, imageSrc: 'images/idir-figure-3.png', description: 'Then the trunk straightens and tilts backwards. At this time, your weight is on your left foot' },
            { order: 4, imageSrc: 'images/idir-figure-4.png', description: 'Put your weight on your right foot again and lean forward with your torso' },
            { order: 5, imageSrc: 'images/idir-figure-5.png', description: 'Finally, rise backwards and straighten up' },
        ],
        danceName: 'Baso dance from Idîr in the Serhad province',
        videoSrc: 'videos/idir-2.mp4',
        currentLevel: 'Level: 2',
    },
    3: {
        cards: [
            { order: 1, imageSrc: 'images/1.png', description: 'First, lift the left foot, bring it forward and pull it back' },
            { order: 2, imageSrc: 'images/2.png', description: 'Take a step backwards with your left foot to start the backward movement' },
            { order: 3, imageSrc: 'images/3.png', description: 'Take a step back with your right foot' },
            { order: 4, imageSrc: 'images/4.png', description: 'Step back once more with your left foot' },
            { order: 5, imageSrc: 'images/5.png', description: 'Put your right foot next to your left foot. Thus return to the starting position' },
        ],
        danceName: 'Baso dance from Idîr in the Serhad province',
        videoSrc: 'videos/idir-3.mp4',
        currentLevel: 'Level: 3',
    }
}


//start-button: begin te spellen
document.getElementById('start-button').addEventListener('click', function () {
    document.querySelector('header').style.display = 'none';
    document.getElementById('main-game').style.display = 'flex';
    document.getElementById('footer-game').style.display = 'flex';
    console.log(`It works`);
    startGame(currentLevel);
    showScore();
});

function startGame(level) {
    document.querySelectorAll('.card .selected').forEach(card => card.classList.remove('selected'));
    const orderContainer = document.getElementById('order-container');
    document.querySelectorAll('.card-order').forEach(container => {container.innerHTML ='';})
    createCards(level);
    playVideo(level);
    showLevel();
    showDanceName(level);
    startTimer();
}

//create-cards https://www.w3schools.com/jsref/jsref_object_create.asp & https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_object_met_create


//Bron: JavaScript-code voor het genereren van roterende kaarten, ontwikkeld met behulp van Grok. Opdracht: “Ik heb divs aangemaakt met createElement in javascript en daar een afbeelding in geplaatst. Ik wil dat deze divs kaarten omdraaien. Wat moet ik hiervoor doen in javascript?” Welke codes zijn duidelijk met een note 'van hier tot hier'.
function createCards(level) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    const levelData = areCards[level];
    if (!levelData) return;
// Bron: Gebruik van return: https://www.youtube.com/watch?v=Grteoxyua7E&list=PLURN6mxdcwL86Q8tCF1Ef6G6rN2jAg5Ht&index=46&ab_channel=EnesBayram (Javascript tutorials in het Turks)
    flippedCards = shuffleCards(levelData.cards);

    flippedCards.forEach((card, index) => {
        const isCard = document.createElement('div');
        isCard.className = 'card';
        isCard.setAttribute('data-index', index);
       
        //van hier
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        const front = document.createElement('div');
        front.className = 'front';

        const img = document.createElement('img'); 
        img.src = card.imageSrc;
        img.style.objectFit = 'cover';
        front.appendChild(img);

        const back = document.createElement('div');
        back.className = 'back';
        back.textContent = card.description;

        cardInner.appendChild(front);
        cardInner.appendChild(back);
        isCard.appendChild(cardInner);
        cardContainer.appendChild(isCard);
        //tot hier met kleine aanpassingen.
        isCard.addEventListener('mouseout', () => {
            if (!isCard.classList.contains('selected')) {
                isCard.classList.remove('card-flipped');
            }
        });
        isCard.addEventListener('mouseover', () => {
            if (!isCard.classList.contains('selected')) {
                isCard.classList.add('card-flipped');
            }
        });
        isCard.addEventListener('click', () => {
            isCard.classList.remove('card-flipped');
            selectCards(isCard, level, flippedCards);
        });
        console.log(`Create cards and show me " ${levelData.currentLevel}`);
    });
}

function playVideo(level) {
    const levelData = areCards[level];
    isVideo.src = levelData.videoSrc;
    isVideo.load();
    console.log(`Video ${levelData.videoSrc}`);
}

function showLevel() {
    isLevel.textContent = `Level: ${currentLevel}`;
    console.log(`Level is ${currentLevel}`);
}

function showDanceName(level) {
    const levelData = areCards[level];
    danceName.textContent = levelData.danceName;
    console.log(`the name of the dance is ${levelData.danceName}`);
}

// video max 3 keer

danceVideo.addEventListener('play', function () {

    if (videoPlay < maxPlay) {
        videoPlay++;
        isView.textContent = `Views of the video: ${videoPlay} / ${maxPlay + 1}`
    } else {
        if (danceVideo) {
            danceVideo.controls = false
            isView.textContent = `Video can be viewed up to 3 times.`
        }
    }
    console.log(`video is ${bonusPoint} keer bekeken.`)
})



//timer start/ stop/ decrease/ end/ run with setInterval&clearInterval 
//Bron: https://v1.scrimba.com/scrim/co471490ab8f6423b409ca631?pl=pZgNL9HV
//Bron: SetTimeout, setInterval, clearInterval en herhalingen: https://v1.scrimba.com/playlist/pZgNL9HV 

function startTimer() {
    leftTime = 60;
    playGame = true;
    console.log(`timer works and left time: ${leftTime}`);
    stopOldTimer();
    runTimer();

}

function showTime() {
    isTimer.textContent = `Time left: ${leftTime}`;
}

function stopOldTimer() {
    if (timeSet) {
        clearInterval(timeSet);
    }
};

function decreaseTime() {
    leftTime--;
    showTime();
    console.log(`doesnt it work?`);
}

function timeOver() {
    if (leftTime <= 0) {
        clearInterval(timeSet);
        endGame();
    }
}

function endGame() {
    playGame = false;
    result.textContent = "Oeps, time's up. Let's try again!";
    replayButton.style.display = 'block';
    checkButton.disabled = true;
}

function runTimer() {
    timeSet = setInterval(() => {
        if (!playGame) {
            clearInterval(timeSet);
            return;
        }
        decreaseTime();
        timeOver();
    }, 1000);

}

function stopTimer() {
    clearInterval(timeSet);
}


//score: leftTime*2+ 10 of 5 bonus point als de video niet maximaal keer bekeken is. 

function calculateScore(isCorrect) {

    if(!isCorrect) {
        return { levelScore: 0, rawScore: 0, bonusPoint:0 };
    }
    let rawScore = leftTime * 2;
    let bonusPoint = 0;
    if (videoPlay <= 1) {
        bonusPoint = 10;
    } else if (videoPlay === 2) {
        bonusPoint = 5;
    } else if (videoPlay === 3) {
        bonusPoint = 0;
    }
    let levelScore = rawScore + bonusPoint;
    return {levelScore, rawScore, bonusPoint};

 
}

function showScore(scoreData) {
    scoreData = scoreData || { levelScore: 0, rawScore: 0, bonusPoint: 0};
    totalScore += scoreData.levelScore;
    isScore.textContent = `Score ${totalScore}`;
    console.log(`score is: ${totalScore}`)
}

//shuffle-cards Fisher-Yates https://learnersbucket.com/examples/javascript/shuffle-deck-of-cards-in-javascript/

function shuffleCards(cards) {
    let array = [...cards];
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function removeCard(cardClone, currentContainer, cardIndex) {
    console.log('Removing card with index:', cardIndex);
    const allCards = document.querySelectorAll('#card-container .card');
    console.log('All cards in card-container:', allCards);
    if (allCards.length === 0) {
        console.error('card-container is empty, cannot remove card');
        return;
    }

    currentContainer.innerHTML = ''; // innerHTML alles verwijderen.

    const originalCard = allCards[cardIndex];
    console.log('Original card:', originalCard);
    if (originalCard) {
        originalCard.style.display = 'block';
        originalCard.classList.remove('selected');
    } else {
        console.error('Original card not found at index:', cardIndex);
    }
}
//kies-kaarten
function selectCards(card, level, flippedCards) {
    if (card.classList.contains('selected')) return;

    card.classList.add('selected');
    card.style.display = 'none';

    const containers = document.querySelectorAll('.card-order');
    // eerst lege div
    let currentContainer = null;
    for (let i = 0; i < containers.length; i++) {
        if (containers[i].children.length === 0) {
            currentContainer = containers[i];
            break;
        }
    }

    if (!currentContainer) {
        console.log('No empty div');
        card.style.display = 'block';
        card.classList.remove('selected');
        return;
    }
// Ik heb de kaarten gekloond op basis van je feedback van les 5a. Ik had er niet aan gedacht.
    const cardClone = card.cloneNode(true);
    cardClone.classList.remove('card-flipped');
    cardClone.classList.remove('selected');
    cardClone.style.display = 'block';

    const cardIndex = parseInt(card.getAttribute('data-index'), 10);
    console.log('Selected card index:', cardIndex);
    if (isNaN(cardIndex)) {
        console.error('Invalid card index:', cardIndex);
        return;
    }

    const cardOrder = flippedCards[cardIndex].order;
    cardClone.setAttribute('data-order', cardOrder);
    cardClone.setAttribute('data-index', cardIndex);

    // om terug te sturen
    const removeX = document.createElement('span');
    removeX.textContent = 'X';
    removeX.style.position = 'absolute';
    removeX.style.top = '1rem';
    removeX.style.right = '1rem';
    removeX.style.cursor = 'pointer';
    removeX.style.color = 'red';
    cardClone.appendChild(removeX);

    cardClone.addEventListener('click', () => {
        removeCard(cardClone, currentContainer, cardIndex);
    });
    currentContainer.appendChild(cardClone);
}


//check-order
function checkOrder(level, flippedCards) {
    const levelData = areCards[level];
    const correctOrder = levelData.cards.map(card => card.order);
    console.log('Correct order:', correctOrder);

    const placeholders = document.querySelectorAll('.card-order .card');
    console.log('Placeholders (cards in card-order):', placeholders);
    if (placeholders.length !== correctOrder.length) {
        result.textContent = 'Order all cards!';
        return false;
    }
    const userOrder = [];
    placeholders.forEach((placeholder) => {
        const cardOrder = parseInt(placeholder.getAttribute('data-order'), 10);
        console.log('Card order (data-order):', cardOrder);
        userOrder.push(cardOrder);
    });

    const isCorrect = correctOrder.every((order, index) => order === userOrder[index]);

    if (isCorrect) {
        if( currentLevel < 3){
            result.textContent = 'Correct order! You got this';
            nextButton.style.display = 'block';
            checkButton.style.display = 'none';
            const scoreData = calculateScore(true);
            showScore(scoreData)

        } else {
            const randomMessage = Math.floor(Math.random() * endMessages.length);
            const lastMessage = endMessages[randomMessage];
            result.textContent = lastMessage;
            startAgain.style.display = 'block';
            nextButton.style.display = 'none';
            replayButton.style.display ='none';
            checkButton.style.display = 'none';
            const scoreData = calculateScore(true);
            showScore(scoreData)
        }
    } else {
        let rawScore = 0;
        let bonusPoint = 0;
        let levelScore = rawScore + bonusPoint;
        result.textContent = 'Wrong order, try again!';
        replayButton.style.display = 'block';
        showScore({ levelScore, rawScore, bonusPoint});
    } 
    return isCorrect;
}

startAgain.addEventListener( 'click' , () => {
    console.log('Start Again button!');
    window.location.reload();
})

checkButton.addEventListener('click', () => {
    checkOrder(currentLevel);
    stopTimer();
});


replayButton.addEventListener('click', () => {
    startGame(currentLevel);
    videoPlay = 0;
    isView.textContent = `Views of the video: ${videoPlay} / ${maxPlay+1}`;
    result.textContent = "Don't worry, you need practies, that's it!";
    replayButton.style.display = 'none';
    nextButton.style.display = 'none';
    checkButton.style.display = 'block';
});

nextButton.addEventListener('click', () => {
    currentLevel++;
    if (currentLevel > 3) {
        nextButton.style.display = 'none';
        replayButton.style.display = 'block';
        checkButton.style.display = 'block';
        return;
    } else{
        result.textContent = "You're doing great! Keep learning!";
        danceVideo.controls = true;
        videoPlay = 0;
        isView.textContent = `Views of the video: ${videoPlay} / ${maxPlay+1}`;
        startGame(currentLevel);
        stopOldTimer();
        runTimer();
        replayButton.style.display = 'none';
        nextButton.style.display = 'none';
        checkButton.style.display = 'block';
    }
});

// lampje & hint : DLO opdracht: Light bulb

function turnLight(){
    if(lightOn) {
        imgLight.src = 'images/bulb_off.jpg';
        lightOn = false;
    } else if(!lightOn){
        imgLight.src = 'images/bulb_on.jpg';
        lightOn = true;
    }
};

imgLight.addEventListener ('click', () => {
    turnLight();
    if(lightOn){
        const randomHint = Math.floor(Math.random() * areHints.length);
        const isHint = areHints[randomHint];
        showHint.textContent = isHint;
        return;
    } else{
        showHint.textContent = 'Turn on the light for hints';
    }
    console.log('the next hint is', showHint);
})

//Bron: Tutorials in het Turks vooral voor het gebruik van return & for each: https://youtube.com/playlist?list=PLURN6mxdcwL86Q8tCF1Ef6G6rN2jAg5Ht&si=piVdfqE1-a4en1V3