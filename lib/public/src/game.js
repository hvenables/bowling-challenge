function Game() {
  this.gameArray = [];
  this.totalScore = 0;
  this.testTotalScore = 0;
  this.lastFrameTracker = 0;
};

Game.prototype.scoreCalculator = function() {
  this.totalScore = 0;
  for (var x = 0, y = this.gameArray.length; x < y; x++) {
    for (var i = 0, n = this.gameArray[x].length; i < n; i++)
    {
      this.totalScore += this.gameArray[x][i];
    }
  }
};

Game.prototype.selectedScoreCalculator = function(given) {
  this.totalScore = 0;
  var input = given || this.gameArray.length;
  for (var x = 0, y = input; x < y; x++) {
    for (var i = 0, n = this.gameArray[x].length; i < n; i++)
    {
      this.testTotalScore += this.gameArray[x][i];
    }
  }
  return this.testTotalScore;
};

Game.prototype.isStrike = function() {
  if (this.previousFrame()[0] === 10) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.isSpare = function() {
  if (this.previousFrame()[0] + this.previousFrame()[1] === 10) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.previousFrame = function() {
  return this.gameArray[this.gameArray.length - 1];
};

Game.prototype.frameTotal = function(frameNumber) {
  this.lastFrameTracker = 0;
  var number = frameNumber - 1;
  for (var i = 0, n = this.gameArray[number].length; i < n; i++)
  {
    this.lastFrameTracker += this.gameArray[number][i];
  }
  return this.lastFrameTracker;
};

Game.prototype.twoFramesAgo = function() {
  return this.gameArray[this.gameArray.length - 2];
};
