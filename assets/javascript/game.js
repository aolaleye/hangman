
var themes = ['Landscape', 'Outer Space', 'Instruments'];
var words = ['mountain', 'galaxy', 'trombone'];
var wins = 0;
var remainingGuesses = 15;
var correctLetterArrays = {
    word1: [],
    word2: [],
    word3: [],
    alreadyPressedLetters: []
}

//Hides PLAY button for Game 1 and reveals current game
$("#play").click(function(){
    $("#get-started").hide();
    $("#play").hide();
    $("#press-any-letter").show();
    //Reveals Game 1
    $(".current-game").show();
    //displays intital number of wins and remaining guesses
    $(".wins").append(wins);
    $(".remaining-guesses").append(remainingGuesses);
}) 

//reveals current theme 
function revealTheme(Index) {
    $(".theme").empty();
    $(".theme").append(themes[Index]);
}
revealTheme(0); //<-- reveals theme 1

//creates a list item for each letter in the current word, assigns the list item an id that is the same number as the letter's index of the word, and inserts an underscore in each list item
function createListItems(WordIndex) {
    for (i = 0; i < words[WordIndex].length; i++) {
        $(".each-letter").append('<li id="' + i + '"> _ </li>');
    }
}
createListItems(0); //<--- creates list items for word 1

//<--- everything from this point is triggered by user's key press --->
document.onkeyup = function(event) {
var userKey = event.key;
var keyCode = event.which;

//(1) If the user presses a letter, then the letter appears in "already guessed" section (2) Subtracts 1 from remainingGuesses and prints remaining number
function whenUserGuesses () {
    if (keyCode > 64 && keyCode < 91 && remainingGuesses > 0) {
        $(".guessed-letters").append(userKey + " "); 
        remainingGuesses -= 1;
        $(".remaining-guesses").empty();
        $(".remaining-guesses").append(remainingGuesses);
    } 
}
whenUserGuesses();

function ifUserLoses(WordIndex) {
    if (remainingGuesses === 0) {
        event.preventDefault();
        $("#press-any-letter").hide();
        $("#guess-the-word").hide();
        $("#you-lost").show();
        $(".each-letter").empty();
        $(".each-letter").append(words[WordIndex]);
        $("#next-word").show();
    }
}
ifUserLoses(0);

//if the user's key equals the LetterIndex, then remove the underscore and reveal the correct letter
function ifCorrectLetterGuessed(WordIndex,LetterIndex) {
    if (userKey === words[WordIndex][LetterIndex]) {
        $("#" + LetterIndex + "").empty(); 
        $("#" + LetterIndex + "").append(" " + words[WordIndex][LetterIndex] + " ");
        correctLetterArrays.word1.push(userKey);
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

//if user wins, add 1 to wins, reveal winning message, reveal button for next word
function ifUserWins(ObjectProperty, WordIndex) {
    if (correctLetterArrays[ObjectProperty].length === words[WordIndex].length) {
        event.preventDefault();
        wins++;
        $(".wins").empty();
        $(".wins").append(wins);
        $("#press-any-letter").hide();
        $("#guess-the-word").hide();
        $("#you-won").show();
        $("#next-word").show();
    } 
}
ifUserWins("word1", 0);

} //<--- end document.onkeyup function


// <----- GAME 2 ----->
var themeIndex = 1; //<--- specifies theme index number for game 2 for nextGame() function

function nextGame() {
    //Hides next word button, hides winning or losing message
    $("#next-word").hide();
    $("#you-won").hide();
    $("#you-lost").hide();
    $("#press-any-letter").show();
    $("#guess-the-word").show();
    //Empties previous game and reveals new theme
    $(".each-letter").empty(); //<--- clears previous game
    $(".remaining-guesses").empty(); //<--- clears list of remaining guesses
    $(".guessed-letters").empty(); //<--- clears list of guessed letters
    revealTheme(themeIndex); //<--- PARAMETER for theme index number
    remainingGuesses = 15; //<--- resets number of guesses to 15
    $(".remaining-guesses").append(remainingGuesses);
}
$("#next-word").click(nextGame); //<--- Upon clicking NEXT WORD button



// <----- GAME 3 ----->
themeIndex = 2;
$("#next-word").click(nextGame);



