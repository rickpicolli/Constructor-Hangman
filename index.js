var inquirer = require('inquirer');
var GameWord = require('./word');

	var guessesSoFar = [];
	var guessesLeft = 11;
	var wins = 0;
	var losses = 0;
	var round = 0;
	var currentWord = undefined;

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

	function startGame() {
		var guessesSoFar = [];
		var guessesLeft = 11;

		if(round < 21) {
			inquirer.prompt([
			{
				type: "list",
				name: "newWord",
				message: "Would you like to play hangman?",
				choices: ["Yes", "No"]
			}
		]).then(function(answer) {

			if (answer.newWord === "Yes") {
				newRound();
			} else {
				gameReset();
			}

		});
	} else {
		console.log("Thank you for playing! See you next time!");
		gameReset();
	}
}

startGame();

function newRound() {
	round++;
	console.log("\n");
	console.log("========================");
	console.log("Wins: " + wins);
	console.log("Losses: " + losses);
	console.log("Round: " + round);
	console.log("========================");
	console.log("\n");
	var words = wordBank();
	var newWord = words.join("");
	currentWord = new WordStr(newWord);
	console.log("\n");

	guessLetter();
}

function guessLetter() {

	console.log("========================");
	console.log("\nguesses: " + guessesLeft);
	console.log("\n");

	if(guessesSoFar.length > 0){
		console.log("\nletters guessed: " + guessesSoFar);
		console.log("\n");
	}
	currentWord.displayedChar();
	console.log("\n=========================");
	console.log("\n");

	if (guessesLeft > 0) {

		inquirer.prompt([
		{
			type: "list",
			message: "select a letter: ",
			name: "letterChoice",
			choices: alphabet.lower
		}
	]).then(function(userGuess) {
		if(!guessesSoFar.includes(userGuess.letterChoice) && guessesLeft > 0) {
			guessesSoFar.push(userGuess.letterChoice);
			guessesLeft--;
		}
	})
	}
}