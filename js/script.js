// playing field
const ourBoxAll = document.querySelectorAll('.box-outer');
// block of choosing a move
const selectionBlock = document.querySelector('.selection-block')
// variety of moves
const ourChoicesAll = document.querySelectorAll('.player-choice')
// cross = 1 , null = 0;
let player;
let computer;
let playerStepCounter = 0;
let computerStepCounter = 0;
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

function checkWinner(move) {
    let arr = 0
    for (let i = 0; i < winCombinations.length; i++) {
        for (let q = 0; q < winCombinations[i].length; q++) {
            if (ourBoxAll[winCombinations[i][q]].className.includes(move)) {
                arr += 1
            }
        }
        if (arr === 3) {
            console.log('Game over')
        } else arr = 0
    }
}

// function of choosing move
function selectMove(selectedElement) {
    selectionBlock.style.display = 'none';
    if (selectedElement.dataset.playerChoice === 'X') {
        player = 1;
        computer = 0
    } else {
        player = 0;
        computer = 1
    }
    stepActive = Math.floor(Math.random() * 10) % 2 === 0 ? 'player' : 'computer'
    alert(stepActive)
    // вывод контейнера чей ход первый
}

//  function of checking is square empty
function clickOnBox(activeElement) {
    if (stepActive === 'player') {
        if (activeElement.dataset.enable === 'passive') {
            activeElement.dataset.enable = 'active';
            if (player === 1) {
                activeElement.classList.add('box-cross');
                checkWinner('cross')
            } else if (player === 0) {
                activeElement.classList.add('box-null');
                checkWinner('null')
            }
            playerStepCounter += 1
            stepActive = 'computer'
        }
    }
}

// if (stepActive === 'computer') {
//     if(computer === 1){
//         checkWinner('cross')
//     }
//     else if(computer === 0){
//         checkWinner('null')
//     }
//     computerStepCounter += 1
//     stepActive = 'player'
// }

ourChoicesAll.forEach(elem => {
    elem.addEventListener('click', function () {
        selectMove(elem)
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
