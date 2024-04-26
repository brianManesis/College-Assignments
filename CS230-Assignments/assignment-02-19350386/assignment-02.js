/* Tested in Google Chrome 110.0.5481.177 on 3840x2160 display and
    in firefox on linux in eolas lab 3.

    Keep const for the game Indicator light,
    Start button,
    Last score display and High score display.
*/

const gameIndicator = document.querySelector('#GameIndicator');
const LastScore = document.getElementById("LastScore");
const start = document.getElementById("START");
const HighScore = document.getElementById("HighScore");

/*
    const for all buttons in game.
*/
const red = document.getElementById("Red");
const blue = document.getElementById("Blue");
const yellow = document.getElementById("Yellow");
const green = document.getElementById("Green");

/*
    Object mapping numbers to button ids
*/
const buttons = {0:"Green",1:"Red",2:"Yellow",3:"Blue"};
/*
    The sequence the player has to repeat 
    and the sequence length.
    The high score of the current process.
*/
var sequence = [];
var sequenceCount = 0;
var highScore = 0;

/*
    Starts game:
    changes light from red to green
    game starts after 3 seconds (starts main playing loop after 1
    second and showSequence interval starts after 2 seconds).
    continuously plays (shows sequence then asks user to enter sequence)
    until enterSequence() returns false.
    The score is kept track of by keeping track of the last button added to the
    sequence when the game stopped playing.
    The loss displayer flashes the buttons to indicate game is over,
    the game is reset
    and finally the light goes to red.
*/
function gameStart(){
    start.disabled = true;
    changeGameStateLight("green");
    var playing = true;
    var score;
    setTimeout(async function(){
        while(playing){
            score = await showSequence()-1;
            var keepPlaying = await enterSequence();
            if(keepPlaying == false){
                playing = false;
            }
        }
        await lossDisplayer();
    
        updateLastScore(score);
        if(score>highScore){
            updateHighScore(score);
        }
        sequence = [];
        sequenceCount = 0;
        changeGameStateLight("red");
        start.disabled = false;
    },1000);
}

/*
    showSequence function returns a promise to be awaited by the main gameStart
    function. Each time showSequence is called a new number between 0-3
    is randomly selected and added to the end of the sequence.
    The time between each signal flash is found by the getIntervalTime
    function. An interval is set up to flash each signal in the sequence every 
    intervalTime seconds. Once the previous signal is flashed the next will begin.
    if the end of the sequence is reached, the promise is resolved passing
    passing sequenceCount back to the the score variable to calculate the current
    score.
*/
function showSequence(){
    return new Promise((resolve)=>{
        sequence[sequenceCount] = Math.floor(Math.random() * 4);
        sequenceCount++;
        let intervalTime = getIntervalTime(sequenceCount);
        let i = 0;
        var interval = setInterval(async function(){
            var x = buttons[sequence[i]];
            let button = '#'+x;
                await $(button).fadeOut(250);
                await $(button).fadeIn(250);
            i++;
            if(i==sequence.length){
                resolve(sequenceCount);
                clearInterval(interval);
            }
        },intervalTime);
    })
}

/*
    Returns a promise to keep playing
    or not to be awaited by the gameStart functon.
    Players entered sequence is kept track of.
    A timeOut called time is set to resolve the promise to false if a button
    is not clicked within five seconds
    When player clicks one of 4 input buttons,
    the time timeOut is cleared and set to a new one which resolves
    to false if a button is not clicked in five seconds.
    The players input is added to the end of the playersOutput list and
    checked against the sequence list element to see if player entered the sequence
    right.
    If not resolved to false and if correct and end of sequence list resolved to true
    to continue playing.
*/
function enterSequence(){
    
    return new Promise((resolve)=>{
        var playersOutput = [];
        var i = -1;
        let time = setTimeout(() => {
            resolve(false);
        }, 5000);
        
        red.addEventListener("click",function(){
            clearTimeout(time);
            time = setTimeout(() => {
                resolve(false);
            }, 5000);
            playersOutput.push(1);
            i++;
            if(playersOutput[i] != sequence[i]){
                resolve(false);
            }
            else if(i==sequence.length-1){
                resolve(true);
            }
        });
        blue.addEventListener("click",function(){
            clearTimeout(time);
            time = setTimeout(() => {
                resolve(false);
            }, 5000);
            playersOutput.push(3);
            i++;
            if(playersOutput[i] != sequence[i]){
                resolve(false);
            }
            else if(i==sequence.length-1){
                resolve(true);
            }
        });
        green.addEventListener("click",function(){
            clearTimeout(time);
            time = setTimeout(() => {
                resolve(false);
            }, 5000);
            playersOutput.push(0);
            i++;
            if(playersOutput[i] != sequence[i]){
                resolve(false);
            }
            else if(i==sequence.length-1){
                resolve(true);
            }
           
        });
        yellow.addEventListener("click",function(){
            clearTimeout(time);
            time = setTimeout(() => {
                resolve(false);
            }, 5000);
            playersOutput.push(2);
            i++;
            if(playersOutput[i] != sequence[i]){
                resolve(false);
            }
            else if(i==sequence.length-1){
                resolve(true);
            }
        });
    });
}

/*
    Returns promise to be awaited by gameStart function.
    flashes all buttons simultaneously, waits for buttons to stop flashing
    and flashes them again, 5 consequetive times, then resolves once finsished.
*/
function lossDisplayer(){
    return new Promise(async (resolve)=>{
        for(var k = 0; k<5; k++){
                await new Promise(async (resolve)=>{
                    $("#Green").fadeOut(500);
                    $("#Green").fadeIn(500);
                    $("#Red").fadeOut(500);
                    $("#Red").fadeIn(500);
                    $("#Yellow").fadeOut(500);
                    $("#Yellow").fadeIn(500);
                    $("#Blue").fadeOut(500);
                    $("#Blue").fadeIn(500);
                    setTimeout(()=>{resolve()},1000);
                });
            }
        resolve();
    });
}
/*
    Updates lastScore display.
*/
function updateLastScore(score){
    if(score<10){
        LastScore.innerHTML = "0"+score;
    }
    else{
        LastScore.innerHTML = score;
    }
}
/*
    Updates highScore display.
*/
function updateHighScore(score){
    highScore = score;
    if(score<10){
        HighScore.innerHTML = "0"+score;
    }
    else{
        HighScore.innerHTML = score;
    }
}
/*
    Returns the time between intervals
    depending on the number of signals in the
    sequence.
*/
function getIntervalTime(sequenceCount){
    if(sequenceCount == 5){
        return 1500;
    }
    else if(sequenceCount == 9){
        return 1000
    }
    else if(sequenceCount == 13){
        return 500
    }
    else{
        return 2000;
    }
}

/*
    Changes game indicator light to x.
*/
function changeGameStateLight(x){
    gameIndicator.style.backgroundColor = x;
}