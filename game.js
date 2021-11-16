// $("h1").on({
//   mouseover: function() {
//     $("h1").text("Hi Cameron. Press A Key to Start")
//   },
//   mouseleave: function() {
//     $("h1").text("Hi Cameron. Press A Key to Start")
//   }
// });



var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var currentLevel = [];

var started = false;

var level = 0;

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }), 1000;
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart ");
    startOver(); // call start over

    }
};

$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function() {
  if(!started) {
      $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// for mobile
$(document).doubletap(function() {
  if(!started) {
      $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
// -----------

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
};

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

};

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

// 1. create new function named start Over
function startOver() {
  level = 0; // 3.  reset values
  gamePattern = []; // 3.  reset values
  started = false; // 3.  reset values
};
