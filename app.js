
const cellElements = document.querySelectorAll('[data-cell]');
const x_class = 'x';
const o_class = 'o';
let o_Turn;
const board_container = document.getElementById('bored');
const winnerMessageX = document.getElementById('winnerMessageX');
const winnerMessageO = document.getElementById('winnerMessageO');
const winnerMessageXO = document.getElementById('winnerMessageXO');
const restartButton = document.querySelectorAll('.restart-btn');
const gameCambinations = 
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]


startGame();
restartButton.forEach(buttoms => {
    buttoms.addEventListener('click', startGame)
})

function startGame (){
    o_Turn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(x_class);
        cell.classList.remove(o_class);
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true});
    });
    setBoardHoverClass()
    winnerMessageX.classList.remove('showX')
    winnerMessageO.classList.remove('showO')
    winnerMessageXO.classList.remove('showXO')
}

function handleClick(e){
    const cell = e.target;
    const currentClass = o_Turn ? o_class : x_class;
    placeMark(cell, currentClass);
    if (checkWinner(currentClass)) {
        gameDone(false);
    }else if (isDraw()){
        gameDone(true)
    }else {
        swapF()
        setBoardHoverClass()
    }
}

function gameDone(draw){
    if(draw){
        winnerMessageXO.classList.add('showXO')
    }else {
        if (o_Turn){
            winnerMessageO.classList.add('showO')
        }else {
            winnerMessageX.classList.add('showX')
        }
    }
}

function isDraw(){
    return [...cellElements].every(cell => {{
        return cell.classList.contains(x_class) || cell.classList.contains(o_class);
    }})
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapF(){
    o_Turn = !o_Turn;
}

function setBoardHoverClass(){
    board_container.classList.remove(x_class);
    board_container.classList.remove(o_class);
    if (o_Turn){
        board_container.classList.add(o_class);
    }else{
        board_container.classList.add(x_class);
    }
}

function checkWinner(currentClass) {
    return gameCambinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

