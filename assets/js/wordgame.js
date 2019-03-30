// Javascript code for word game 
// John Webster

// variable declarations

// constants
var allWords = [ "bootstrap", "tag", "javascript", "computer", "Fullstack", "html", "server"];

var gamesPlayed = 0;
var gamesWon = 0;
var gamesLost = 0;
var maxTries = 12; // maximum number of tries allowed
var winSound;
var loseSound;

// variables that change during game
var wordIndex = 0;
var lettersTried = ""; // list of letters tried so far
var gameStringArr = []; // successful letters so far
var triesCount = 0;  // number of tries
var wordArr = []; 
var gameRunning = false; // indicates if user is running game

// get ready for next game - zero out global variables
function clearVariables() {
    var tmpWord = "";

    wordIndex = Math.floor(Math.random() * allWords.length);
    lettersTried = ""; // list of letters tried so far
    gameStringArr = []; // successful letters so far
    // set up string with letters guessed so far
    for ( var i=0; i< allWords[wordIndex].length; i++) {
        gameStringArr[i] = "-";
    }
    triesCount = 0;  // number of tries
    wordArr = allWords[wordIndex].toLowerCase().split(""); 
    console.log( "wordIndex " + wordIndex + " word " + allWords[wordIndex]);
}

clearVariables(); // need to initialize random word and gameStringArr

// update display 
function updateDisplay () {
    var gameString = "";

    document.getElementById("gamesPlayed").textContent = + String(gamesPlayed);
    document.getElementById("gamesWon").textContent =  String(gamesWon);
    document.getElementById("gamesLost").textContent = String(gamesLost);
    for ( var i= 0; i< gameStringArr.length; i++) {
        gameString += gameStringArr[i];
    }
    document.getElementById("gameString").textContent =  gameStringArr.join("");
    document.getElementById("lettersTried").textContent =  String(lettersTried);
    document.getElementById("triesCount").textContent =  String(triesCount) + " max " + String(maxTries);
}


updateDisplay();

//  update status bar
function writeStatus( s ) {
    document.getElementById("StatusInfo").textContent = s;
}

// sound function taken from w3 schools
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

  winSound = new sound("assets/sounds/service-bell_daniel_simion.mp3"); // sound from SoundBible.com
  loseSound = new sound("assets/sounds/Uuuuuu-Paula-1357936016.mp3"); // sound from SoundBible.com

// main loop - use key presses to create loop
document.onkeyup = function(event) {
    // Determines which key was pressed.
    var userGuess = event.key;
    userGuess = userGuess.toLowerCase();
    if ( !gameRunning) {
        gameRunning = true;
        writeStatus("Start typing letters to complete word");
        clearVariables();

    }
    else {
        // console.log( "pressed " + userGuess +" try " + triesCount);
        
        // check for duplicated letter
        
        if ( lettersTried.indexOf(userGuess) < 0) {
            // letter not already typed in so process

            // for first letter tried, don't need ',' between letters
            if ( triesCount === 0){
                lettersTried = lettersTried + userGuess;  
            } else {
                lettersTried = lettersTried + "," + userGuess;
            }
            triesCount += 1;
        }

        
        // check for matching letters
        for (var i = 0; i < wordArr.length; i++){
            if ( wordArr[i] === userGuess) {
                gameStringArr[i] = userGuess;
            }  
        }
        
        // check to see if won
        if( wordArr.join() === gameStringArr.join() ) {
            gamesPlayed += 1;
            gamesWon += 1;
            writeStatus("You won - press any key to continue");
            winSound.play();
            gameRunning = false;
            
        }
        
        // check to see if lost
        if( triesCount > (maxTries-1) ) {
            gamesPlayed += 1;
            gamesLost += 1;
            writeStatus("You lost - press any key to continue");
            loseSound.play();
            gameRunning = false;
        }
    }
    updateDisplay();
};

