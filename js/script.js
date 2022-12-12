// playing field
const ourBoxAll = document.querySelectorAll('.box-outer');
const infoContainer = document.querySelector('.info-container')
const info = document.querySelector('.info')
// block of choosing a step
const selectionBlock = document.querySelector('.selection-block')
// variety of step
const ourChoicesAll = document.querySelectorAll('.player-choice')
// cross = 1 , null = 0;
const repeatBtn = document.querySelector('.repeat')
let winner;
let player;
let computer;
let stepActive; // player or computer
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let computerStepAfterChecking = true;

function gameOverCheck(step) {
    let checkingVictory = 0
    for (let i = 0; i < winCombinations.length; i++) {
        for (let q = 0; q < winCombinations[i].length; q++) {
            if (ourBoxAll[winCombinations[i][q]].className.includes(step)) {
                checkingVictory += 1
            }
        }
        if (checkingVictory === 3) {
            for (let a = 0; a < winCombinations[i].length; a++) {
                if (i === 0 || i === 1 || i === 2) {
                    setTimeout(() => ourBoxAll[winCombinations[i][a]].classList.add('horizontal-line'), 500)
                } else if (i === 3 || i === 4 || i === 5) {
                    setTimeout(() => ourBoxAll[winCombinations[i][a]].classList.add('vertical-line'), 500)
                } else if (i === 6) {
                    setTimeout(() => ourBoxAll[winCombinations[i][a]].classList.add('tilt-down'), 500)
                } else {
                    setTimeout(() => ourBoxAll[winCombinations[i][a]].classList.add('tilt-up'), 500)
                }
            }
            winner = stepActive === 'player' ? 'Вы победили!' : 'Победил компьютер!';
            // let a = stepActive === 'player' ? player : computer;
            stepActive = ''
            setTimeout(() => {
                infoContainer.style.display = 'block'
                info.style.padding = '24px 0'
                // winner = a === 1 ? "крестики" : 'нолики';
                info.innerHTML = winner
                repeatBtn.style.display = 'inline-block'
            }, 1500)
            break
        } else {
            checkingVictory = 0
        }
    }

    if (checkingVictory !== 3) {
        let checkingEnd = 0;
        ourBoxAll.forEach(elem => {
            if (elem.dataset.enable === 'passive') {
                checkingEnd += 1
            }
        })
        if (checkingEnd === 0) {
            stepActive = ''
            infoContainer.style.display = 'block'
            info.style.padding = '24px 0'
            info.innerHTML = 'Конец игры!'
            repeatBtn.style.display = 'inline-block'
        }
    }
}

// let check = ourBoxAll.every(function(elem) {
//     return !!(elem.includes('cross') || elem.includes('null'));
// });

function logicalStep(mark, playerMark, computerMark) {
    let checkingStep = 0
    if (computer === mark && computerStepAfterChecking === true) {
        for (let i = 0; i < winCombinations.length; i++) {
            for (let q = 0; q < winCombinations[i].length; q++) {
                if (ourBoxAll[winCombinations[i][q]].className.includes(playerMark)) {
                    checkingStep += 1
                }
            }
            if (checkingStep === 2) {
                for (let x = 0; x < winCombinations[i].length; x++) {
                    if (ourBoxAll[winCombinations[i][x]].dataset.enable === 'passive') {
                        ourBoxAll[winCombinations[i][x]].classList.add(computerMark);
                        ourBoxAll[winCombinations[i][x]].dataset.enable = 'active'
                        computerStepAfterChecking = false
                        checkingStep = 0
                        break
                    }
                }
            }
            checkingStep = 0
            if (!computerStepAfterChecking) {
                break
            }
        }
    }
    if (computer === 0) {
        gameOverCheck('null')
    } else if (computer === 1) {
        gameOverCheck('cross')
    }
}

function computerStep() {
    if (stepActive === 'computer') {
        logicalStep(1, 'box-cross', 'box-cross')
        logicalStep(0, 'box-null', 'box-null')
        logicalStep(1, 'box-null', 'box-cross')
        logicalStep(0, 'box-cross', 'box-null')
        if (computerStepAfterChecking === true) {
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
        }
        if (stepActive !== '') {
            stepActive = 'player'
        }
    }
}

function playerStep(activeElement) {
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
            computerStepAfterChecking = true
            if (stepActive !== '') {
                stepActive = 'computer'
            }
        } else {
            playerStep(activeElement)
        }
    }
}


function selectStep(selectedElement) {
    if (selectedElement.dataset.playerChoice === 'X') {
        player = 1;
        computer = 0
    } else {
        player = 0;
        computer = 1
    }
    stepActive = Math.floor(Math.random() * 10) % 2 === 0 ? 'player' : 'computer'
    selectionBlock.style.display = 'none';
    if (stepActive === 'player') {
        info.innerHTML = 'Ваш ход!'
        info.style.padding = '50px 0'
    } else {
        info.innerHTML = 'Ход компьютера!'
        info.style.padding = '50px 0'
    }
    setTimeout(() => {
        infoContainer.style.display = 'none';
        info.innerHTML = ''
    }, 1500)
    setTimeout(computerStep, 2500)
}


function clickOnBox(activeElement) {
    playerStep(activeElement)
    setTimeout(computerStep, 2500)
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

repeatBtn.addEventListener('click', () => {
    selectionBlock.style.display = 'block'
    repeatBtn.style.display = 'none'
    info.classList.remove('gameOver')
    ourBoxAll.forEach(elem => {
        elem.dataset.enable = 'passive';
        info.innerHTML = ''
        elem.classList.remove('box-cross')
        elem.classList.remove('box-null')
        elem.classList.remove('vertical-line')
        elem.classList.remove('horizontal-line')
        elem.classList.remove('tilt-up')
        elem.classList.remove('tilt-down')
    })
    computerStepAfterChecking = true
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
