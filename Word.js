var GameLetter = require("./letter")

function WordStr() {

var Word = function(word) {
	this.newWord = word;
	this.wordArr = this.newWord.split("");
	this.wordLetter = word.split("").filter(function(letter) {
		return word.split("").indexOf(letter) == pos;
	});
	this.letters = [];
	this.createLetters();
}

var createLetters = function() {
	var letters = this.letters;
	this.wordArr.forEach(function(letter) {
		var newLetter = new LetterstoDisplay(letter);
		letters.push(newLetter);
	})
}

var displayedChar = function() {
	var displayedStr = "";
	this.letters.forEach(function(letters) {
		displayedStr += letters.currentVal + " ";
	})
	console.log("The word is: ", displayedStr);
}

var guessedLetter = function(currentLetter, callback1, callback2) {
	var wordLetters = this.wordLetters;

	//cheking if the guessed letter is in the current word
	if(wordLetters.includes(currentLetter)) {
		console.log("Great Guess! This is correct!");
		this.letters.forEach(function(letters) {
			if(!letters.isLetter && letters.letter === currentLetter) {
				letters.isLetter = true;
				letters.currentVal = currentLetter;
			} 

		})

		//
		var game = wordLetters.indexOf(currentLetter);
		wordLetters.splice(game, 1);
		var currentWord = this.newWord
		if(wordLetters.length != 0) {
			callback1();
		} else if (wordLetters.length === 0) {
			wins++;
			console.log("\n---------------------------------");
			console.log("Correct!!!");
			console.log("\n", currentWord.toUpperCase(), "was the word. You got it right!");
		  	console.log("\n---------------------------------")
		  	console.log("\n");
		  	callback2();
		} else {
			losses++;
			console.log("\n---------------------------------");
			console.log("Oh No!!")
		  	console.log("\n You didn't get it right");
		  	console.log("\n the correct answer was: ", currentWord.toUpperCase());
		  	console.log("\n---------------------------------")
		  	console.log("\n");
		  	callback2();

		}

	} else {
			console.log(" the word does not include:", currentLetter);
			callback1();

		}

	}
}
module.exports = WordStr;