
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
var isTouchScreen = false;



// <----- Global Functions ----->

//reveals current theme 
function revealTheme(ObjectKey) {
    $(".theme").empty().append(words[ObjectKey][0]);
    function randomColor(){
        var r = Math.floor(Math.random() * (200));
        var g = Math.floor(Math.random() * (200));
        var b = Math.floor(Math.random() * (200));
        var rgbColor = 'rgb(' + r + ','+ g + ',' + b + ')'; 
        $('.theme').css('background-color', rgbColor);
       }
    randomColor();
}

//creates a list item for each letter in the current word, assigns the list item an id that is the same number as the letter's index of the word, and inserts an underscore in each list item
function createListItems(ObjectKey) {
    for (i = 0; i < words[ObjectKey][1].length; i++) {
        $(".each-letter").append('<li id="' + i + '"> _ </li>');
    }
}

//gives the user a hint if the user has guessed less than 4 letters correctly and there are less than 7 remmaing guesses
function giveHint(ObjectKey) {
    if (remainingGuesses < 7 && currentWord.correctLetterGuesses.length < 4 && needsHint === false) {
        needsHint = true;
        $("#hint-button").fadeIn("slow");
    } 
    $("#hint-button").click(function(){
        $("#hint-button").hide();
        $(".hint").empty().append(words[ObjectKey][3]).fadeIn("slow");
    }) 
}

//if user wins, add 1 to wins, reveal winning message, reveal button for next word
function ifUserWins(ObjectKey) {
    if (currentWord.correctLetterGuesses.length === words[ObjectKey][2] && userWon === false) {
        userWon = true;
        wins++;
        $(".wins").empty().append(wins);
        $(".keyboard").hide();
        $("#press-any-letter").hide();
        $("#guess-the-word").hide();
        $(".theme-sentence").hide();
        $(".theme").hide();
        $("#hint-button").hide();
        $(".hint").empty().hide();
        $("#you-won").show();
        //reveals image of current word
        $(".bg-image").css("background", "#e9ecef url(assets/images/" + words[ObjectKey][1] + ".jpg) no-repeat center").css("background-size", "cover").css("box-shadow", "inset 0px 0px 20px 0px #3e3e3e");
    }
}

//if user loses, reveal the mystery word, reveal losing message, reveal button for next word
function ifUserLoses(ObjectKey) {
    if (remainingGuesses === 0 && userWon === false) {
        userLost = true;
        $(".keyboard").hide();
        $("#press-any-letter").hide();
        $("#guess-the-word").hide();
        $(".theme-sentence").hide();
        $(".theme").hide();
        $("#hint-button").hide();
        $(".hint").empty().hide();
        $("#you-lost").show();
        $(".each-letter").empty().append(words[ObjectKey][1]);
        $(".bg-image").css("background", "#e9ecef url(assets/images/" + words[ObjectKey][1] + ".jpg) no-repeat center").css("background-size", "cover").css("box-shadow", "inset 0px 0px 20px 0px #3e3e3e");
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
    $(".keyboard").show();
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

//checks if user is on a touch screen device
window.addEventListener('touchstart', function detectScreenType() {
    isTouchScreen = true;
    window.removeEventListener('touchstart', detectScreenType)
});



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
    //if user is on a touch screen device, then append a button to the .keyboard div that will pull up a touch keyboard
    if (isTouchScreen === true) {
        $(".keyboard").append('<div style="overflow: hidden; position: relative; width: 1px; height: 1px; left: -500px"><input id="keyboard-button" type="textfield" autocorrect="off" autocapitalize="off"></div><input type="button" value="Click for Keyboard" onclick="document.getElementById(\'keyboard-button\').focus();">');
        $(".keyboard").show();
    }
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

//for each letter of the current word, if the user's key equals the LetterIndex of the current word, then remove the underscore and reveal that letter
function ifCorrectLetterGuessed(ObjectKey) {
    for (i = 0; i < words[ObjectKey][2] + 1; i++) {
        if (userKey === words[ObjectKey][1][i]) {
            $("#" + i + "").empty().append(" " + words[ObjectKey][1][i] + " ");
            if (currentWord.correctLetterGuesses.includes(userKey) === false) {
            currentWord.correctLetterGuesses.push(userKey);
            }
        }
    }
}
ifCorrectLetterGuessed("word1");

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
        
        function ifCorrectLetterGuessed(ObjectKey) {
            for (i = 0; i < words[ObjectKey][2] + 1; i++) {
                if (userKey === words[ObjectKey][1][i]) {
                    $("#" + i + "").empty().append(" " + words[ObjectKey][1][i] + " ");
                    if (currentWord.correctLetterGuesses.includes(userKey) === false) {
                    currentWord.correctLetterGuesses.push(userKey);
                    }
                }
            }
        }
        ifCorrectLetterGuessed("word2");

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
        
        function ifCorrectLetterGuessed(ObjectKey) {
            for (i = 0; i < words[ObjectKey][2] + 1; i++) {
                if (userKey === words[ObjectKey][1][i]) {
                    $("#" + i + "").empty().append(" " + words[ObjectKey][1][i] + " ");
                    if (currentWord.correctLetterGuesses.includes(userKey) === false) {
                    currentWord.correctLetterGuesses.push(userKey);
                    }
                }
            }
        }
        ifCorrectLetterGuessed("word3");

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
        $(".final-score").append('<h2>You Won ' + wins + ' Out of ' + Object.keys(words).length + ' Times.<br><br>Better Luck Next Time!</h2>');
    } else if (wins === 1) {
        $(".final-score").append('<h2>You Won ' + wins + ' Out of ' + Object.keys(words).length + ' Times.<br><br>Good Effort!</h2>');
    } else if (wins > 1) {
        $(".final-score").append('<h2>You Won ' + wins + ' Out of ' + Object.keys(words).length + ' Times.<br><br>Awesome Job!</h2>');
    }
});

