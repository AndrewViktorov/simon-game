var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = []
var isGameStarted = false;
var level = 0;

$(document).keypress(function () {
    if (!isGameStarted) {
        nextSequence();
    }
    isGameStarted = true;
})


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
    new Audio("sounds/" + name + ".mp3").play();
}



function nextSequence() {

    userClickedPattern = [];
    level++;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(50).fadeIn(50);
    playSound(randomChosenColour);
    $("h1").html("Level " + level);
}


function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function animateWrongAnswer() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

function checkAnswer(currentLevel) {


    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("IIIHAAAAAAAA");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else { 
        console.log("LOSHARA"); 
        playSound("wrong");
        animateWrongAnswer();
        $("h1").html("Game Over, Press Any Key to Restart");
        restartTheGame();
    }
}

function restartTheGame() {
    level = 0;
    gamePattern = [];
    isGameStarted = false;
}











