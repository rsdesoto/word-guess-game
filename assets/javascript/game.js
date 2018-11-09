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
var wins;
var gamesPlayed;
var guessesMade;
var guessedLetters;
var questionWord;
var tempchk;
var wordDisplay;

// var displayMe = document.getElementById("drink-options");

var displayMe = document.getElementById("wordguess");

//myFunc();

// create a function to clear out guesses for every round of the game
function clearGuesses() {
  guessesMade = 0;
  guessedLetters = "";
}

// create a function to clear out wins, games played, guesses to restart the game
function initializeGame() {
  wins = 0;
  gamesPlayed = 0;
  tempchk = "";
  wordDisplay = [];
  clearGuesses();
}

initializeGame();

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

setWord();
writeWord();

// create a variable that shows the answered and unanswered letters
function showWord() {
  tempchk = "";
  for (i = 0; i < wordDisplay.length; i++) {
    tempchk += wordDisplay[i];
  }
  displayMe.textContent = tempchk;
}

showWord();

//displayMe.textcontent = "hello";

// when a key is pressed, check to see if the letter is in the chosen word
document.onkeyup = function(event) {
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
      }

      // increment guesses made counter up and add the new letter to guessed letters
      guessesMade++;
      guessedLetters += ltr;

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
};

// rd - at this point most of the logic has been set for this game

// need to put if statements to bail out once you get to 10 guesses or you guess
// all the letters
