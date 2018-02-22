function Letter (char)  {
    this.char = char,
    this.letterGuessed = false,
    this.show = function() {
        if (this.letterGuessed) {
            //display letter
            return this.char
        } else {
            //display placeholder
            return "_"
        }
    },
    this.check = function (userGuess) {
        if ( userGuess === this.char) {
            this.letterGuessed = true;
            return true
        } else{
            return false 
        }
    } 
}

module.exports = Letter;
