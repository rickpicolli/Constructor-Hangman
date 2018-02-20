var letterOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var guessesSoFar = [];
var guessesLeft = 9;
var wins = 0;
var losses = 0;

	var Letter = function(underline, boolean) {
		this.underline = underline; //need to find a way to show the "_ _ _ _"
		this.boolean = boolean;
		this.correctLetter = function() {
			if (correctLetter === letterOptions) {
				//take off a "_" and then show the letter at that place

			}
			else {
				//push the letter to guessesSoFar and decrease 1 from guessesSoFar
			}
			
