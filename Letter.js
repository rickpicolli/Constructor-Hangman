var letterOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var guessesSoFar = [];
var guessesLeft = 9;
var wins = 0;
var losses = 0;

	var LetterstoDisplay = function(letter) {
		this.character = function(){ 
		if (letter !== " ") {
			letter === "_"
		}
		else {
			letter === " ";
		}
		this.letter = letter;
		this.currentVal = this.character;
		this.boolean = false;
	}
}

module.exports = HangmanLetter;
		
			
//randombank
//npm random word

//need to check if a letter is not a " ", then "_", else " ".

//I need to create a blank array to be the letter and another array to be to use .filter to get same letters to check in.

