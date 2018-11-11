//

// initialize variables

var wordList = [
  "intarsia",
  "moss stitch",
  "cabling",
  "stockinette",
  "knit",
  "purl",
  "yarn over",
  "worsted weight",
  "mohair",
  "frogging",
  "cast on",
  "bind off",
  "fair isle",
  "toe up",
  "toe down"
];
var validKeys = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

/////////////// stats for the full game /////////////
// get the total number of guesses you get
var guessesAllowed = 10;
// number of wins
var wins;
// number of games played
var gamesPlayed;
// number of games lost
var gamesLost;

////////////// stats for a single round ////////////
// number of guesses made this round
var guessesMade;
// what letters have been guessed
var guessedLetters;
// what word has been chosen
var questionWord;

// array - for decoding what has and hasn't been chosen
var wordDisplay;
// string - for printing the array of solved and unsolved letters to the screen
var wordDisplayString;

// array - for the needles on the left showing guesses remaining
var remainArray;
// array - for the dropped stitches showing guesses made
var guessedArray;

///////////////// IDs manipulated during the game /////////////////////
// where the blanks are displayed for the game
var displayMe = document.getElementById("wordguess");
// which letters have been guessed
var displayGuessed = document.getElementById("guessedletters");
// where wins are counted
var winDisplay = document.getElementById("windisplay");
// where the number of games played are counted
var gameDisplay = document.getElementById("gamedisplay");
// where losses are counted
var lossDisplay = document.getElementById("lossdisplay");
// text that displays upon the end of the game
var roundEndText = document.getElementById("roundendtext");
// text that appears at the end of the game to continue the game
var continueText = document.getElementById("continue");

// text that appears at the end of the game to continue the game
var leftNeedle = document.getElementById("left-stitch");

// text that appears at the end of the game to continue the game
var dropStitches = document.getElementById("dropped-stitches");

// make an object of commands used in the game
var gameCommands = {
  // set a word
  setWord: function() {
    questionWord = wordList[Math.floor(Math.random() * (5 - 0 + 1) + 0)];
    console.log(questionWord);
  },
  // create an array of guesses for the chosen game word
  writeWord: function() {
    for (i = 0; i < questionWord.length; i++) {
      if (questionWord[i] != " ") {
        wordDisplay.push("_ ");
      } else {
        wordDisplay.push("\u00A0");
      }
    }
    console.log(wordDisplay);
  },
  // display the contents of the array of guesses for the chosen game word
  showWord: function() {
    wordDisplayString = "";
    for (i = 0; i < wordDisplay.length; i++) {
      wordDisplayString += wordDisplay[i];
    }
    displayMe.textContent = wordDisplayString;
  },
  // update guess arrays
  updateGuess: function() {
    remainArray.pop();
    guessedArray.push("0");
  },

  // function to display all the letters that have been guessed so far
  showGuessed: function() {
    displayGuessed.textContent = guessedLetters;
  },
  // initialize the array of "stitches" on the left needle
  guessInitialize: function() {
    remainArray = [];
    guessedArray = [];

    for (i = 0; i < guessesAllowed; i++) {
      remainArray.push("C ");
    }
  },
  // display needles and "stitches" that are remaining and/or have been dropped
  needleDisplay: function() {
    var leftContent = "";
    var dropContent = "";
    for (i = 0; i < remainArray.length; i++) {
      leftContent += remainArray[i];
    }
    for (i = 0; i < guessedArray.length; i++) {
      dropContent += guessedArray[i];
    }

    leftNeedle.textContent = leftContent;
    dropStitches.textContent = dropContent;
  },

  // clear guesses upon restarting the game
  clearGuesses: function() {
    guessesMade = 1;
    guessedLetters = "";
    wordDisplay = [];
    wordDisplayString = "";
    roundEndText.style.display = "none";
    continueText.style.display = "none";
    gameCommands.guessInitialize();
    gameCommands.needleDisplay();
  },
  // create a function to clear out wins, games played, guesses to initialize/restart the game
  initializeGame: function() {
    wins = 0;
    gamesPlayed = 0;
    gamesLost = 0;

    gameCommands.clearGuesses();
  },
  // create a function to write wins, losses, and games played
  writeStats: function() {
    winDisplay.textContent = wins;
    lossDisplay.textContent = gamesLost;
    gameDisplay.textContent = gamesPlayed;
  }
};

// get the various endings of the game
var gameEndings = {
  winContent: function() {
    continueText.style.display = "block";
    roundEndText.style.display = "block";
    roundEndText.textContent = "You won! The answer was " + questionWord;
  },
  loseContent: function() {
    continueText.style.display = "block";
    roundEndText.style.display = "block";
    roundEndText.textContent = "You lost :c the answer was " + questionWord;
  }
};

// whenever you click the continue text, it should reset the game
continueText.onclick = function() {
  gameCommands.clearGuesses();
  gameCommands.setWord();
  gameCommands.writeWord();
  gameCommands.showWord();
  gameCommands.showGuessed();
  gameCommands.writeStats();
};

gameCommands.initializeGame();
gameCommands.writeStats();
gameCommands.guessInitialize();
gameCommands.needleDisplay();

gameCommands.setWord();
gameCommands.writeWord();
gameCommands.showWord();
gameCommands.showGuessed();

// when a key is pressed, check to see if the letter is in the chosen word
document.onkeyup = function(event) {
  // only keep going until we reach the total guesses allowed
  if (guessesMade < guessesAllowed && wordDisplayString.indexOf("_") > -1) {
    console.log("Button: " + event.key);
    // 0th level: make sure this is an ACTUAL LETTER, since guessing "meta" will mess everything up
    ltr = event.key.toLowerCase();
    if (validKeys.indexOf(ltr) > -1) {
      // first, check to make sure this letter hasn't been guessed already; check if letter is in word
      if (guessedLetters.indexOf(ltr) === -1) {
        if (questionWord.indexOf(ltr) > -1) {
          // if guess is in word, add to the puzzle array
          for (i = 0; i < wordDisplay.length; i++) {
            if (questionWord[i] === ltr) {
              wordDisplay[i] = ltr;
            }
          }
          gameCommands.showWord();
        } else {
          // if the letter is NOT in the guessing word, increment up the guessesMade number and update the needle graphics
          guessesMade++;
          gameCommands.updateGuess();
          gameCommands.needleDisplay();
        }

        // add the new letter to guessed letters and update the showGuessed text section
        guessedLetters += ltr;
        gameCommands.showGuessed();
      }
    }
    // Win condition: if the "_" character is no longer in the displayed string
    if (wordDisplayString.indexOf("_") === -1) {
      // Tick the games played and wins up
      gamesPlayed++;
      wins++;
      gameCommands.writeStats();
      // display the win screen
      gameEndings.winContent();
    }
  }
  // if this is the FINAL allowed guess -- slightly different rules
  // if you guess wrong, this should immediately lose the game.
  // if you guess right, allow the user to keep guessing
  else if (guessesMade === guessesAllowed) {
    ltr = event.key.toLowerCase();
    if (validKeys.indexOf(ltr) > -1) {
      // first, check to make sure this letter hasn't been guessed already
      if (guessedLetters.indexOf(ltr) === -1) {
        if (questionWord.indexOf(ltr) > -1) {
          // if guess is in word, add to the puzzle array
          for (i = 0; i < wordDisplay.length; i++) {
            if (questionWord[i] === ltr) {
              wordDisplay[i] = ltr;
            }
          }
          gameCommands.showWord();
          // add the new letter to guessed letters and update the showGuessed text section
          guessedLetters += ltr;

          gameCommands.showGuessed();
          // check for the win condition
          if (wordDisplayString.indexOf("_") === -1) {
            // Tick the games played and wins up
            gamesPlayed++;
            wins++;
            gameCommands.writeStats();
            // display the win screen
            gameEndings.winContent();
          }
        } // if this letter is NOT in the question word, immediately lose the round
        else {
          guessesMade++;
          guessedLetters += ltr;
          // update the needles graphic
          gameCommands.updateGuess();
          gameCommands.needleDisplay();

          gameCommands.showGuessed();
          // tick the games played and losses up
          gamesPlayed++;
          gamesLost++;
          gameCommands.writeStats();
          // display the lose screen
          gameEndings.loseContent();
        }
      }
    }
  }
};
