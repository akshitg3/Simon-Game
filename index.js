// $("h1").css("color","blue")

// $("button").prop("disabled",true);
// $("button").addClass("click-animation");
// setTimeout(()=>{$("button").prop("disabled",false);$("button").removeClass("click-animation");},3000)

const buttonMap = new Map(); //color:number

var pointer = 0;

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
    sequence.push(numberGenerator());
    animateSequence();
}

const beginGame = () =>{
    addToSequence();
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
        $('button').prop('disabled',true);
        console.log("game over");
    }
}

const gameOver = () => {

}

const getColorName = function (searchValue) {
    for (let [key, value] of buttonMap.entries()) {
      if (value === searchValue)
        return key;
    }
}

$("button").on("click",(event)=>{
    // console.log(event.target.id);
    checkSequence(event.target.id);

});





// console.log(getColorName(buttonMap,0));
// animateSequence();
beginGame();