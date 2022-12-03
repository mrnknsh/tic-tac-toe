// playing field
const ourBoxAll = document.querySelectorAll('.box-outer');
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

function checkWinner(step) {
    let arr = 0
    for (let i = 0; i < winCombinations.length; i++) {
        for (let q = 0; q < winCombinations[i].length; q++) {
            if (ourBoxAll[winCombinations[i][q]].className.includes(step)) {
                arr += 1
            }
        }
        if (arr === 3) {
            stepActive = ''
            console.log('Game over')
        } else arr = 0
    }
}

function checkingEnd() {
    let checkingArr = 0;
    ourBoxAll.forEach(elem => {
        if (elem.dataset.enable === 'passive') {
            checkingArr += 1
        }
    })
    if (checkingArr === 0) {
        stepActive = ''
        console.log('GameOver')
    }
}


// let check = ourBoxAll.every(function(elem) {
//     return !!(elem.includes('cross') || elem.includes('null'));
// });
//
// console.log(our);

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
        } else if (computer === 0) {
            ourBoxAll[stepsVariety[step]].classList.add('box-null')
        }
        stepActive = 'player'
        checkWinner('cross')
        checkWinner('null')
        checkingEnd()
    }
}

// function of choosing step
function selectStep(selectedElement) {
    selectionBlock.style.display = 'none';
    if (selectedElement.dataset.playerChoice === 'X') {
        player = 1;
        computer = 0
    } else {
        player = 0;
        computer = 1
    }
    stepActive = Math.floor(Math.random() * 10) % 2 === 0 ? 'player' : 'computer'
    console.log(stepActive)
    setTimeout(doComputer, 2500)
    // вывод контейнера чей ход первый
}

//  function of checking is square empty
function clickOnBox(activeElement) {
    if (stepActive === 'player') {
        if (activeElement.dataset.enable === 'passive') {
            activeElement.dataset.enable = 'active';
            if (player === 1) {
                activeElement.classList.add('box-cross');
            } else if (player === 0) {
                activeElement.classList.add('box-null');
            }
            stepActive = 'computer'
            checkWinner('cross')
            checkWinner('null')
            checkingEnd()
            setTimeout(doComputer, 2500)
        }
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
