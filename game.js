

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if(!started){
        //检测游戏开始后，更改h1内容为当前等级
        $("#level-title").text("Level   " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // console.log(userClickedPattern);

    //记录用户点击的序列
    checkAnswer(userClickedPattern.length-1);
 });



function checkAnswer(currentLevel){

    //如果电脑序列和用户的相等
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    } else{
        console.log("wrong");
        //播放失误音效
        playSound("wrong");

        //在body添加游戏结束背景
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        //更改标题游戏重新开始
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

function nextSequence(){

    userClickedPattern = [];

    //每调用该函数一次就增加1等级
    level++;

    $("#level-title").text("level   " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  
  

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    },100);
}

//初始化游戏值
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

