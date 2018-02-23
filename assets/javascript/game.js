
var themes = ['Landscape', 'Outer Space', 'Instruments'];
var words = ['mountain', 'galaxy', 'trombone'];
var logCorrectGuess;
var wins;
var numberOfGuesses;

//Hides PLAY button for Game 1 and reveals current game
$("#play-1").click(function(){
    $("#get-started").hide();
    $("#play-1").hide();
    //Reveals Game 1
    $(".current-game").show();
}) 

//reveals current theme 
function revealTheme(Index) {
    $(".theme").append(themes[Index]);
}
revealTheme(0); //<-- reveals theme 1

//creates a list item for each letter in the current word, assigns the list item an id that is the same number as the letter's index of the word, and inserts an underscore in each list item
function createListItems(WordIndex) {
    for (i = 0; i < words[WordIndex].length; i++) {
        $(".each-letter").append('<li id="' + i + '"> _ </li>');
    }
}
createListItems(0); //<-- creates list items for word 1


//<--- everything from this point is triggered by user's key click --->
document.onkeyup = function(event) {
var userKey = event.key;

//lists the letters the user already guessed
$(".guessed-letters").append(userKey + " ");

//if the user's key equals the LetterIndex, then remove the underscore and reveal the correct letter
function ifCorrectLetterGuessed(WordIndex,LetterIndex) {
    if (userKey === words[WordIndex][LetterIndex]) {
        $("#" + LetterIndex + "").empty(); 
        $("#" + LetterIndex + "").append(" " + words[WordIndex][LetterIndex] + " ");
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

// if (logCorrectGuess === 8) {
//     wins++;
//     $(".wins").empty();
//     $(".wins").append(wins);
// }



}//<--- end document.onkeyup function





//<--- GAME 2 --->

// //<--- Reveals PLAY AGAIN button for Game 2 --->
// $(".current-game").hide();
// $("#get-started").show();
// $("play-2").show();
// $("#play-2").click(function(){
//     $("#get-started").hide();
//     $("#play-2").hide();
//     //Reveals Game 2
//     $(".current-game").show();
// }) 

// $(".each-letter").empty(); //<--- clears previous game
// $(".guessed-letters").empty(); //<--- clears list of guessed letters
// revealTheme(1); //<--- reveals theme 2

// revealTheme(2); //<--- reveals theme 3



