// $("h1").css("color","blue")

// $("button").prop("disabled",true);
// $("button").addClass("click-animation");
// setTimeout(()=>{$("button").prop("disabled",false);$("button").removeClass("click-animation");},3000)

const buttonMap = new Map(); //color:number

var pointer = 0;
var level = 0;
var sequence = [];
// sequence.push(1);
// console.log(sequence);

const numberGenerator = function(){
    return Math.floor(Math.random()*4);
}


// console.log(arr);

$.each($("button"),(index,value)=>{
    console.log(index,value.id);
    buttonMap.set(value.id,index)
})

console.log(buttonMap);

const addToSequence = () =>{
    level++;
    $('h1').text(`Level ${level}`);
    sequence.push(numberGenerator());
    animateSequence();
}

const beginGame = () =>{
    $('.game-text').remove()
    $(window).off('keydown');
    addToSequence();

    $("button").on("click",(event)=>{
        // console.log(event.target.id);
        checkSequence(event.target.id);
    
    });
    
}

function timer(ms) { return new Promise(res => setTimeout(res, ms)); }


async function animateSequence(){
    // $.each(sequence,(index,value)=>{
    //     // console.log(sequence);
    //     // console.log(value);        
    //     console.log(getColorName(value));
    //     await timer(2000);
    //     console.log("done")
    // })    
    $('button').prop('disabled',true);
    // for(let i=0;i<sequence.length;i++){
    //     // console.log(getColorName(sequence[i]));
    //     $(`#${getColorName(sequence[i])}`).addClass('click-animation');
    //     await timer(2000);
    //     $(`#${getColorName(sequence[i])}`).removeClass('click-animation');
    //     console.log("done");
    // }
    $(`#${getColorName(sequence[sequence.length-1])}`).addClass('click-animation');
    await timer(2000);
    $(`#${getColorName(sequence[sequence.length-1])}`).removeClass('click-animation');

    $('button').prop('disabled',false);
}

const checkSequence = (keyPressedNumber) =>{
    if (buttonMap.get(keyPressedNumber)===sequence[pointer]){
        console.log("correct");
        pointer++;
        if(pointer == sequence.length){
            pointer = 0;
            addToSequence();            
        }
    }
    else{
        gameOver();
        console.log("game over");
    }
}

const gameOver = async() => {
    $('button').prop('disabled',true);
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


function gameStart(){
    $(window).on("keydown",function(event){
        if(event.key === 'f'){
            beginGame();
        }
    });
    $(document.body).append("<p class='game-text'>Press 'F' to start</p>");
}

function gameRestart(){
    level = 0;
    sequence = [];
    $("button").off("click");
    $(window).on("keydown",function(event){
        if(event.key === 'r'){
            beginGame();
        }
    });
}



gameStart();

// console.log(getColorName(buttonMap,0));
// animateSequence();
// beginGame();