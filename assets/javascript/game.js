
// <----- Global Variables ----->

var words = {
    //theme, word, number of nonrepeated letters, hint
    word1: ['Landscape', 'mountain', 7, 'A large landform that stretches above surrounding land - usually in the form of a peak'],
    word2: ['Outer Space', 'galaxy', 5, 'A system of stars, interstellar gas, dust, and dark matter'],
    word3: ['Intsruments', 'trombone', 7, 'A musical instrument in the brass family with an extendable slide']
}
var currentWord = {
    correctLetterGuesses: [], //array for user's correctly guessed letters
    alreadyPressedLetters: [] //array for the letters user has already pressed
}
var wins = 0;
var remainingGuesses = 12;
var userWon = false;
var userLost = false;
var needsHint = false;



// <----- Global Functions ----->

//reveals current theme 
function revealTheme(ObjectName) {
    $(".theme").empty().append(words[ObjectName][0]);
}

//creates a list item for each letter in the current word, assigns the list item an id that is the same number as the letter's index of the word, and inserts an underscore in each list item
function createListItems(ObjectName) {
    for (i = 0; i < words[ObjectName][1].length; i++) {
        $(".each-letter").append('<li id="' + i + '"> _ </li>');
    }
}

//gives the user a hint if the user has guessed less than 4 letters correctly and there are less than 7 remmaing guesses
function giveHint(ObjectName) {
    if (remainingGuesses < 7 && currentWord.correctLetterGuesses.length < 4 && needsHint === false) {
        needsHint = true;
        $("#hint-button").fadeIn("slow");
    } 
    $("#hint-button").click(function(){
        $("#hint-button").hide();
        $(".hint").empty().append(words[ObjectName][3]).fadeIn("slow");
    }) 
}

//if user wins, add 1 to wins, reveal winning message, reveal button for next word
function ifUserWins(ObjectName) {
    if (currentWord.correctLetterGuesses.length === words[ObjectName][2] && userWon === false) {
        userWon = true;
        wins++;
        $(".wins").empty().append(wins);
        $("#press-any-letter").hide();
        $("#guess-the-word").hide();
        $(".theme-sentence").hide();
        $(".theme").hide();
        $("#hint-button").hide();
        $(".hint").empty().hide();
        $("#you-won").show();
        //reveals image of current word
        $(".bg-image").css("background", "#e9ecef url(assets/images/" + words[ObjectName][1] + ".jpg) no-repeat center").css("background-size", "cover").css("box-shadow", "inset 0px 0px 20px 0px #3e3e3e");
    }
}

//if user loses, reveal the mystery word, reveal losing message, reveal button for next word
function ifUserLoses(ObjectName) {
    if (remainingGuesses === 0 && userWon === false) {
        userLost = true;
        $("#press-any-letter").hide();
        $("#guess-the-word").hide();
        $(".theme-sentence").hide();
        $(".theme").hide();
        $("#hint-button").hide();
        $(".hint").empty().hide();
        $("#you-lost").show();
        $(".each-letter").empty().append(words[ObjectName][1]);
        $(".bg-image").css("background", "#e9ecef url(assets/images/" + words[ObjectName][1] + ".jpg) no-repeat center").css("background-size", "cover").css("box-shadow", "inset 0px 0px 20px 0px #3e3e3e");
    }
}

//resets scoreboard and previous game
function resetGame() {
    //Hides next word button, hides winning or losing message
    $("#second-word-button").hide();
    $("#third-word-button").hide();    
    $("#you-won").hide();
    $("#you-lost").hide();
    $(".bg-image").css("background", "#e9ecef").css("box-shadow", "none");
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
    needsHint = false;
    currentWord = { 
        correctLetterGuesses: [],
        alreadyPressedLetters: []
    } //<--- resets/empties correctLetterGuesses and alreadyPressedLetters arrays
   
}



// <----- GAME 1 -----> 

//hides PLAY button and reveals game
$("#play").click(function(){
    $(".jumbotron p").hide();
    $("#get-started").hide();
    $("#press-any-letter").show();
    //Reveals game
    $(".current-game").show();
    //displays intital number of wins and remaining guesses
    $(".wins").append(wins);
    $(".remaining-guesses").append(remainingGuesses);
}) 

revealTheme("word1"); //<-- reveals theme 1    
createListItems("word1"); //<--- creates list items for word 1 
    
//<--- everything from this point is triggered by user's key press --->
document.onkeyup = function(event) {
var userKey = event.key;
var keyCode = event.which;

//(1) If the user pressers a key that's already been pressed, a message appears (2) When the user presses a letter, the letter appears in "already guessed" section (3) Subtract 1 from remainingGuesses and prints remaining number
function whenUserGuesses () {
    if (currentWord.alreadyPressedLetters.includes(userKey) && userWon === false && userLost === false) {
        $(".already-pressed").empty().append('You already guessed "' + userKey + '"').fadeIn("slow").fadeOut("slow");
    } else if (keyCode > 64 && keyCode < 91 && remainingGuesses > 0 && userWon === false) {
        $(".guessed-letters").append(userKey + " "); 
        remainingGuesses -= 1;
        $(".remaining-guesses").empty().append(remainingGuesses);
        currentWord.alreadyPressedLetters.push(userKey);
    } 
}
whenUserGuesses();

//if the user's key equals the LetterIndex of the current word, then remove the underscore and reveal that letter
function ifCorrectLetterGuessed(ObjectName,LetterIndex) {
    if (userKey === words[ObjectName][1][LetterIndex]) {
        $("#" + LetterIndex + "").empty().append(" " + words[ObjectName][1][LetterIndex] + " ");
        if (currentWord.correctLetterGuesses.includes(userKey) === false) {
        currentWord.correctLetterGuesses.push(userKey);
        }
    }
}
ifCorrectLetterGuessed("word1",0);
ifCorrectLetterGuessed("word1",1);
ifCorrectLetterGuessed("word1",2);
ifCorrectLetterGuessed("word1",3);
ifCorrectLetterGuessed("word1",4);
ifCorrectLetterGuessed("word1",5);
ifCorrectLetterGuessed("word1",6);
ifCorrectLetterGuessed("word1",7);

giveHint("word1");

ifUserWins("word1");

ifUserLoses("word1");

if (userWon === true || userLost === true) {
    $("#second-word-button").show();
}

} //<--- end document.onkeyup function / end Game 1



// <----- GAME 2 ----->

function gameTwo() {
    resetGame();
    createListItems("word2");
    revealTheme("word2");

    document.onkeyup = function(event) {
        var userKey = event.key;
        var keyCode = event.which;
        
        function whenUserGuesses () {
            if (currentWord.alreadyPressedLetters.includes(userKey) && userWon === false && userLost === false) {
                $(".already-pressed").empty().append('You already guessed "' + userKey + '"').fadeIn("slow").fadeOut();
            } else if (keyCode > 64 && keyCode < 91 && remainingGuesses > 0 && userWon === false) {
                $(".guessed-letters").append(userKey + " "); 
                remainingGuesses -= 1;
                $(".remaining-guesses").empty().append(remainingGuesses);
                currentWord.alreadyPressedLetters.push(userKey);
            } 
        }
        whenUserGuesses();
        
        function ifCorrectLetterGuessed(ObjectName,LetterIndex) {
            if (userKey === words[ObjectName][1][LetterIndex]) {
                $("#" + LetterIndex + "").empty().append(" " + words[ObjectName][1][LetterIndex] + " ");
                if (currentWord.correctLetterGuesses.includes(userKey) === false) {
                currentWord.correctLetterGuesses.push(userKey);
                }
            }
        }
        ifCorrectLetterGuessed("word2",0);
        ifCorrectLetterGuessed("word2",1);
        ifCorrectLetterGuessed("word2",2);
        ifCorrectLetterGuessed("word2",3);
        ifCorrectLetterGuessed("word2",4);
        ifCorrectLetterGuessed("word2",5);
        ifCorrectLetterGuessed("word2",6);

        giveHint("word2");
       
        ifUserWins("word2");
        
        ifUserLoses("word2");

        if (userWon === true || userLost === true) {
            $("#third-word-button").show();
        }
        
    } //<--- end document.onkeyup function

} //<--- end gameTwo function

$("#second-word-button").click(gameTwo); //<--- Upon clicking NEXT WORD button



// <----- GAME 3 ----->

function gameThree() {
    resetGame();
    createListItems("word3");
    revealTheme("word3");

    document.onkeyup = function(event) {
        var userKey = event.key;
        var keyCode = event.which;
        
        function whenUserGuesses () {
            if (currentWord.alreadyPressedLetters.includes(userKey) && userWon === false && userLost === false) {
                $(".already-pressed").empty().append('You already guessed "' + userKey + '"').fadeIn("slow").fadeOut();
            } else if (keyCode > 64 && keyCode < 91 && remainingGuesses > 0 && userWon === false) {
                $(".guessed-letters").append(userKey + " "); 
                remainingGuesses -= 1;
                $(".remaining-guesses").empty().append(remainingGuesses);
                currentWord.alreadyPressedLetters.push(userKey);
            } 
        }
        whenUserGuesses();
        
        function ifCorrectLetterGuessed(ObjectName,LetterIndex) {
            if (userKey === words[ObjectName][1][LetterIndex]) {
                $("#" + LetterIndex + "").empty().append(" " + words[ObjectName][1][LetterIndex] + " ");
                if (currentWord.correctLetterGuesses.includes(userKey) === false) {
                currentWord.correctLetterGuesses.push(userKey);
                }
            }
        }
        ifCorrectLetterGuessed("word3",0);
        ifCorrectLetterGuessed("word3",1);
        ifCorrectLetterGuessed("word3",2);
        ifCorrectLetterGuessed("word3",3);
        ifCorrectLetterGuessed("word3",4);
        ifCorrectLetterGuessed("word3",5);
        ifCorrectLetterGuessed("word3",6);
        ifCorrectLetterGuessed("word3",7);

        giveHint("word3");
        
        ifUserWins("word3");
        
        ifUserLoses("word3");

        if (userWon === true || userLost === true) {
            $("#final-score-button").show();
        }
        
    } //<--- end document.onkeyup function

} //<--- end gameThree function

$("#third-word-button").click(gameThree);


// <----- FINAL SCORE ----->

$("#final-score-button").click(function() {
    $("#final-score-button").hide();
    $(".jumbotron p").hide();
    $(".letters-game").hide();
    $(".scoreboard").hide();
    $(".bg-image").css("background", "#e9ecef").css("box-shadow", "none");
    $(".final-score").show();
    if (wins === 0) {
        $(".final-score").append('<h2>You Won ' + wins + ' Out of ' + Object.keys(words).length + ' Times.<br><br><br>Better Luck Next Time!</h2>');
    } else if (wins === 1) {
        $(".final-score").append('<h2>You Won ' + wins + ' Out of ' + Object.keys(words).length + ' Times.<br><br><br>Good Effort!</h2>');
    } else if (wins > 1) {
        $(".final-score").append('<h2>You Won ' + wins + ' Out of ' + Object.keys(words).length + ' Times.<br><br><br>Awesome Job!</h2>');
    }
});

