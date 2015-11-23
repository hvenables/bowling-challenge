var frame = new Frame();
var game = new Game();
var currentThrow = 1;
var remainder = 10;
var update = 0;
var thisNeeded;
var maxScore;

var currentScore = function() {
  $('#total_score').text(game.totalScore);
};

var latestBowl = function() {
  if (game.gameArray.length === 10) {
    calcLastBowl();
    console.log('Last Frame')
  } else {
    calcLatestBowl();
    console.log('First Frame')
  }
};

var calcLastBowl = function() {
  if (frame.lastBowl === 10) {
    $('#bowl' + (currentThrow)).text('X')
    currentThrow += 1
  } else if (((currentThrow) % 2 === 0) && game.isSpare()) {
    $('#bowl' + (currentThrow)).text('/')
    currentThrow += 1
  } else {
    $('#bowl' + (currentThrow)).text(frame.lastBowel);
    currentThrow += 1
  }
};

var calcLatestBowl = function() {
  if (frame.lastBowl === 10) {
    $('#bowl' + (currentThrow)).text('X');
    currentThrow += 1;
    $('#bowl' + (currentThrow)).hide();
    //if (game.gameArray.length >= 10) $('#bowl' + (currentThrow - 4)).text('X');
    currentThrow += 1;
  } else if (((currentThrow) % 2 === 0) && game.isSpare()) {
    $('#bowl' + (currentThrow)).text('/');
    currentThrow += 1;
  } else {
    $('#bowl' + (currentThrow)).text((frame.lastBowl));
    currentThrow += 1;
    if (game.gameArray.length >= 10) $('#bowl' + (currentThrow)).hide();
  }
};

var addFrame = function() {
  $('#frame' + (game.gameArray.length)).text(game.totalScore);
};

var framesToUpdate = function() {
  return (game.gameArray.length - update);
};

var addPreviousFrame = function() {
  for (var i = (framesToUpdate()), n = (game.gameArray.length); i < n; i++) {
    {
      $('#frame' + (i)).text(game.selectedScoreCalculator(i));
      game.testTotalScore = 0;
    };
  };
};

var selectedAddPreviousFrame = function(thisNeeded) {
  $('#frame' + (thisNeeded)).text(game.selectedScoreCalculator(thisNeeded));
  game.testTotalScore = 0;
};

var hideButtons = function() {
  for (var i = 10, n = (remainder - frame.lastBowl); i > n; i--)
  {
    $('#button' + (i)).hide();
  };
};

var showButtons = function() {
  $('.button').show();
};

var potentialScore = function() {
  for (var i = 0, n = (10 - game.gameArray.length); i <= n; i++)
  {
    maxScore = (i * 30);
  };
  $('#potential_score').text(maxScore + game.totalScore);
};

var scorecardUpdate = function() {
  if ((game.isStrike() || game.isSpare()) && update == 2) {
    showButtons();
    thisNeeded = (game.gameArray.length - 2);
    selectedAddPreviousFrame(thisNeeded);
  } else if (game.isStrike()) {
    showButtons();
    update += 1;
  } else if (game.isSpare()) {
    showButtons();
    update += 1;
  } else {
    currentScore();
    addFrame();
    showButtons();
    addPreviousFrame();
    update = 0;
  };
};

$(document).ready(function() {

  $('.button').click(function() {
    var theScore = parseInt($.trim($(this).text()));
    frame.bowl(theScore);
    latestBowl();
    hideButtons();
    if (currentThrow > 23) {
      currentScore();
      addFrame();
      showButtons();
      addPreviousFrame();
      update = 0;
    };
    if (game.gameArray.length === 10) scorecardUpdate();
    if ((currentThrow - 1) % 2 === 0) scorecardUpdate();
  });
});
