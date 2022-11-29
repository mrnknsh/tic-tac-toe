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
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1]
];


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

                    // вывод контейнера чей ход первый
}

                    // function checkWinner() {
                    //     let checkWinCombinations = []
                    //     ourBoxAll.forEach(elem => {
                    //         if (elem.className.includes('cross')) {
                    //             checkWinCombinations.push(1)
                    //         } else checkWinCombinations.push(0)
                    //     })
                    //     for (let i = 0; i < winCombinations.length; i++) {
                    //         if (JSON.stringify(winCombinations[i]) === JSON.stringify(checkWinCombinations)) {
                    //             console.log('finish')
                    //         } else console.log('game continues ')
                    //     }
                    // }

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
            playerStepCounter += 1
            stepActive = 'computer'
                    // checkWinner()
        }
    }
}

                    // if(stepActive === 'computer'){
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
