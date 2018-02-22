const inquirer = require("inquirer");
const wordJS = require("./modules/Word.js");


var guessesLeft = 10;
var wins = 0;
var losses = 0;
var userChoices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var wordList  = ["wolverine", "batman", "black panther", "superman", "iron man", "aquaman", "wonder woman", "hawkeye", "spider-Man", "daredevil", "green arrow", "black canary", "captain america", "batgirl", "hellboy", "hulk", "iron fist", "catwoman", "elektra", "ghost rider", "thor", "robin", "silver surfer", "the human torch", "black widow", "professor xavier", "beast", "black lightning", "captain marvel", "doctor strange", "the vision", "ant-man", "supergirl", "captain planet"];
var wordCounter = Math.floor(Math.random()*wordList.length);
var currentLevel = new wordJS.Word(wordList[wordCounter]);
//store guessed letters
var lettersGuessed = [];
var correctLetters = [];
var firstGame = false;


console.log(`

  888                                                                       **************************
  888                                                                     .*##*:*####***:::**###*:######*.
  888                                                                     *##: .###*            *######:,##* 
  88888b.  8888b. 88888b.  .d88b. 88888b.d88b.  8888b. 88888b.          *##:  :####:             *####*.  :##:
  888 "88b    "88b888 "88bd88P"88b888 "888 "88b    "88b888 "88b     |    *##,:########**********:,       :##:
  888  888.d888888888  888888  888888  888  888.d888888888  888   ==|==   .#########################*,  *#*
  888  888888  888888  888Y88b 888888  888  888888  888888  888     |      *#########################*##:
  888  888"Y888888888  888 "Y88888888  888  888"Y888888888  888             *##,        ..,,::**#####:
                               888                                           ,##*,*****,        *##*
                          Y8b d88P                                             *#########*########:
                           "Y88P"                                                *##*:*******###*
                                                                                   .##*.    ,##*
                                                                                       *####:
        
\n`);

 function firstQ() {
        var lettersGuessed = [];
        var guessesLeft = 11;

            inquirer.prompt([
            {
                type: "list",
                name: "newWord",
                message: "Would you like to play hangman?",
                choices: ["Yes", "No"]
            }
        ]).then(function(answer) {

            if (answer.newWord === "Yes") {
                console.log("\n");
                console.log("Wins: " + wins);
                console.log("Losses: " + losses);                      
                console.log("\n");
                playGame();
            } else {
                console.log("Thank you for coming. See you next time!");
            }

        })
    } 

firstQ();


function playGame() {
    //show display for firt time 
    if(guessesLeft === 10 && firstGame === false) {
        // console.log("LETS PLAY NODE HANGMAN!");
        currentLevel.displayWord();
        firstGame = true;
    }
    inquirer.prompt(
        {
            type: "input",
            name: "userGuess",
            message: "Guess a Letter: "
        }
    ).then(function(answer) {
        //stpre users guess
    var userGuess = answer.userGuess.toLowerCase();
    var upperUserGuess = answer.userGuess.toUpperCase();
    var indexCheckArray = wordJS.checkArray;
    //check to see if the letter has been guessed if not store if it has send message and replay turn
    if (userChoices.includes(userGuess)) {
        if (lettersGuessed.includes(userGuess)) {
            console.log("\n");
            console.log("-----------------------");
            console.log("The letter '" + upperUserGuess + "' was already guessed, try another letter");
            console.log("-----------------------");
            console.log("\n");
            playGame();
        } else {
            //push letter guessed into array 
            lettersGuessed.push(userGuess);
        //check user guess to each letter, set value to true if match
        if (currentLevel.checkUserGuess(userGuess) === true) {
            //push user guess into correctletter array
            currentLevel.secretWord.split("").forEach(function(letter){
                if(userGuess === letter) {
                    correctLetters.push(userGuess);
                }
                if (letter === "") {
                    correctLetters.push(letter);
                }
            })
            //correct
            console.log("\n#################################");
            console.log("\n");
            console.log(`correct!\n\nGuesses left: ${guessesLeft}`);
                // console.log("\n");
            console.log("\nletters guessed: " + lettersGuessed);
            console.log("\n");
            console.log("\n#################################");
            console.log("\n");
            gameScoreLogic();
        } else {
            guessesLeft--
            console.log("\n#################################");
            console.log("\n");
            console.log(`Incorrect :(\n\nGuesses left: ${guessesLeft}
                    `);
            console.log("\nletters guessed: " + lettersGuessed);
            console.log("\n");
            console.log("\n#################################");
            console.log("\n");
            gameScoreLogic();
            }
        } 
    } else {
        console.log("--------------------------------------");
        console.log("\n");
        console.log("This is not a letter! Please try again");
        console.log("\n");
        console.log("--------------------------------------");
        playGame();

    }
    })
}


// playGame()



function gameScoreLogic() {
    if (guessesLeft> 0 && correctLetters.length < currentLevel.secretWord.length) {
        playGame()
    }
    if (guessesLeft> 0 && correctLetters.length === currentLevel.secretWord.length) {
        //remove last word from word array
        wordList.splice(wordCounter,1);
        if (wordList.length === 0) {
            console.log(" end of game");
        } else {
        console.log("\n---------------------------------");
        console.log("\n", currentWord.toUpperCase(), "was the word. You win!");
        console.log("\n---------------------------------")
        console.log("\n");
  
        newGame();
        }
    }
    if (guessesLeft === 0 && correctLetters.length !== currentLevel.secretWord.length) {
        losses--
        console.log("\n---------------------------------")
        console.log("\n Out of Guesses. You lose!");
        console.log("\n---------------------------------")
        console.log("\n");
        newGame();

    }
}

function newGame(){

       inquirer.prompt([
            {
                type: "list",
                name: "restart",
                message: "Would you like to play again?",
                choices: ["Yes", "No"]
            }
        ]).then(function(userResponse){
            if (userResponse.restart === "Yes") {
            // if true
            wordCounter = Math.floor(Math.random()*wordList.length);
            //generate new word
            currentLevel = new wordJS.Word(wordList[wordCounter]);
            //reset turns
            guessesLeft = 10;
            // empty check array
            correctLetters = [];
            // empty letters Guessed
            lettersGuessed = [];
            //playGame
            currentLevel.displayWord();
            playGame();
          } else {
            console.log("thanks for playing!");
          }
            
        })

    } 
       
