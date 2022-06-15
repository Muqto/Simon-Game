var buttonColors = ["red","blue","green","yellow"]
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $("h1").text(`Level ${level}`)
    level++;

    
}


$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour)
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
    })







 function playSound(name){
    var colorAudio = new Audio("sounds/" + name + ".mp3");
    colorAudio.play();
 
    }






function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed")
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed")    
    }, 100)
}

$(document).keydown(() => {
    if( level == 0){
        nextSequence();
    }

})

function checkAnswer(){
    // RIGHT PATTERN 
    if (JSON.stringify(gamePattern.slice(0,userClickedPattern.length)) === JSON.stringify(userClickedPattern)){
        if (gamePattern.length == userClickedPattern.length){
            userClickedPattern = [];
            setTimeout(() =>{
                nextSequence()
            }, 1000)
        }
    }
    //WRONG and restart game
    else{
        $("body").addClass("game-over");
        playSound("wrong")
        $("h1").text("Game Over, Press Any Key to Restart")
        level = 0;
        gamePattern = []
        userClickedPattern = []
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200)
    }
}
