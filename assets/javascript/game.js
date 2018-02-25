
// <----- Global Variables ----->

var themes = ['Landscape', 'Outer Space', 'Instruments'];
var words = ['mountain', 'galaxy', 'trombone'];
var wins = 0;
var remainingGuesses = 12;
var userWon = false;
var userLost = false;
var currentWord = {
    correctLetterGuesses: [], //array for user's correctly guessed letters
    alreadyPressedLetters: [] //array for the letters user has already pressed
}

// <----- Global Functions ----->

//reveals current theme 
function revealTheme(Index) {
    $(".theme").empty().append(themes[Index]);
}

//creates a list item for each letter in the current word, assigns the list item an id that is the same number as the letter's index of the word, and inserts an underscore in each list item
function createListItems(WordIndex) {
    $(".each-letter").empty();
    for (i = 0; i < words[WordIndex].length; i++) {
        $(".each-letter").append('<li id="' + i + '"> _ </li>');
    }
}

//if user wins, add 1 to wins, reveal winning message, reveal button for next word
function ifUserWins(number) {
    if (currentWord.correctLetterGuesses.length === number) {
        userWon = true;
        wins++;
        $(".wins").empty().append(wins);
        $("#press-any-letter").hide();
        $("#guess-the-word").hide();
        $(".theme-sentence").hide();
        $(".theme").hide();
        $("#you-won").show();
    }
}

//if user loses, reveal the mystery word, reveal losing message, reveal button for next word
function ifUserLoses(WordIndex) {
    if (remainingGuesses === 0) {
        userLost = true;
        $("#press-any-letter").hide();
        $("#guess-the-word").hide();
        $(".theme-sentence").hide();
        $(".theme").hide();
        $("#you-lost").show();
        $(".each-letter").empty().append(words[WordIndex]);
    }
}

//resets scoreboard and previous game
function resetGame() {
    //Hides next word button, hides winning or losing message
    $("#second-word-button").hide();
    $("#third-word-button").hide();    
    $("#you-won").hide();
    $("#you-lost").hide();
    $("#press-any-letter").show();
    $("#guess-the-word").show();
    $(".theme-sentence").show();
    $(".theme").show();
    //Empties previous game 
    $(".each-letter").empty(); //<--- clears previous game
    $(".guessed-letters").empty(); //<--- clears list of guessed letters
    remainingGuesses = 12; //<--- resets number of guesses to 15
    $(".remaining-guesses").empty().append(remainingGuesses); //<--- clears list of remaining guesses
    userWon = false;
    userLost = false;
    currentWord = { 
        correctLetterGuesses: [],
        alreadyPressedLetters: []
    } //<--- resets/empties correctLetterGuesses and alreadyPressedLetters arrays
   
}

// <----- GAME 1 ----->

//Hides PLAY button and reveals game
$("#play").click(function(){
    $("#get-started").hide();
    $("#play").hide();
    $("#press-any-letter").show();
    //Reveals game
    $(".current-game").show();
    //displays intital number of wins and remaining guesses
    $(".wins").append(wins);
    $(".remaining-guesses").append(remainingGuesses);
}) 

revealTheme(0); //<-- reveals theme 1    
createListItems(0); //<--- creates list items for word 1 
    
//<--- everything from this point is triggered by user's key press --->
document.onkeyup = function(event) {
var userKey = event.key;
var keyCode = event.which;

//(1) If the user presses a letter, then the letter appears in "already guessed" section (2) Subtracts 1 from remainingGuesses and prints remaining number
function whenUserGuesses () {
    if (currentWord.alreadyPressedLetters.includes(userKey)) {
        $(".already-pressed").empty().append('You already guessed "' + userKey + '"').fadeIn("slow").fadeOut();
    } else if (keyCode > 64 && keyCode < 91 && remainingGuesses > 0 && userWon === false) {
        $(".guessed-letters").append(userKey + " "); 
        remainingGuesses -= 1;
        $(".remaining-guesses").empty().append(remainingGuesses);
        currentWord.alreadyPressedLetters.push(userKey);
    } 
}
whenUserGuesses();

//if the user's key equals the LetterIndex, then remove the underscore and reveal the correct letter
function ifCorrectLetterGuessed(WordIndex,LetterIndex) {
    if (userKey === words[WordIndex][LetterIndex]) {
        $("#" + LetterIndex + "").empty().append(" " + words[WordIndex][LetterIndex] + " ");
        if (currentWord.correctLetterGuesses.includes(userKey) === false) {
        currentWord.correctLetterGuesses.push(userKey);
        }
    }
}
ifCorrectLetterGuessed(0,0);
ifCorrectLetterGuessed(0,1);
ifCorrectLetterGuessed(0,2);
ifCorrectLetterGuessed(0,3);
ifCorrectLetterGuessed(0,4);
ifCorrectLetterGuessed(0,5);
ifCorrectLetterGuessed(0,6);
ifCorrectLetterGuessed(0,7);

ifUserWins(7);

ifUserLoses(0);

if (userWon === true || userLost === true) {
    $("#second-word-button").show();
}

} //<--- end document.onkeyup function / end Game 1



// <----- GAME 2 ----->

function gameTwo() {
    resetGame();
    createListItems(1);
    revealTheme(1);

    document.onkeyup = function(event) {
        var userKey = event.key;
        var keyCode = event.which;
        
        function whenUserGuesses () {
            if (currentWord.alreadyPressedLetters.includes(userKey)) {
                $(".already-pressed").empty().append('You already guessed "' + userKey + '"').fadeIn("slow").fadeOut();
            } else if (keyCode > 64 && keyCode < 91 && remainingGuesses > 0 && userWon === false) {
                $(".guessed-letters").append(userKey + " "); 
                remainingGuesses -= 1;
                $(".remaining-guesses").empty().append(remainingGuesses);
                currentWord.alreadyPressedLetters.push(userKey);
            } 
        }
        whenUserGuesses();
        
        function ifCorrectLetterGuessed(WordIndex,LetterIndex) {
            if (userKey === words[WordIndex][LetterIndex]) {
                $("#" + LetterIndex + "").empty().append(" " + words[WordIndex][LetterIndex] + " ");
                if (currentWord.correctLetterGuesses.includes(userKey) === false) {
                currentWord.correctLetterGuesses.push(userKey);
                }
            }
        }
        ifCorrectLetterGuessed(1,0);
        ifCorrectLetterGuessed(1,1);
        ifCorrectLetterGuessed(1,2);
        ifCorrectLetterGuessed(1,3);
        ifCorrectLetterGuessed(1,4);
        ifCorrectLetterGuessed(1,5);
        ifCorrectLetterGuessed(1,6);
       
        ifUserWins(5);
        
        ifUserLoses(1);

        if (userWon === true || userLost === true) {
            $("#third-word-button").show();
        }
        
    } //<--- end document.onkeyup function

} //<--- end gameTwo function

$("#second-word-button").click(gameTwo); //<--- Upon clicking NEXT WORD button



// <----- GAME 3 ----->

function gameThree() {
    resetGame();
    createListItems(2);
    revealTheme(2);

    document.onkeyup = function(event) {
        var userKey = event.key;
        var keyCode = event.which;
        
        function whenUserGuesses () {
            if (currentWord.alreadyPressedLetters.includes(userKey)) {
                $(".already-pressed").empty().append('You already guessed "' + userKey + '"').fadeIn("slow").fadeOut();
            } else if (keyCode > 64 && keyCode < 91 && remainingGuesses > 0 && userWon === false) {
                $(".guessed-letters").append(userKey + " "); 
                remainingGuesses -= 1;
                $(".remaining-guesses").empty().append(remainingGuesses);
                currentWord.alreadyPressedLetters.push(userKey);
            } 
        }
        whenUserGuesses();
        
        function ifCorrectLetterGuessed(WordIndex,LetterIndex) {
            if (userKey === words[WordIndex][LetterIndex]) {
                $("#" + LetterIndex + "").empty().append(" " + words[WordIndex][LetterIndex] + " ");
                if (currentWord.correctLetterGuesses.includes(userKey) === false) {
                currentWord.correctLetterGuesses.push(userKey);
                }
            }
        }
        ifCorrectLetterGuessed(2,0);
        ifCorrectLetterGuessed(2,1);
        ifCorrectLetterGuessed(2,2);
        ifCorrectLetterGuessed(2,3);
        ifCorrectLetterGuessed(2,4);
        ifCorrectLetterGuessed(2,5);
        ifCorrectLetterGuessed(2,6);
        ifCorrectLetterGuessed(2,7);
        
        ifUserWins(7);
        
        ifUserLoses(2);

        if (userWon === true || userLost === true) {
            $("#final-score-button").show();
        }
        
    } //<--- end document.onkeyup function

} //<--- end gameThree function

$("#third-word-button").click(gameThree);

$("#final-score-button").click(function() {
    $("#final-score-button").hide();
    $(".letters-game").hide();
    $(".scoreboard").hide();
    $(".final-score").show();
    if (wins === 0) {
        $(".final-score").append('<h2>You Won ' + wins + ' Out of ' + words.length + ' Times.<br><br>Better Luck Next Time!</h2>');
    } else if (wins === 1) {
        $(".final-score").append('<h2>You Won ' + wins + ' Out of ' + words.length + ' Times.<br><br>Good Work!</h2>');
    } else if (wins > 1) {
        $(".final-score").append('<h2>You Won ' + wins + ' Out of ' + words.length + ' Times.<br><br>Awesome Job!</h2>');
    }
});

// fix bug - number of wins can increase after user wins
// refactor code to include words and themes arrays in currentWord object
