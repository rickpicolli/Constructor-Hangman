var inquirer = require("inquirer");
var wordJS = require("./modules/Word.js");
var wordBank = require('./modules/random-word');


var guessesLeft = 11;
var wins = 0;
var losses = 0;
// var wordList = ["jurassic","scott", "smells", "laptops", "boilermaker", "northwestern","javascript","hacker"];
// var wordCounter = Math.floor(Math.random()*wordList.length);
// var currentLevel = new wordJS.Word(wordList[wordCounter]);

var wordCounter = wordBank();
var newWord = wordCounter.join("");
var currentLevel = new wordJS.Word(newWord);
//store guessed letters
var lettersGuessed = [];
var correctLetters = [];
// var firstGame = false;


console.log(`

  888                                                           
  888                                                           
  888                                                           
  88888b.  8888b. 88888b.  .d88b. 88888b.d88b.  8888b. 88888b.  
  888 "88b    "88b888 "88bd88P"88b888 "888 "88b    "88b888 "88b 
  888  888.d888888888  888888  888888  888  888.d888888888  888 
  888  888888  888888  888Y88b 888888  888  888888  888888  888 
  888  888"Y888888888  888 "Y88888888  888  888"Y888888888  888 
                               888                              
                          Y8b d88P                              
                           "Y88P"                               
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
    // if(guessesLeft === 11 && firstGame === false) {
    var guessesLeft = 11;
    var lettersGuessed = [];
        
        currentLevel.displayWord();
        // firstGame = true;
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
        if (lettersGuessed.includes(userGuess) && guessesLeft > 0) {
            console.log("\n");
            console.log("-----------------------");
            console.log("The letter '" + upperUserGuess + "' was already guessed, try another letter");
            console.log("-----------------------");
            console.log("\n");
            // playGame();
        } else {
            //push letter guessed into array 
            lettersGuessed.push(userGuess);
        //check user guess to each letter, set value to true if match
        if (currentLevel.checkUserGuess(userGuess) === true) {
            //push user guess into correctletter array
            currentLevel.secretWord.split("").forEach(function(element){
                if(userGuess === element) {
                    correctLetters.push(userGuess);
                }
                if (element === "") {
                    correctLetters.push(element);
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
            // console.log("\nletters guessed: " + lettersGuessed);
            console.log("\n#################################");
            console.log("\n");
            console.log(`Incorrect :(\n\nGuesses left: ${guessesLeft}
                `);
            // console.log("\n");
            console.log("\nletters guessed: " + lettersGuessed);
            console.log("\n");
            console.log("\n#################################");
            console.log("\n");
            gameScoreLogic();
            }
        } 
    })
}


// playGame()



// function gameScoreLogic() {
//     if (guessesLeft> 0 && correctLetters.length < currentLevel.secretWord.length) {
//         playGame()
//     }
//     if (guessesLeft> 0 && correctLetters.length === currentLevel.secretWord.length) {
//         //remove last word from word array
//         wordList.splice(wordCounter,1);
//         if (wordList.length === 0) {
//             console.log("Congrats! You beat the entire game. Have a drink. You deserve it!"); 
//             return
//         } else {
//         console.log("winner winner chicken dinner. Next word Generated. Good Luck");
//         // var wordCounter = wordBank();
//         // var currentLevel = new wordJS.Word(newWord);
//         // //reset turns
//         // guessesLeft = 11;
//         // // empty check array
//         // correctLetters = [];
//         // // empty letters Guessed
//         // lettersGuessed = [];
//         // //playGame
//         // currentLevel.displayWord();
//         // playGame();
//         }
//     }
//     if (guessesLeft === 0 && correctLetters.length !== currentLevel.secretWord.length) {
//         console.log("\n---------------------------------")
//         console.log("\n Out of Guesses. the correct word was " + newWord + "! You lose");
//         console.log("\n---------------------------------")

//     }
// }

function outOfGuesses(){
    var word = gameState.currentWord.newWord
    console.log("\n---------------------------------")
    console.log("\n Out of Guesses. the correct word was '" + newWord + "!' You lose");
    console.log("\n---------------------------------")
    console.log("\n");

    gameState.losses++;

    firstQ();
}

function correctWord(){
    if (currentLevel.length === 0) {
        wins++;
        console.log("\n---------------------------------");
        console.log("\n"newWord + "! was the word. You win!");
        console.log("\n---------------------------------");

        firstQ();
    }
}
