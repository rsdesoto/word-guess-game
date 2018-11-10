//

// initialize variables

var wordList = ["cat", "dog", "wordone", "wordtwo", "wordthree", "wordfour"];
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

// whenever you click the continue text, it should reset the game
continueText.onclick = function() {
  clearGuesses();
  setWord();
  writeWord();
  showWord();
  showGuessed();
  writeStats();
};

function winContent() {
  continueText.style.display = "block";
  roundEndText.style.display = "block";
  roundEndText.textContent = "You won! The answer was " + questionWord;
}

function loseContent() {
  continueText.style.display = "block";
  roundEndText.style.display = "block";
  roundEndText.textContent = "You lost :c the answer was " + questionWord;
}

// create a function to clear out guesses for every round of the game
function clearGuesses() {
  guessesMade = 1;
  guessedLetters = "";
  wordDisplay = [];
  wordDisplayString = "";
  roundEndText.style.display = "none";
  continueText.style.display = "none";
  guessInitialize();
  needleDisplay();
}

// create a function to clear out wins, games played, guesses to initialize/restart the game
function initializeGame() {
  wins = 0;
  gamesPlayed = 0;
  gamesLost = 0;

  clearGuesses();
}

// create a function to write wins, losses, and games played
function writeStats() {
  winDisplay.textContent = wins;
  lossDisplay.textContent = gamesLost;
  gameDisplay.textContent = gamesPlayed;
}

// randomly choose a word from the word list
function setWord() {
  questionWord = wordList[Math.floor(Math.random() * (5 - 0 + 1) + 0)];
  console.log(questionWord);
}

// create an array of what has and hasn't been answered. Unanswered is _, answered is letter
function writeWord() {
  for (i = 0; i < questionWord.length; i++) {
    wordDisplay.push("_ ");
  }
  console.log(wordDisplay);
}

// create a variable that sets the contents of the writeWord guess array to a single variable for display
function showWord() {
  wordDisplayString = "";
  for (i = 0; i < wordDisplay.length; i++) {
    wordDisplayString += wordDisplay[i];
  }
  displayMe.textContent = wordDisplayString;
}

// create arrays of guesses remaining and guesses made
function guessInitialize() {
  remainArray = [];
  guessedArray = [];

  for (i = 0; i < guessesAllowed; i++) {
    remainArray.push("C ");
  }
}

// display guesses remaining and guesses made
function needleDisplay() {
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
}

// update guess arrays
function updateGuess() {
  remainArray.pop();
  guessedArray.push("O ");
}

// function to display all the letters that have been guessed so far
function showGuessed() {
  displayGuessed.textContent = guessedLetters;
}

initializeGame();
writeStats();
guessInitialize();
needleDisplay();

setWord();
writeWord();
showWord();
showGuessed();

// when a key is pressed, check to see if the letter is in the chosen word
document.onkeyup = function(event) {
  // only keep going until we reach the total guesses allowed
  if (guessesMade < guessesAllowed && wordDisplayString.indexOf("_") > -1) {
    console.log("Button: " + event.key);
    // 0th level: make sure this is an ACTUAL LETTER, since guessing "meta" will mess everything up
    ltr = event.key.toLowerCase();
    if (validKeys.indexOf(ltr) > -1) {
      // first, check to make sure this letter hasn't been guessed already
      if (guessedLetters.indexOf(ltr) === -1) {
        // check to see if this letter is in the word (questionWord) and if yes, add it to the wordDisplay array
        if (questionWord.indexOf(ltr) > -1) {
          for (i = 0; i < wordDisplay.length; i++) {
            if (questionWord[i] === ltr) {
              wordDisplay[i] = ltr;
            }
          }
          showWord();
        } else {
          // if the letter is NOT in the guessing word, increment up the guessesMade number
          guessesMade++;
          // update the needles graphic
          updateGuess();
          needleDisplay();
        }

        // add the new letter to guessed letters and update the showGuessed text section
        guessedLetters += ltr;

        showGuessed();

        // temp test - print all this to console.log so we can check
        console.log(
          "wins: " +
            wins +
            " games played " +
            gamesPlayed +
            " guesses made " +
            guessesMade +
            " letters guessed " +
            guessedLetters
        );
      }
    }
    // get win condition
    if (wordDisplayString.indexOf("_") === -1) {
      // Tick the games played and wins up
      gamesPlayed++;
      wins++;
      writeStats();
      // display the win screen
      winContent();
    }
  }
  // if this is the FINAL allowed guess -- slightly different rules
  else if (guessesMade === guessesAllowed) {
    ltr = event.key.toLowerCase();
    if (validKeys.indexOf(ltr) > -1) {
      // first, check to make sure this letter hasn't been guessed already
      if (guessedLetters.indexOf(ltr) === -1) {
        // check to see if this letter is in the word (questionWord) and if yes, add it to the wordDisplay array
        if (questionWord.indexOf(ltr) > -1) {
          for (i = 0; i < wordDisplay.length; i++) {
            if (questionWord[i] === ltr) {
              wordDisplay[i] = ltr;
            }
          }
          showWord();
          // add the new letter to guessed letters and update the showGuessed text section
          guessedLetters += ltr;

          showGuessed();
          // check for the win condition
          if (wordDisplayString.indexOf("_") === -1) {
            // Tick the games played and wins up
            gamesPlayed++;
            wins++;
            writeStats();
            // display the win screen
            winContent();
          }
        } // if this letter is NOT in the question word, immediately lose the round
        else {
          // if the letter is NOT in the guessing word, increment up the guessesMade number
          guessesMade++;
          // add the new letter to guessed letters and update the showGuessed text section
          guessedLetters += ltr;
          // update the needles graphic
          updateGuess();
          needleDisplay();

          showGuessed();
          // tick the games played and losses up
          gamesPlayed++;
          gamesLost++;
          writeStats();
          // display the lose screen
          loseContent();
        }
      }
    }
  }
};
