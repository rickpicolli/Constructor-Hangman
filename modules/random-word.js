var randomWords = require('random-words');
var wordBank = function(){
	var generateWords = randomWords({ exactly: 1 });
	return generateWords;
}

module.exports = wordBank;