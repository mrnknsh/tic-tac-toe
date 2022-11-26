const ourBoxAll = document.querySelectorAll('.box-outer');
const selectionBlock = document.querySelector('.selection-block')
const ourChoicesAll = document.querySelectorAll('.player-choice')
// креcтик = 1 , если нолик = 0;
let player;

function selectAMove (selectedElement){
    selectionBlock.style.display = 'none';
    if(selectedElement.className.includes('player-choice-cross')){
        player = 1
    }
    else player = 0
}

ourChoicesAll.forEach(elem =>{
    elem.addEventListener('click', function(){
        selectAMove(elem)
    })
})

//  функция, которая проверяет пустой ли квадратик
function clickOnBox (activeElement) {
    if(activeElement.dataset.enable === 'passive') {
        activeElement.dataset.enable = 'active';
        if(player === 1){
            activeElement.classList.add('box-cross');
        }
        else if(player === 0){
            activeElement.classList.add('box-null');
        }
    }
} 

// function (){}  - обычная
// ()=>{} - стрелочная

ourBoxAll.forEach(elem=>{
    elem.addEventListener('click', function (){
        clickOnBox(elem);
    })
})



// //ООП

// const ourBoxAllObj = {
//     allBox : "привет",

//     clickBox (name) {
//         console.log( this.allBox + " " + name);
//     }
// }

// ourBoxAllObj.clickBox('Марина');
//console.log(ourBoxAllObj.allBox);
