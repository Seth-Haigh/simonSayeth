
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
    $("#level-title").text("Game Over - Press Key/Tap to Restart ");
    startOver();

    }
};

$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

// $("h1").click(function() {
//   if(!started) {
//       $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });

// // for mobile
// $(document).on('keydown touchstart', function () {
//   if(!started) {
//       $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });
// // -----------

// for mobile
$(document).on('keydown touchstart', function () {
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
  playSound(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(500).fadeIn(50).fadeOut(50).fadeIn(50);
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
