const buttonMap = new Map(); //color:number

var pointer = 0;
var level = 0;
var sequence = [];


const numberGenerator = function () {
    return Math.floor(Math.random() * 4);
}


const addToSequence = () => {
    level++;
    $('h1').text(`Level ${level}`);

    sequence.push(numberGenerator());

    animateSequence();
}


const beginGame = () => {
    $('.game-text').remove()

    $(window).off('keydown');

    addToSequence();

    $("button").on("click", (event) => {
        checkSequence(event.target.id);

    });

}


function timer(ms) { 
    return new Promise(res => setTimeout(res, ms)); 
}


async function animateSequence() {
    $('button').prop('disabled', true);

    $(`#${getColorName(sequence[sequence.length - 1])}`).addClass('click-animation');
    await timer(2000);
    $(`#${getColorName(sequence[sequence.length - 1])}`).removeClass('click-animation');

    $('button').prop('disabled', false);
}


const checkSequence = (keyPressedNumber) => {
    if (buttonMap.get(keyPressedNumber) === sequence[pointer]) {
        pointer++;
        if (pointer == sequence.length) {
            pointer = 0;
            addToSequence();
        }
    }
    else {
        gameOver();
    }
}


const gameOver = async () => {
    $('button').prop('disabled', true);
    $(document.body).addClass('game-over');
    await timer(100);
    $(document.body).removeClass('game-over');
    $(document.body).append("<p class='game-text'>Game Over</p>");
    $(document.body).append("<p class='game-text'>Press 'R' to start</p>");
    gameRestart();
}


const getColorName = function (searchValue) {
    for (let [key, value] of buttonMap.entries()) {
        if (value === searchValue)
            return key;
    }
}


function gameStart() {
    $.each($("button"), (index, value) => {
        buttonMap.set(value.id, index)
    })
    
    $(window).on("keydown", function (event) {
        if (event.key === 'f') {
            beginGame();
        }
    });
    $(document.body).append("<p class='game-text'>Press 'F' to start</p>");
}


function gameRestart() {
    pointer = 0;
    level = 0;
    sequence = [];
    $("button").off("click");
    $(window).on("keydown", function (event) {
        if (event.key === 'r') {
            beginGame();
        }
    });
}


gameStart();