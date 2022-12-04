// playing field
const ourBoxAll = document.querySelectorAll('.box-outer');
const infoContainer = document.querySelector('.info-container')
const firstStep = document.querySelector('.first-step')
// block of choosing a step
const selectionBlock = document.querySelector('.selection-block')
// variety of step
const ourChoicesAll = document.querySelectorAll('.player-choice')
// cross = 1 , null = 0;
let player;
let computer;
let stepActive; // player or computer
let winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function gameOverCheck(step) {
    let checkingVictory = 0
    for (let i = 0; i < winCombinations.length; i++) {
        for (let q = 0; q < winCombinations[i].length; q++) {
            if (ourBoxAll[winCombinations[i][q]].className.includes(step)) {
                checkingVictory += 1
            }
        }
                if (checkingVictory === 3) {
            stepActive = ''
            console.log('Победа')
            break
        } else {
            checkingVictory = 0
        }
    }

    let checkingEnd = 0;
    ourBoxAll.forEach(elem => {
        if (elem.dataset.enable === 'passive') {
            checkingEnd += 1
        }
    })
    if (checkingEnd === 0) {
        stepActive = ''
        console.log('GameOver')
    }
}

// let check = ourBoxAll.every(function(elem) {
//     return !!(elem.includes('cross') || elem.includes('null'));
// });

function doComputer() {
    if (stepActive === 'computer') {
        let stepsVariety = []
        ourBoxAll.forEach((elem, index) => {
            if (elem.dataset.enable === 'passive') {
                stepsVariety.push(index)
            }
        })
        let step = Math.floor(Math.random() * (stepsVariety.length) - 1) + 1
        ourBoxAll[stepsVariety[step]].dataset.enable = 'active'
        if (computer === 1) {
            ourBoxAll[stepsVariety[step]].classList.add('box-cross')
            gameOverCheck('cross')
        } else if (computer === 0) {
            ourBoxAll[stepsVariety[step]].classList.add('box-null')
            gameOverCheck('null')
        }
        if (stepActive !== '') {
            stepActive = 'player'
        }
    }
}

// function of choosing step
function selectStep(selectedElement) {
    if (selectedElement.dataset.playerChoice === 'X') {
        player = 1;
        computer = 0
    } else {
        player = 0;
        computer = 1
    }
    stepActive = Math.floor(Math.random() * 10) % 2 === 0 ? 'player' : 'computer'
    console.log(stepActive)
    selectionBlock.style.display = 'none';
    if(stepActive === 'player'){
        firstStep.classList.add('player-step')
    }
    else firstStep.classList.add('computer-step')
    setTimeout(() => infoContainer.classList.add('a'), 1000)
    setTimeout(() => infoContainer.style.display = 'none', 2100)
    // setTimeout(doComputer, 2500)
    doComputer()

    // вывод контейнера чей ход первый
}

//  function of checking is square empty
function clickOnBox(activeElement) {
    if (stepActive === 'player') {
        if (activeElement.dataset.enable === 'passive') {
            activeElement.dataset.enable = 'active';
            if (player === 1) {
                activeElement.classList.add('box-cross');
                gameOverCheck('cross');
            } else if (player === 0) {
                activeElement.classList.add('box-null');
                gameOverCheck('null')
            }
        }
        if (stepActive !== '') {
            stepActive = 'computer'
        }
        // setTimeout(doComputer, 2500)
        doComputer()
    }
}


ourChoicesAll.forEach(elem => {
    elem.addEventListener('click', function () {
        selectStep(elem)
    })
})

ourBoxAll.forEach(elem => {
    elem.addEventListener('click', function () {
        clickOnBox(elem);
    })
})


// function (){}  - обычная
// ()=>{} - стрелочная


// //ООП

// const ourBoxAllObj = {
//     allBox : "привет",

//     clickBox (name) {
//         console.log( this.allBox + " " + name);
//     }
// }

// ourBoxAllObj.clickBox('Марина');
//console.log(ourBoxAllObj.allBox);
